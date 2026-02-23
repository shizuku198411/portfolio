<template>
  <section class="home stack">
    <!-- Hero -->
    <header class="hero">
      <div class="hero__top">
        <div class="hero__identity">
          <p class="kicker">Network / Security / Low-level Engineer</p>
          <h1 class="title">Shizuku</h1>
          <p class="subtitle">
            コンテナランタイム/カーネルといった低レイヤー実装を主とし、
            ZeroTrustや監査といった観点でのセキュリティ強化を目指しています。
          </p>
        </div>

        <div class="hero__cta">
          <div class="btnrow">
            <RouterLink class="btn btn--primary" to="/works">Works</RouterLink>
            <RouterLink class="btn" to="/about">About</RouterLink>
          </div>

          <div class="linkrow">
            <a class="ext" href="https://github.com/shizuku198411" target="_blank" rel="noreferrer">
              GitHub <span class="ext__icon" aria-hidden="true">↗</span>
            </a>
            <a class="ext" href="https://x.com/shizuku198411" target="_blank" rel="noreferrer">
              X <span class="ext__icon" aria-hidden="true">↗</span>
            </a>
            <a class="ext" href="https://www.linkedin.com/in/seiji-matsuoka-028b503ab" target="_blank" rel="noreferrer">
              LinkedIn <span class="ext__icon" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      <ul class="pillrow" aria-label="Core skills">
        <li class="pill">Linux</li>
        <li class="pill">Container Runtime</li>
        <li class="pill">RISC-V</li>
        <li class="pill">Zero Trust</li>
        <li class="pill">Attestation</li>
      </ul>
    </header>

    <!-- Featured Works -->
    <section class="section">
      <div class="section__head">
        <h2>Featured Works</h2>
      </div>

      <div class="grid">
        <article v-for="w in featured" :key="w.title" class="card work">
          <div class="work__head">
            <h3 class="work__title">{{ w.title }}</h3>
            <span class="work__tag">{{ w.kind }}</span>
          </div>

          <p class="work__desc">{{ w.desc }}</p>

          <ul class="chips" aria-label="Tech stack">
            <li v-for="t in w.tech" :key="t" class="chip">{{ t }}</li>
          </ul>

          <div class="work__links">
            <a v-if="w.repo" class="work__link" :href="w.repo" target="_blank" rel="noreferrer">
              Repo <span aria-hidden="true">↗</span>
            </a>
            <a v-if="w.demo" class="work__link" :href="w.demo" target="_blank" rel="noreferrer">
              Demo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>

      <div class="section__foot">
        <RouterLink class="textlink" to="/works">See more works →</RouterLink>
      </div>
    </section>

    <!-- About short -->
    <section class="section">
      <div class="section__head">
        <h2>What I value</h2>
      </div>

      <div class="card about">
        <ul class="about__list">
          <li>
            <span class="about__key">構造</span>
            <span class="about__val">低レイヤまで踏み込み、ブラックボックスにしない設計。</span>
          </li>
          <li>
            <span class="about__key">理解</span>
            <span class="about__val">挙動と制約は、実装と検証によって把握する。</span>
          </li>
          <li>
            <span class="about__key">運用</span>
            <span class="about__val">観測可能性と再現性を組み込んだ、運用前提の実装。</span>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script setup>
const featured = [
  {
    title: 'Raind',
    kind: 'Container Runtime',
    desc: 'Zero Trust指向コンテナランタイム',
    tech: ['Go', 'Vue', 'Container', 'ZeroTrust'],
    repo: 'https://github.com/shizuku198411/Raind',
    demo: null,
  },
  {
    title: 'AquaCore',
    kind: 'Low-level',
    desc: 'RISC-V 32bit向けマイクロカーネル',
    tech: ['C', 'RISC-V', 'QEMU', 'OpenSBI'],
    repo: 'https://github.com/shizuku198411/Aqua-Core',
    demo: null,
  },
  {
    title: 'Session Attested',
    kind: 'attestation',
    desc: '開発作業における実行プロセスの監査/署名による証跡生成',
    tech: ['Go', 'attestation', 'LSM', 'verification'],
    repo: 'https://github.com/shizuku198411/SessionAttested',
    demo: null,
  },
]
</script>

<style scoped>
/* Home専用の最小追加。全体トーンは base.css の変数に寄せる */

.home {
  padding-top: 8px;
}

.muted {
  color: var(--fg-muted);
  margin: 0;
}

/* ---- Hero ---- */

.hero {
  background: linear-gradient(180deg, rgba(88,166,255,0.10), transparent 55%);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}

.hero__top {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 16px;
  align-items: start;
}

.kicker {
  margin: 0 0 6px 0;
  color: var(--fg-muted);
  letter-spacing: 0.02em;
}

.title {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
}

.subtitle {
  margin: 10px 0 0 0;
  color: var(--fg);
}

.hero__cta {
  display: grid;
  gap: 12px;
  justify-items: end;
}

.btnrow {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.linkrow {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.ext {
  color: var(--fg);
  border-bottom: 1px dashed transparent;
}

.ext:hover {
  border-bottom-color: var(--border);
  text-decoration: none;
}

.ext__icon {
  color: var(--fg-muted);
}

/* Pills */

.pillrow {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill {
  border: 1px solid var(--border);
  background: rgba(22,27,34,0.65);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--fg);
}

/* ---- Section ---- */

.section {
  margin-top: 8px;
}

.section__head {
  margin-bottom: 12px;
}

.section__head h2 {
  margin: 0 0 6px 0;
  font-size: 18px;
}

.section__foot {
  margin-top: 12px;
}

.textlink {
  color: var(--accent);
}

.textlink:hover {
  color: var(--accent-hover);
}

/* ---- Works grid ---- */

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.work {
  display: grid;
  gap: 10px;
}

.work__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.work__title {
  margin: 0;
  font-size: 15px;
}

.work__tag {
  border: 1px solid var(--border);
  color: var(--fg-muted);
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.work__desc {
  margin: 0;
  color: var(--fg);
}

.chips {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  border: 1px solid var(--border);
  color: var(--fg-muted);
  background: transparent;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 999px;
}

.work__links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.work__link {
  color: var(--accent);
}

.work__link:hover {
  color: var(--accent-hover);
}

/* ---- About short ---- */

.about {
  padding: 16px;
}

.about__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.about__list li {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
}

.about__key {
  color: var(--fg-muted);
}

.about__val {
  color: var(--fg);
}

.about__cta {
  margin-top: 14px;
}

/* ---- Buttons ---- */

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

.btn--primary {
  border-color: rgba(88,166,255,0.45);
  background: rgba(88,166,255,0.12);
}

.btn--primary:hover {
  border-color: var(--accent);
}

/* ---- Responsive ---- */

@media (max-width: 900px) {
  .hero__top {
    grid-template-columns: 1fr;
  }
  .hero__cta {
    justify-items: start;
  }
  .btnrow, .linkrow {
    justify-content: flex-start;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>