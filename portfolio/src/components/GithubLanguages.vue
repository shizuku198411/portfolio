<template>
  <section class="card lang">
    <div class="lang__head">
      <div>
        <h2 class="lang__title">Languages (GitHub Public Repos)</h2>
      </div>

      <div class="lang__actions">
        <button class="btn" type="button" @click="refresh" :disabled="loading">
          Reloading
        </button>
      </div>
    </div>

    <div v-if="error" class="notice notice--error">
      <div class="notice__title">failed to retrieve</div>
      <div class="notice__body">{{ error }}</div>
    </div>

    <div v-else-if="loading" class="notice">
      <div class="notice__body">Retrieving…</div>
    </div>

    <div v-else class="chart">
      <div class="chart__meta">
        <span class="muted">target: {{ repoCount }} repos</span>
        <span class="muted">update: {{ updatedAtLabel }}</span>
      </div>

      <div class="bars" role="list" aria-label="Language usage chart">
        <div
          v-for="item in topLanguages"
          :key="item.name"
          class="bar"
          role="listitem"
        >
          <div class="bar__row">
            <div class="bar__label">
              <span class="bar__name">{{ item.name }}</span>
              <span class="bar__pct muted">{{ item.pct.toFixed(1) }}%</span>
            </div>
            <!-- <div class="bar__value muted">{{ formatBytes(item.bytes) }}</div> -->
          </div>

          <div class="bar__track" aria-hidden="true">
            <div class="bar__fill" :style="{ width: item.pct + '%' }"></div>
          </div>
        </div>
      </div>

      <details class="details">
        <summary>collection criteria</summary>
        <ul>
          <li>exclude fork</li>
          <li>exclude archived</li>
          <li>Cache TTL: {{ CACHE_TTL_HOURS }} hours</li>
        </ul>
      </details>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

/**
 * config
 */
const USERNAME = 'shizuku198411'
const MAX_REPOS = 40
const CACHE_KEY = `gh_lang_${USERNAME}_v1`
const CACHE_TTL_HOURS = 12

const loading = ref(false)
const error = ref('')

const repoCount = ref(0)
const updatedAt = ref(null) // Date
const langBytes = ref({})   // { lang: bytes }

const updatedAtLabel = computed(() => {
  if (!updatedAt.value) return '-'
  const d = updatedAt.value
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
})

const totalBytes = computed(() => {
  return Object.values(langBytes.value).reduce((a, b) => a + b, 0)
})

const topLanguages = computed(() => {
  const entries = Object.entries(langBytes.value)
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes)

  const total = totalBytes.value || 1
  const top = entries.slice(0, 10).map(x => ({
    ...x,
    pct: (x.bytes / total) * 100,
  }))

  const rest = entries.slice(10).reduce((acc, x) => acc + x.bytes, 0)
  if (rest > 0) {
    top.push({
      name: 'Others',
      bytes: rest,
      pct: (rest / total) * 100,
    })
  }
  return top
})

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB']
  let v = bytes
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const obj = JSON.parse(raw)
    const now = Date.now()
    const ttlMs = CACHE_TTL_HOURS * 60 * 60 * 1000
    if (!obj.timestamp || (now - obj.timestamp) > ttlMs) return null
    return obj
  } catch {
    return null
  }
}

function writeCache(payload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // ignore storage full / blocked
  }
}

async function fetchAllRepos() {
  const repos = []
  for (let page = 1; page <= 3; page++) {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=pushed`
    const res = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } })
    if (!res.ok) throw new Error(`repos fetch failed: ${res.status}`)
    const data = await res.json()
    repos.push(...data)
    if (data.length < 100) break
  }
  return repos
}

async function fetchLanguagesForRepo(languagesUrl) {
  const res = await fetch(languagesUrl, { headers: { 'Accept': 'application/vnd.github+json' } })
  if (!res.ok) throw new Error(`languages fetch failed: ${res.status}`)
  return await res.json() // { Lang: bytes, ... }
}

async function load({ force } = { force: false }) {
  error.value = ''
  loading.value = true
  try {
    if (!force) {
      const cached = readCache()
      if (cached) {
        repoCount.value = cached.repoCount
        langBytes.value = cached.langBytes
        updatedAt.value = new Date(cached.timestamp)
        loading.value = false
        return
      }
    }

    const repos = await fetchAllRepos()

    const targets = repos
      .filter(r => !r.fork && !r.archived)
      .slice(0, MAX_REPOS)

    repoCount.value = targets.length

    const agg = {}
    for (const r of targets) {
      const langs = await fetchLanguagesForRepo(r.languages_url)
      for (const [name, bytes] of Object.entries(langs)) {
        agg[name] = (agg[name] || 0) + bytes
      }
    }

    langBytes.value = agg
    updatedAt.value = new Date()

    writeCache({
      timestamp: Date.now(),
      repoCount: repoCount.value,
      langBytes: langBytes.value,
    })
  } catch (e) {
    error.value = String(e?.message || e)
  } finally {
    loading.value = false
  }
}

function refresh() {
  load({ force: true })
}

onMounted(() => {
  load({ force: false })
})
</script>

<style scoped>
.muted {
  color: var(--fg-muted);
  margin: 0;
}

.lang {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.lang__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.lang__title {
  margin: 0 0 6px 0;
  font-size: 16px;
}

.lang__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.chart__meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.bars {
  display: grid;
  gap: 10px;
}

.bar__row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.bar__label {
  display: flex;
  gap: 10px;
  align-items: baseline;
  min-width: 0;
}

.bar__name {
  font-weight: 600;
  color: var(--fg);
}

.bar__pct {
  white-space: nowrap;
}

.bar__track {
  border: 1px solid var(--border);
  background: rgba(22, 27, 34, 0.6);
  border-radius: 999px;
  height: 10px;
  overflow: hidden;
  margin-top: 6px;
}

.bar__fill {
  height: 100%;
  background: rgba(88, 166, 255, 0.55);
  border-right: 1px solid rgba(88, 166, 255, 0.75);
}

.notice {
  border: 1px solid var(--border);
  background: var(--bg-soft);
  border-radius: 10px;
  padding: 12px;
}

.notice--error {
  border-color: rgba(248, 81, 73, 0.6);
}

.notice__title {
  font-weight: 700;
  margin-bottom: 6px;
}

.details {
  margin-top: 8px;
  color: var(--fg-muted);
}

details > summary {
  cursor: pointer;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--fg);
  text-decoration: none;
}

.btn:hover {
  border-color: var(--accent);
  text-decoration: none;
}

@media (max-width: 900px) {
  .lang__head {
    flex-direction: column;
  }
}
</style>