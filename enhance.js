(() => {
  const root = document.getElementById('content');
  if (!root) return;

  const page = () => location.hash.slice(1) || 'dashboard';
  const stamp = () => `
    <div class="data-provenance" data-enhanced="provenance">
      <div class="provenance-items">
        <span>資料更新時間 <strong>2026/09/15 15:30:00</strong></span>
        <span>資料區間 <strong>2026/09/15 00:00～15:30</strong></span>
        <span>來源 <strong>SFC／MES／設備端／雲智判／人工複判</strong></span>
        <span>時區 <strong>UTC+8</strong></span>
      </div><span class="sync-ok">即時同步成功 · 延遲 18 秒</span>
    </div>`;

  const filters = () => `
    <div class="enterprise-filter" data-enhanced="filters">
      <div class="filter-field"><label>廠區</label><select><option>深圳一廠</option><option>全部廠區</option></select></div>
      <div class="filter-field"><label>專案</label><select><option>1001 AL Housing</option><option>全部專案</option></select></div>
      <div class="filter-field"><label>樓層／線別</label><select><option>F2／LINE-03</option><option>全部</option></select></div>
      <div class="filter-field"><label>製程／工站</label><select><option>全部工站</option><option>ST21-BURR-INSPECTION</option></select></div>
      <div class="filter-field"><label>日期區間</label><input value="2026/09/15～2026/09/15" aria-label="日期區間"></div>
      <div class="filter-actions"><button class="search">搜尋</button><button class="clear">清除條件</button></div>
      <div class="filter-summary">已套用：深圳一廠、1001 AL Housing、F2／LINE-03｜共 50,873 筆有效檢測</div>
    </div>`;

  const definitions = () => `
    <div class="definition-strip" data-enhanced="definitions">
      <div><span>檢測良率口徑</span><strong>最後一次有效 OK ÷ 有效檢測總數 × 100%</strong></div>
      <div><span>重複檢測</span><strong>採最後一次有效判定</strong></div>
      <div><span>人工複判</span><strong>已回寫最終良率</strong></div>
      <div><span>異常工站門檻</span><strong>良率 &lt; 95.50% 或連續 3 次告警</strong></div>
    </div>`;

  const dashboardModules = () => `
    <section class="module-section" data-enhanced="dashboard-modules">
      <div class="module-heading"><h2>營運風險與資料品質</h2><span>依影響程度排序 · 點擊工站可查看詳情</span></div>
      <div class="module-grid">
        <article class="module-card danger"><span class="label">高風險 · 品質</span><h3>ST21 良率低於門檻</h3><p>94.76%，較目標低 0.74 個百分點；NG 集中於 MOLD-04／Cavity 03。</p></article>
        <article class="module-card warning"><span class="label">待處理 · 複判</span><h3>7 件將於 10 分鐘內逾時</h3><p>特保區目前 3 人在線，最長等待 08:41，建議優先處理高信心 NG。</p></article>
        <article class="module-card info"><span class="label">資料品質</span><h3>圖片完整率 99.62%</h3><p>缺少 19 張圖片；2 臺設備上傳延遲超過 5 分鐘，尚未影響良率計算。</p></article>
        <article class="module-card success"><span class="label">模型監控</span><h3>AI／人工一致率 97.84%</h3><p>模型 VIS-2.4.1 無漂移警示；今日複判率 0.83%，漏判率 0.18%。</p></article>
      </div>
    </section>`;

  const stabilityModules = () => `
    <section class="card module-section" data-enhanced="stability-spec">
      <div class="module-heading"><h2>檢測位置規格統計</h2><span>Area／Width／Gap · 樣本數 12,480 · 更新於 15:30</span></div>
      <div class="table-wrap"><table class="spec-table"><thead><tr><th>點位</th><th>量測類型</th><th>Min SPEC</th><th>Max SPEC</th><th>實際最小</th><th>實際最大</th><th>平均值</th><th>標準差</th><th>±3σ</th><th>超限數</th><th>狀態</th></tr></thead><tbody>
        <tr><td>C0</td><td>Gap</td><td class="num">0.180</td><td class="num">0.240</td><td class="num">0.186</td><td class="num">0.232</td><td class="num">0.208</td><td class="num">0.006</td><td class="num">0.018</td><td class="num">2</td><td><span class="status-chip ok">正常</span></td></tr>
        <tr><td>C3</td><td>Width</td><td class="num">1.420</td><td class="num">1.580</td><td class="num">1.398</td><td class="num">1.611</td><td class="num">1.506</td><td class="num">0.031</td><td class="num">0.093</td><td class="num">47</td><td><span class="status-chip error">超限</span></td></tr>
        <tr><td>C8</td><td>Area</td><td class="num">8.200</td><td class="num">8.800</td><td class="num">8.244</td><td class="num">8.764</td><td class="num">8.501</td><td class="num">0.082</td><td class="num">0.246</td><td class="num">0</td><td><span class="status-chip ok">正常</span></td></tr>
        <tr><td>C14</td><td>Gap</td><td class="num">0.160</td><td class="num">0.220</td><td class="num">0.158</td><td class="num">0.219</td><td class="num">0.191</td><td class="num">0.009</td><td class="num">0.027</td><td class="num">8</td><td><span class="status-chip warn">注意</span></td></tr>
      </tbody></table></div>
    </section>`;

  const traceModules = () => `
    <section class="module-section" data-enhanced="trace-flow">
      <div class="module-heading"><h2>缺陷追溯證據鏈</h2><span>相似度門檻 ≥ 0.85 · 人工確認後保存</span></div>
      <div class="module-grid">
        <article class="module-card info"><span class="label">1–2｜確認資料</span><h3>SN 與不良圖片</h3><p>初始、雲智判與人工複判結果並列；保留模型框選、拍攝設備與判定時間。</p></article>
        <article class="module-card warning"><span class="label">3–4｜標記缺陷</span><h3>點位與缺陷類型</h3><p>支援 RCV 示意圖、實物圖、縮放、全螢幕與多張樣本切換。</p></article>
        <article class="module-card info"><span class="label">5–6｜關聯分析</span><h3>相似案例與上下游</h3><p>顯示相關點位、關聯數量、相似度、推薦理由與優先追溯順序。</p></article>
        <article class="module-card success"><span class="label">7–8｜保存輸出</span><h3>保存關聯與匯出</h3><p>保存操作人、時間、人工確認結果，並產出可稽核的追溯報告。</p></article>
      </div>
    </section>`;

  const taskModules = () => `
    <section class="module-section" data-enhanced="tasks">
      <div class="module-heading"><h2>匯入／匯出與例外狀態</h2><span>所有敏感操作保留稽核紀錄</span></div>
      <div class="state-gallery">
        <div class="state-box"><strong>匯入完成</strong>共 100 筆；成功 92、失敗 6、跳過 2。可下載錯誤報告。</div>
        <div class="state-box"><strong>匯出產生中</strong>已依目前搜尋條件建立 50 筆 XLSX 任務。</div>
        <div class="state-box"><strong>資料同步延遲</strong>目前顯示最近一次成功同步結果，可重新載入。</div>
        <div class="state-box"><strong>權限不足</strong>未遮罩 SN、圖片下載與判定修改需經角色授權。</div>
      </div>
    </section>`;

  function apply() {
    if (root.querySelector('[data-enhanced="provenance"]')) return;
    const head = root.querySelector('.page-head');
    if (!head) return;
    head.insertAdjacentHTML('afterend', stamp() + filters() + definitions());
    const p = page();
    const anchor = root.querySelector('.kpi-grid, .grid-2, .card');
    if (!anchor) return;
    if (p === 'dashboard') anchor.insertAdjacentHTML('beforebegin', dashboardModules());
    if (p === 'stability' || p === 'equipment-yield' || p === 'spc') root.insertAdjacentHTML('beforeend', stabilityModules());
    if (p === 'trace' || p === 'sn-report' || p === 'equipment-report') anchor.insertAdjacentHTML('beforebegin', traceModules());
    if (['lists','notices','logs','login-logs','workflow'].includes(p)) anchor.insertAdjacentHTML('beforebegin', taskModules());
    root.querySelectorAll('.filter-actions button').forEach(button => button.addEventListener('click', () => showToast(button.classList.contains('search') ? '已套用查詢條件，共 50,873 筆資料' : '已清除所有查詢條件')));
  }

  new MutationObserver(() => queueMicrotask(apply)).observe(root, { childList: true });
  apply();
})();
