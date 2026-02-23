<template>
  <section class="works stack">
    <header class="head">
      <div>
        <h1 class="title">Works</h1>
        <p class="muted">
          GitHubで公開しているプロジェクトの一覧です。詳細は Repo 参照。
        </p>
      </div>

      <div class="actions">
        <RouterLink class="btn" to="/">Home</RouterLink>
        <RouterLink class="btn" to="/about">About</RouterLink>
      </div>
    </header>

    <section class="toolbar card">
      <div class="toolbar__row">
        <label class="field">
          <span class="field__label">Search</span>
          <input
            v-model="q"
            class="input"
            type="text"
            placeholder="e.g. RISC-V / Go / Runtime"
          />
        </label>

        <label class="field">
          <span class="field__label">Category</span>
          <select v-model="kind" class="select">
            <option value="all">All</option>
            <option v-for="k in kinds" :key="k" :value="k">{{ k }}</option>
          </select>
        </label>

        <label class="field">
          <span class="field__label">TechTag</span>
          <select v-model="tag" class="select">
            <option value="all">All</option>
            <option v-for="t in tags" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>

        <button class="btn" type="button" @click="reset">リセット</button>
      </div>

      <div class="toolbar__meta">
        <span class="muted">Hit: {{ filtered.length }} projects</span>
      </div>
    </section>

    <section class="grid">
      <article v-for="w in filtered" :key="w.id" class="card work">
        <div class="work__top">
          <div>
            <h2 class="work__title">{{ w.title }}</h2>
            <p class="work__desc">{{ w.desc }}</p>
          </div>
          <span class="work__kind">{{ w.kind }}</span>
        </div>

        <ul class="chips" aria-label="Tech stack">
          <li v-for="t in w.tech" :key="t" class="chip">{{ t }}</li>
        </ul>

        <div v-if="w.highlights?.length" class="highlights">
          <h3 class="highlights__title">Highlights</h3>
          <ul class="highlights__list">
            <li v-for="h in w.highlights" :key="h">{{ h }}</li>
          </ul>
        </div>

        <div class="work__links">
          <a v-if="w.repo" class="work__link" :href="w.repo" target="_blank" rel="noreferrer">
            Repo <span aria-hidden="true">↗</span>
          </a>
          <a v-if="w.demo" class="work__link" :href="w.demo" target="_blank" rel="noreferrer">
            Demo <span aria-hidden="true">↗</span>
          </a>
          <a v-if="w.doc" class="work__link" :href="w.doc" target="_blank" rel="noreferrer">
            Notes <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </section>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const works = [
    {
        id: 'raind',
        title: 'Raind - Zero Trust Oriented Container Runtime',
        kind: 'Low-level / Container',
        desc: 'Zero Trust指向コンテナランタイム。ランタイム層でネットワークポリシー制御と通信の可視化(Traffic/DNS/Audit)を行う',
        tech: [
            'Container Runtime',
            'Zero Trust',
            'OCI',
            'Go',
            'Namespaces',
            'cgroups',
            'Seccomp',
            'AppArmor',
            'mTLS',
            'UDS',
            'WebSocket'
        ],
        highlights: [
            'ランタイム層でのネットワークポリシー制御 (East-West/North-South)',
            '通信可視化と追跡性の確保',
            'Bottle/ReplicaSet/Podによる複数コンテナオーケストレーション',
            'OCI準拠の低レベル制御(namespace/cgroup,capability,seccomp,AppArmor,hooks)',
            'WebUIによるランタイム管理およびWebSocket端末によるコンテナ内操作'
        ],
        repo: 'https://github.com/shizuku198411/Raind',
        demo: null,
        doc: null,
    },
    {
        id: 'aqua-core',
        title: 'AquaCore - RISC-V 32bit Micro Kernel',
        kind: 'Low-level / Kernel',
        desc: 'RISC-V 32bit向けマイクロカーネル。プロセス管理/割り込み/ファイルシステム/ネットワークなどを含む単一バイナリ型カーネル',
        tech: [
            'RISC-V',
            'MicroKernel',
            'C',
            'VFS',
            'virtio',
            'QEMU',
            'Memory',
            'Process',
            'TrapHandler'
        ],
        highlights: [
            'タイマ割り込みとプリエンプティブスケジューリング',
            'SV32による仮想アドレスマッピング',
            'virtioによるブロックデバイス(blk)およびネットワーク(net)実装',
            'VFS + 永続/揮発/procファイルシステム(pfs/ramfs/procfs)',
            'システムコールによるユーザプロセス実行モデル'
        ],
        repo: 'https://github.com/shizuku198411/Aqua-Core',
        demo: null,
        doc: null,
    },
    {
        id: 'sessionattested',
        title: 'Session Attested - Development Session Host-Signed Audit Trail',
        kind: 'Attestation / Verification',
        desc: '開発セッション中に実行されたプロセスと書き込み操作を観測し、署名付き証跡(attestation)を生成するツール',
        tech: [
            'eBPF',
            'LSM',
            'Go',
            'Docker',
            'Session Audit',
            'Attestation',
            'Signing',
        ],
        highlights: [
            'プロセス実行・ワークスペース書き込みの観測',
            'ポリシーに基づき「禁止された実行/書き込み」を判定',
            '観測ログを集計し、Commit結び付けおよび署名付き証跡/検証結果を出力',
            '開発セッションにおけるプロセス証跡・検証フローを提供',
        ],
        repo: 'https://github.com/shizuku198411/SessionAttested',
        demo: null,
        doc: 'https://raw.githubusercontent.com/shizuku198411/SessionAttested/main/README.md',
    },
    {
        id: 'nodemonitor',
        title: 'NodeMonitor',
        kind: 'Backend / Observability',
        desc: 'ホストのリソース情報を収集し、FastAPI + Vue で可視化するノード監視Webアプリケーション',
        tech: [
            'FastAPI',
            'Python',
            'Vue 3',
            'Vite',
            'Docker',
        ],
        highlights: [
            'Host/CPU/Memory/Sensor/Disk/Network のメトリクスを収集・可視化',
            'GET /host /cpu /memory /sensor /disk /network を提供し、type クエリで部分取得に対応',
            'UI 側の API 接続先を VITE_API_BASE_URL で切り替え可能',
            'API/UI それぞれのコンテナイメージをビルド可能、デプロイ用マニフェスト例を同梱',
        ],
        repo: 'https://github.com/shizuku198411/NodeMonitor',
        demo: null,
        doc: null,
    },
    {
        id: 'whc-webhook-collector',
        title: 'Webhook Collector',
        kind: 'Backend / Tooling',
        desc: 'GitHub Webhook を受信して MySQL に永続化し、Web UI から配信履歴の閲覧・フィルタ・payload 詳細確認、エンドポイント管理（作成/secretローテ/削除）まで行える運用スタック',
        tech: [
            'GitHub Webhooks',
            'Go',
            'MySQL',
            'Vue 3',
            'Vite',
            'TLS',
            'Kubernetes Manifests',
        ],
        highlights: [
            'Webhook delivery を受信して MySQL へ保存し、UI から repo/event/action/actor などで検索・閲覧可能',
            'delivery ごとの payload 詳細表示と、Webhook endpoint の一元管理（作成/secret更新/削除）',
            'API(Go)/ UI(Vue+Vite)/ デプロイマニフェストの分離構成。対話的セットアップスクリプトでマニフェストと UI 設定を生成',
        ],
        repo: 'https://github.com/shizuku198411/Webhook-Collector',
        demo: null,
        doc: null,
    },
    {
        id: 'tcp-ip',
        title: 'TCP/IP',
        kind: 'Low-level / Networking',
        desc: 'raw socketを用いたIPv4 + TCP パケット構築、およびTCP 3WHとHTTP GETの送受信を行う検証用ミニスタック実装',
        tech: [
            'C',
            'Linux',
            'Raw Socket',
            'IPv4',
            'TCP',
            'UDP',
            'Checksum (Pseudo Header)',
        ],
        highlights: [
            'IPv4/TCP/UDP ヘッダ定義と疑似ヘッダを用いたチェックサム計算を実装',
            'TCP SYN → SYN/ACK → ACK のハンドシェイクと、ACK/PSH/FIN に応じた送受信・クローズ処理',
            'TCP SYN Floodを模したパケット生成による、Firewall機能検証等での利用',
        ],
        repo: 'https://github.com/shizuku198411/tcp-ip',
        demo: null,
        doc: null,
    },
]

const q = ref('')
const kind = ref('all')
const tag = ref('all')

const kinds = computed(() => {
  return Array.from(new Set(works.map(w => w.kind))).sort()
})

const tags = computed(() => {
  const all = works.flatMap(w => w.tech)
  return Array.from(new Set(all)).sort((a, b) => a.localeCompare(b))
})

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()

  return works.filter(w => {
    const matchKind = kind.value === 'all' ? true : w.kind === kind.value
    const matchTag = tag.value === 'all' ? true : w.tech.includes(tag.value)

    const hay = [
      w.title,
      w.desc,
      w.kind,
      ...(w.tech || []),
      ...((w.highlights || [])),
    ]
      .join(' ')
      .toLowerCase()

    const matchQuery = query === '' ? true : hay.includes(query)

    return matchKind && matchTag && matchQuery
  })
})

function reset() {
  q.value = ''
  kind.value = 'all'
  tag.value = 'all'
}
</script>

<style scoped>
.works {
  padding-top: 8px;
}

.muted {
  color: var(--fg-muted);
  margin: 0;
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 26px;
  line-height: 1.2;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* ---- Toolbar ---- */

.toolbar {
  padding: 14px;
  display: grid;
  gap: 10px;
}

.toolbar__row {
  display: grid;
  grid-template-columns: 1.3fr 0.8fr 0.9fr auto;
  gap: 10px;
  align-items: end;
}

.toolbar__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ---- Form ---- */

.field {
  display: grid;
  gap: 6px;
}

.field__label {
  font-size: 12px;
  color: var(--fg-muted);
}

.input,
.select {
  width: 100%;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--fg);
  border-radius: 8px;
  padding: 8px 10px;
  outline: none;
}

.input:focus,
.select:focus {
  border-color: rgba(88, 166, 255, 0.7);
}

/* ---- Works grid ---- */

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.work {
  display: grid;
  gap: 12px;
}

.work__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.work__title {
  margin: 0;
  font-size: 16px;
}

.work__desc {
  margin: 6px 0 0 0;
  color: var(--fg);
}

.work__kind {
  border: 1px solid var(--border);
  color: var(--fg-muted);
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

/* chips: Home と同系統 */
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

/* Highlights */
.highlights {
  border-top: 1px solid var(--border);
  padding-top: 10px;
}

.highlights__title {
  margin: 0 0 6px 0;
  font-size: 12px;
  color: var(--fg-muted);
  letter-spacing: 0.02em;
}

.highlights__list {
  margin: 0;
  padding-left: 16px;
  color: var(--fg);
}

/* Links */
.work__links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.work__link {
  color: var(--accent);
  text-decoration: none;
}

.work__link:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

/* Buttons: Home と同じ思想（最低限） */
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

/* Responsive */
@media (max-width: 900px) {
  .head {
    flex-direction: column;
  }

  .actions {
    justify-content: flex-start;
  }

  .toolbar__row {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
</style>