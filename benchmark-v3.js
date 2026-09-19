(() => {
  const root = document.getElementById('content');
  if (!root) return;
  const page = () => location.hash.slice(1) || 'dashboard';
  const status = (label, kind='ok') => `<span class="status-chip ${kind}">${label}</span>`;
  const table = (heads, rows) => `<div class="table-wrap"><table class="data-table benchmark-table"><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  function operatingModel() {
    return `<section class="operating-model" data-benchmark="operating-model">
      <div class="model-heading"><div><span>QUALITY INTELLIGENCE OPERATING MODEL</span><h2>從影像判定，升級為跨廠品質閉環</h2></div><button onclick="go('quality-intelligence')">進入品質智慧中心 →</button></div>
      <div class="model-rail">
        <article><b>01</b><span>現場採集</span><strong>既有相機／Robot／AOI</strong><small>硬體無關 · 受控光學 · 360° 多視角</small></article>
        <article><b>02</b><span>AI 判定</span><strong>分類＋異常偵測</strong><small>已知缺陷分類 · 少量良品學習 · Pixel-level 定位</small></article>
        <article><b>03</b><span>人機協作</span><strong>Review by exception</strong><small>熱圖／框選 · SLA · Critical 雙重核准</small></article>
        <article><b>04</b><span>品質智慧</span><strong>跨廠根因與改善</strong><small>MES／QMS／ERP 關聯 · 風險排序 · 成效驗證</small></article>
      </div>
    </section>`;
  }

  function dashboard() {
    const kpi = root.querySelector('.kpi-grid');
    if (kpi && !root.querySelector('[data-benchmark="operating-model"]')) kpi.insertAdjacentHTML('beforebegin', operatingModel());
    const station = root.querySelector('.station-table');
    if (station && !station.querySelector('th[data-edge]')) {
      station.querySelector('thead tr').insertAdjacentHTML('beforeend','<th data-edge>Edge 模式</th><th>影像策略</th>');
      const modes=[['GPU Edge','分類＋定位'],['CPU Edge','Good-only 異常'],['Industrial Edge','缺陷分類'],['GPU Edge','尺寸量測'],['Hybrid Edge','分類＋異常']];
      station.querySelectorAll('tbody tr').forEach((tr,i)=>tr.insertAdjacentHTML('beforeend',`<td>${modes[i][0]}</td><td>${modes[i][1]}</td>`));
    }
  }

  function inspectionStudio() {
    return `<div data-benchmark="page" class="benchmark-page">
      <section class="studio-hero">
        <div><span class="section-kicker">NO-CODE INSPECTION STUDIO</span><h2>建立 ST10 鋁合金外觀檢測</h2><p>將拍攝配方、檢查區域、分類模型與 Good-only 異常模型組合成可核准、可回退的檢測方案。</p></div>
        <div class="recipe-state">配方 <strong>RCP-AL-018 V6</strong>${status('草稿','warn')}</div>
      </section>
      <div class="studio-grid">
        <aside class="recipe-steps">${[['1','影像來源','CAM-02 · 12 MP'],['2','檢查區域','4 ROI · 1 Critical Zone'],['3','AI 策略','Hybrid'],['4','判定門檻','OK／REVIEW／NG'],['5','黃金驗證','1,284 張'],['6','發布範圍','ST10 · Shadow Mode']].map((x,i)=>`<button class="${i===2?'active':''}"><i>${x[0]}</i><span><strong>${x[1]}</strong><small>${x[2]}</small></span></button>`).join('')}</aside>
        <section class="card strategy-canvas"><div class="card-head"><div><h2>AI 策略組合</h2><span class="card-sub">依瑕疵風險選擇不同學習方式</span></div><button class="button primary" onclick="showToast('已儲存 AI 策略草稿')">儲存草稿</button></div>
          <div class="strategy-options"><article class="selected"><span>已知缺陷分類</span><strong>SCRATCH／DENT／BURR</strong><p>利用標註 NG 樣本精準分類，降低可接受外觀差異造成的誤判。</p>${status('啟用','ok')}</article><article class="selected"><span>Good-only 異常偵測</span><strong>UNKNOWN-ANOMALY</strong><p>以少量核准良品建立正常基準，捕捉尚未定義的新型態異常。</p>${status('啟用','ok')}</article><article><span>規則量測</span><strong>Gap／Width／Area</strong><p>保留可解釋的尺寸規格與 SPC 管制界線。</p>${status('選用','neutral')}</article></div>
          <div class="threshold-panel"><div><span>OK 門檻</span><strong>≥ 0.86</strong></div><div><span>REVIEW 區間</span><strong>0.62–0.86</strong></div><div><span>NG 門檻</span><strong>≥ 0.78</strong></div><div><span>目標推論 P95</span><strong>≤ 500 ms</strong></div></div>
        </section>
      </div>
      <section class="card">${table(['驗證集','樣本','Critical Recall','誤殺率','未知異常召回','結果'],[['GV-1001 V3','1,284','100%','2.31%','96.8%',status('可進入 Shadow Mode','ok')],['夜班反光組','286','100%','3.84%','94.1%',status('需調整光源','warn')]])}</section>
    </div>`;
  }

  function qualityIntelligence() {
    return `<div data-benchmark="page" class="benchmark-page">
      <section class="intelligence-brief"><div><span class="section-kicker">AI INVESTIGATION · QI-260919-003</span><h2>ST21 毛刺風險與 MOLD-04／Cavity 03 高度相關</h2><p>系統比對 14 日檢測、換模、維護、班別與原料批次後，將三項可能根因依證據強度排序。所有建議須由工程師核准後才能建立改善任務。</p></div><div class="confidence-ring"><strong>92</strong><span>證據可信度</span></div></section>
      <div class="evidence-grid"><article><span>最可能原因</span><strong>模具穴位磨耗</strong><b>相關性 0.88</b><p>NG 在換模後第 18,000 件開始上升，Cavity 03 占同型缺陷 64%。</p></article><article><span>次要原因</span><strong>刀具壽命接近上限</strong><b>相關性 0.71</b><p>刀具累積加工數 47,820，較建議更換點高 6.3%。</p></article><article><span>需排除因素</span><strong>夜班光源衰減</strong><b>相關性 0.46</b><p>影像亮度下降，但人工確認的實體毛刺同步增加，非單純視覺誤判。</p></article></div>
      <section class="card action-board"><div class="card-head"><div><h2>閉環改善計畫</h2><span class="card-sub">隔離 → 根因 → 試行 → 成效驗證 → 標準化</span></div><button class="button primary" onclick="showToast('已建立改善案件 CAPA-260919-12')">建立改善案件</button></div>${table(['動作','影響範圍','負責人','期限','驗證指標','狀態'],[['隔離 Cavity 03 近 2 小時產品','328 件','品質工程','16:30','追溯完整率 100%',status('進行中','warn')],['更換 MOLD-04 襯套','ST21','模具工程','18:00','毛刺 NG < 1.2%',status('待執行','neutral')],['Shadow 比較 500 件','VIS-2.5.0','AI 團隊','明日 10:00','Recall ≥ 99%',status('排程中','neutral')]])}</section>
    </div>`;
  }

  function deploymentFleet() {
    return `<div data-benchmark="page" class="benchmark-page">
      <div class="fleet-summary"><div><span>全球廠區</span><strong>8</strong><small>3 個國家／地區</small></div><div><span>生產工站</span><strong>128</strong><small>124 在線</small></div><div><span>硬體相容</span><strong>7 類相機</strong><small>GenICam／GigE／USB3</small></div><div><span>部署一致率</span><strong>98.4%</strong><small>2 臺待同步</small></div></div>
      <section class="fleet-map"><div class="map-title"><span class="section-kicker">GLOBAL EDGE FLEET</span><h2>模型、配方與設備狀態</h2></div><div class="site-nodes"><article style="--x:18%;--y:48%"><i></i><strong>深圳一廠</strong><span>32 工站 · 1 警告</span></article><article style="--x:42%;--y:32%"><i></i><strong>昆山廠</strong><span>28 工站 · 正常</span></article><article style="--x:68%;--y:44%"><i></i><strong>越南北寧</strong><span>40 工站 · 1 待同步</span></article><article style="--x:82%;--y:24%"><i></i><strong>德國廠</strong><span>28 工站 · 正常</span></article></div></section>
      <section class="card">${table(['廠區／工站','Edge 類型','AI 模式','正式模型','配方','資料延遲','狀態'],[['深圳／ST10','GPU Edge','Hybrid','VIS-2.4.1','RCP-18 V5','18 秒',status('正常','ok')],['深圳／ST14','CPU Edge','Good-only','ANM-1.8.2','RCP-12 V8','42 秒',status('影像積壓','warn')],['北寧／ST07','Industrial Edge','分類','VIS-2.4.1','RCP-18 V4','—',status('配方待同步','error')],['德國／ST03','Industrial Edge','分類＋定位','VIS-2.3.9','RCP-16 V2','26 秒',status('正常','ok')]])}</section>
    </div>`;
  }

  function renderCustom(pageName) {
    if (root.querySelector('[data-benchmark="page"]')) return;
    const anchor = root.querySelector('.enterprise-filter');
    if (!anchor) return;
    const old = root.querySelector('.enterprise-filter ~ .definition-strip');
    let html = pageName==='inspection-studio' ? inspectionStudio() : pageName==='quality-intelligence' ? qualityIntelligence() : pageName==='deployment-fleet' ? deploymentFleet() : '';
    if (!html) return;
    (old || anchor).insertAdjacentHTML('afterend', html);
    root.querySelectorAll(':scope > .card:not([data-benchmark] .card), :scope > .v2-kpis').forEach(el=>{ if(!el.closest('[data-benchmark="page"]')) el.classList.add('legacy-hidden'); });
  }

  function apply(){ const p=page(); if(p==='dashboard') dashboard(); renderCustom(p); }
  new MutationObserver(()=>queueMicrotask(apply)).observe(root,{childList:true});
  apply();
})();
