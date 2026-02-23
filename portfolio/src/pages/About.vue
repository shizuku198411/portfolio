<script setup lang="ts">
import GithubLanguages from '../components/GithubLanguages.vue'
</script>

<template>
  <section class="about stack">
    <!-- Header -->
    <header class="head">
      <div>
        <h1 class="title">About</h1>
        <p class="muted">
          セキュリティを設計の前提とするエンジニア。
        </p>
      </div>
      <div class="actions">
        <RouterLink class="btn" to="/">Home</RouterLink>
        <RouterLink class="btn" to="/works">Works</RouterLink>
      </div>
    </header>

    <!-- Core Belief -->
    <section class="section card">
      <h2 class="section__title">Core Belief</h2>

      <ul class="philosophy">
        <li>
          <h3>信頼境界を設計する</h3>
          <p>
            システムを構成する各レイヤにおいて、何を信頼し、何を検証するかを明確にする。
            境界を曖昧にしない設計を重視する。
          </p>
        </li>

        <li>
          <h3>可視化と監査を組み込む</h3>
          <p>
            挙動を観測できないシステムは安全ではない。
            ログ、メトリクス、証跡を初期段階から設計に組み込む。
          </p>
        </li>

        <li>
          <h3>理解は実装で担保する</h3>
          <p>
            低レイヤまで踏み込み、抽象の裏側を把握する。
            ブラックボックスに依存しない設計を行う。
          </p>
        </li>

        <li>
          <h3>障害と攻撃を前提にする</h3>
          <p>
            失敗や侵害は起こり得るものとして扱い、
            最小権限・分離・再現性を設計に反映する。
          </p>
        </li>
      </ul>
    </section>

    <!-- Security Focus -->
    <section class="section card">
      <h2 class="section__title">Focus</h2>

      <div class="areas">
        <div>
          <h3>Runtime / Isolation</h3>
          <ul>
            <li>Container Runtime / Namespaces / cgroups</li>
            <li>Capability 制御 / Seccomp / AppArmor</li>
            <li>mTLS / 内部通信制御</li>
          </ul>
        </div>

        <div>
          <h3>Kernel / Low-level</h3>
          <ul>
            <li>RISC-V / Microkernel</li>
            <li>Raw Socket / TCP/IP 実装</li>
            <li>システムコール境界の理解</li>
          </ul>
        </div>

        <div>
          <h3>Audit / Verification</h3>
          <ul>
            <li>eBPF / LSM</li>
            <li>セッション監査 / Attestation</li>
            <li>ポリシーベース検証</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Design Perspective -->
    <section class="section card">
      <h2 class="section__title">Design Perspective</h2>

      <ul class="list">
        <li>最小権限を前提とした構造設計</li>
        <li>通信・実行・書き込みの監査可能性</li>
        <li>レイヤを跨いだ一貫したセキュリティモデル</li>
        <li>再現可能な障害解析と検証フロー</li>
      </ul>
    </section>

    <!-- Language -->
    <GithubLanguages />

    <!-- Contact -->
    <section class="section card">
      <h2 class="section__title">Contact</h2>
      <ul class="list">
        <li>
          <a href="https://github.com/shizuku198411" target="_blank">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/seiji-matsuoka-028b503ab" target="_blank">
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  </section>
</template>

<style scoped>
.about {
  padding-top: 8px;
}

.muted {
  color: var(--fg-muted);
  margin: 0;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 26px;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Sections */

.section {
  padding: 16px;
}

.section__title {
  margin: 0 0 12px 0;
  font-size: 16px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
}

/* Philosophy */

.philosophy {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 18px;
}

.philosophy h3 {
  margin: 0 0 6px 0;
  font-size: 14px;
}

.philosophy p {
  margin: 0;
  color: var(--fg);
}

/* Focus Areas */

.areas {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.areas h3 {
  margin: 0 0 6px 0;
  font-size: 14px;
}

.areas ul {
  margin: 0;
  padding-left: 16px;
  color: var(--fg);
}

/* Generic list */

.list {
  margin: 0;
  padding-left: 16px;
  color: var(--fg);
}

/* Button */

.btn {
  display: inline-flex;
  align-items: center;
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

  .areas {
    grid-template-columns: 1fr;
  }
}
</style>