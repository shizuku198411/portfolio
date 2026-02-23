<template>
  <section class="security stack">
    <header class="head">
      <div>
        <h1 class="title">Security / Design Notes</h1>
        <p class="muted">
          ここではシステム開発におけるセキュリティに対する考え方をまとめています。
        </p>
      </div>
      <div class="actions">
        <RouterLink class="btn" to="/">Home</RouterLink>
        <RouterLink class="btn" to="/works">Works</RouterLink>
        <RouterLink class="btn" to="/about">About</RouterLink>
      </div>
    </header>

    <!-- Threat Model -->
    <section class="section card">
      <h2 class="section__title">Threat Model</h2>

      <p>
        「何を守り、誰を想定し、どの失敗を許容しないか」を明確にする。
        実装はこの前提の上に乗る。
      </p>

      <div class="tm">
        <div class="tm__col">
          <h3 class="tm__title">守る対象（Assets）</h3>
          <ul>
            <li>開発成果物・ソースコードとその真正性</li>
            <li>実行環境（ホスト/コンテナ/カーネル境界）</li>
            <li>通信（内部通信含む）とポリシー</li>
            <li>監査ログ・証跡（改ざん耐性）</li>
          </ul>
        </div>

        <div class="tm__col">
          <h3 class="tm__title">脅威者（Adversaries）</h3>
          <ul>
            <li>侵害された開発環境・依存関係</li>
            <li>権限を持つ内部者（誤操作/不正）</li>
            <li>コンテナ境界を越える攻撃者</li>
            <li>内部ネットワーク内の攻撃（横展開）</li>
          </ul>
        </div>

        <div class="tm__col">
          <h3 class="tm__title">代表的な脅威（Threats）</h3>
          <ul>
            <li>不正なプロセス実行・ツール持ち込み</li>
            <li>ワークスペース/成果物の改ざん・混入</li>
            <li>通信の盗聴・なりすまし・ポリシー逸脱</li>
            <li>ログ/証跡の欠落・改ざん・追跡不能化</li>
            <li>ホスト/カーネル境界の突破（escape）</li>
          </ul>
        </div>

        <div class="tm__col">
          <h3 class="tm__title">基本方針（Mitigations）</h3>
          <ul>
            <li>境界の明示（分離・最小権限）</li>
            <li>観測可能性（ログ/メトリクス/証跡）</li>
            <li>ポリシーによる許可/禁止の明文化</li>
            <li>検証可能性（再現性、証跡の署名）</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Principle 1 -->
    <section class="section card">
      <h2 class="section__title">1. 信頼境界を明示する</h2>
      <p>
        各レイヤで「何を信頼し、何を検証するか」を明確にする。
        境界が曖昧な設計は、攻撃者にとって都合が良い。
      </p>

      <ul>
        <li>Kernel / Runtime / Application の境界を曖昧にしない</li>
        <li>内部通信も信頼しない（相互認証を前提）</li>
        <li>権限は明示的に制御し、暗黙の権限を減らす</li>
      </ul>

      <div class="links">
        <span class="links__label">関連</span>
        <RouterLink class="pilllink" to="/works#raind">Raind</RouterLink>
        <RouterLink class="pilllink" to="/works#aqua-core">Aqua-Core</RouterLink>
      </div>
    </section>

    <!-- Principle 2 -->
    <section class="section card">
      <h2 class="section__title">2. 可視化できないものは守れない</h2>
      <p>
        挙動を観測できないシステムは、安全ではない。
        監査と可視化は後付けではなく、設計の要件として扱う。
      </p>

      <ul>
        <li>通信ログ（DNS / Netflow / Audit）</li>
        <li>セッション単位の実行証跡</li>
        <li>障害解析に耐える再現性（ログ粒度と整合性）</li>
      </ul>

      <div class="links">
        <span class="links__label">関連</span>
        <RouterLink class="pilllink" to="/works#sessionattested">SessionAttested</RouterLink>
        <RouterLink class="pilllink" to="/works#raind">Raind</RouterLink>
        <RouterLink class="pilllink" to="/works#nodemonitor">NodeMonitor</RouterLink>
      </div>
    </section>

    <!-- Principle 3 -->
    <section class="section card">
      <h2 class="section__title">3. 抽象の裏側を理解する</h2>
      <p>
        高水準の抽象を使う場合でも、低レイヤの制約を理解して設計する。
        ブラックボックス依存は、予期せぬ境界崩壊を招く。
      </p>

      <ul>
        <li>TCP/IP の基礎挙動、RST 等の現実的な落とし穴</li>
        <li>コンテナ隔離（Namespace / cgroups）とその限界</li>
        <li>カーネル境界（システムコール/割り込み/権限）の理解</li>
      </ul>

      <div class="links">
        <span class="links__label">関連</span>
        <RouterLink class="pilllink" to="/works#tcp-ip">tcp-ip</RouterLink>
        <RouterLink class="pilllink" to="/works#aqua-core">Aqua-Core</RouterLink>
        <RouterLink class="pilllink" to="/works#raind">Raind</RouterLink>
      </div>
    </section>

    <!-- Principle 4 -->
    <section class="section card">
      <h2 class="section__title">4. 障害と侵害を前提にする</h2>
      <p>
        障害や侵害は発生し得るものとして扱う。
        失敗時の追跡可能性と復旧可能性まで含めて設計する。
      </p>

      <ul>
        <li>最小権限（Least Privilege）</li>
        <li>分離と横展開抑止（ネットワーク/プロセス）</li>
        <li>証跡（Attestation）と検証フロー</li>
      </ul>

      <div class="links">
        <span class="links__label">関連</span>
        <RouterLink class="pilllink" to="/works#sessionattested">SessionAttested</RouterLink>
        <RouterLink class="pilllink" to="/works#whc-webhook-collector">Webhook-Collector</RouterLink>
        <RouterLink class="pilllink" to="/works#raind">Raind</RouterLink>
      </div>
    </section>

    <!-- Closing -->
    <section class="section card">
      <h2 class="section__title">Conclusion</h2>
      <p>
        セキュリティは後付けの機能ではなく、
        アーキテクチャに組み込まれるべき特性である。
        低レイヤからランタイム、監査まで一貫した設計を行う。
      </p>
    </section>
  </section>
</template>

<style scoped>
.security {
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

.section {
  padding: 16px;
}

.section__title {
  margin: 0 0 10px 0;
  font-size: 16px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
}

ul {
  margin: 10px 0 0 0;
  padding-left: 18px;
  color: var(--fg);
}

/* Threat Model grid */
.tm {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.tm__col {
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(22, 27, 34, 0.45);
  padding: 12px;
}

.tm__title {
  margin: 0 0 6px 0;
  font-size: 13px;
  color: var(--fg);
}

/* Links */
.links {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.links__label {
  color: var(--fg-muted);
  font-size: 12px;
}

.pilllink {
  border: 1px solid var(--border);
  background: rgba(22, 27, 34, 0.65);
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: var(--fg);
  text-decoration: none;
}

.pilllink:hover {
  border-color: var(--accent);
  text-decoration: none;
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

@media (max-width: 900px) {
  .head {
    flex-direction: column;
  }

  .tm {
    grid-template-columns: 1fr;
  }
}
</style>