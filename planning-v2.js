(() => {
  const root = document.getElementById('content');
  const currentPage = () => location.hash.slice(1) || 'dashboard';
  const chip = (text, cls='') => `<span class="status-chip ${cls}">${text}</span>`;
  const panel = (title, sub, body, cls='') => `<section class="card governance-card ${cls}"><div class="card-head"><div><h2>${title}</h2><span class="card-sub">${sub}</span></div></div>${body}</section>`;
  const lifecycle = (active) => `<div class="lifecycle">${['草稿','訓練','驗證','品質核准','Shadow Mode','正式發布','停用'].map((x,i)=>`<div class="life-step ${i<=active?'done':''}"><i>${i+1}</i><span>${x}</span></div>`).join('')}</div>`;
  const matrix = (heads, rows) => `<div class="table-wrap"><table class="data-table v2-table"><thead><tr>${heads.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  function dashboardUpgrade() {
    const kpis = root.querySelectorAll('.kpi-grid .kpi');
    if (kpis.length >= 6) {
      const values = [
        ['總工站數量','32','28 在線 · 4 維護'],['今日檢測數','50,873','有效產品數；另有 51,204 次檢測'],['最終良率','97.46%','較昨日 +0.42 個百分點'],['最終 NG','1,294','產品 NG 只計一次'],['人工復判 OK','189','AI 誤殺率 2.86%'],['今日異常工站','3','1 嚴重 · 2 警告']
      ];
      kpis.forEach((el,i)=>{el.querySelector('.kpi-label').textContent=values[i][0];el.querySelector('.kpi-value').textContent=values[i][1];el.querySelector('.delta').textContent=values[i][2];});
    }
    const target = root.querySelector('.kpi-grid');
    if (target && !root.querySelector('[data-v2="ops"]')) target.insertAdjacentHTML('afterend', `<section class="ops-strip" data-v2="ops">
      <div><span>AI 初判良率</span><strong>96.91%</strong><small>暫估，不含待復判 42 件</small></div>
      <div><span>一次良率 FPY</span><strong>96.82%</strong><small>未經重工即合格</small></div>
      <div><span>影像失敗率</span><strong>0.38%</strong><small>正常門檻 ≤ 1%</small></div>
      <div><span>推論 P95</span><strong>326 ms</strong><small>目標 ≤ 500 ms</small></div>
      <div><span>資料完整率</span><strong>99.96%</strong><small>19 筆待補圖片</small></div>
    </section>`);
  }

  function governancePage(page) {
    if (root.querySelector('[data-v2-page]')) return;
    let html='';
    if (['models','model-compare','model-release','datasets','samples'].includes(page)) html = `
      <div class="v2-kpis" data-v2-page><div><span>正式模型</span><strong>18</strong><small>17 健康 · 1 觀察</small></div><div><span>Shadow Mode</span><strong>3</strong><small>累積 28,460 件</small></div><div><span>Critical Recall</span><strong>100%</strong><small>黃金驗證集 1,284 張</small></div><div><span>AI／人工一致率</span><strong>97.84%</strong><small>近 7 日 +0.31 個百分點</small></div></div>
      <div class="grid-2">${panel('模型生命週期','品質與 AI 雙重核准後才可正式發布',lifecycle(page==='model-release'?5:4))}${panel('候選模型 VIS-2.5.0','相較正式版 VIS-2.4.1',matrix(['指標','正式版','候選版','門檻'],[['Precision','98.7%','99.1%','≥ 98%'],['Recall','99.2%','99.5%','≥ 99%'],['誤殺率','2.86%','2.31%','≤ 3%'],['推論 P95','326 ms','348 ms','≤ 500 ms']]))}</div>
      ${panel('發布與治理檢查','資料集 DS-AL-042 V7 · 黃金驗證 GV-1001 V3',matrix(['檢查項目','結果','責任人','時間'],[['Critical 缺陷逐件驗證',chip('通過','ok'),'品質工程師 王小姐','2026/09/14 17:20:08'],['資料洩漏檢查',chip('通過','ok'),'AI 工程師 Chen Wei','2026/09/14 16:42:11'],['跨班別穩定性',chip('觀察中','warn'),'製程工程師 李先生','2026/09/15 14:30:05'],['回退版本確認',chip('已就緒','ok'),'系統管理員','2026/09/15 15:10:22']]))}`;
    if (['station-health','calibration','first-article','maintenance'].includes(page)) html = `<div class="v2-kpis" data-v2-page><div><span>在線設備</span><strong>124 / 128</strong><small>96.88% 在線</small></div><div><span>版本一致</span><strong>126</strong><small>2 臺待同步</small></div><div><span>校正即將到期</span><strong>5</strong><small>7 日內到期</small></div><div><span>首件待核准</span><strong>2</strong><small>PLC 量產鎖定中</small></div></div>${panel('工站健康矩陣','相機、光源、PLC、Edge 與網路',matrix(['工站','相機／光源','PLC','Edge','版本','狀態'],[['ST10-VISION-INSPECTION',chip('正常','ok'),chip('8 ms','ok'),chip('GPU 48%','ok'),'VIS-2.4.1／RCP-18',chip('在線','ok')],['ST14-SURFACE-CHECK',chip('重拍率 2.4%','warn'),chip('11 ms','ok'),chip('積壓 128','warn'),'VIS-2.3.8／RCP-12',chip('警告','warn')],['ST21-BURR-INSPECTION',chip('正常','ok'),chip('9 ms','ok'),chip('GPU 61%','ok'),'VIS-1.9.6／RCP-09',chip('在線','ok')],['ST32-FINAL-VISION',chip('維護中','neutral'),chip('離線','error'),'—','VIS-2.7.2／RCP-04',chip('維護中','neutral')]]))}`;
    if (['data-quality','integrations','task-center','reports','alarm-rules'].includes(page)) html = `<div class="v2-kpis" data-v2-page><div><span>介面成功率</span><strong>99.98%</strong><small>近 24 小時</small></div><div><span>重試佇列</span><strong>23</strong><small>不計入正式良率</small></div><div><span>資料品質問題</span><strong>31</strong><small>6 筆高風險</small></div><div><span>背景任務</span><strong>4</strong><small>3 匯出 · 1 匯入</small></div></div>${panel('跨系統一致性與重試','每筆事件使用唯一 ID，補傳不重複計數',matrix(['問題','來源','影響資料','狀態','責任人'],[['圖片缺失 19 筆','Edge／影像儲存','ST14 · 19 個 SN',chip('重試中','warn'),'設備工程'],['SFC 與最終結果不一致 6 筆','SFC／雲智判','WO-260915-08',chip('待確認','error'),'MES 團隊'],['設備映射缺失 4 筆','MES 主資料','EQ-SZ-118',chip('處理中','warn'),'主資料管理'],['離線補傳重複 2 筆','Edge','已隔離，不計入指標',chip('已攔截','ok'),'平台維運']]))}`;
    if (!html) return;
    const first = root.querySelector('.enterprise-filter') || root.querySelector('.card');
    if (first) first.insertAdjacentHTML('afterend', html);
  }

  function apply() {
    renderNav(currentPage());
    const page=currentPage();
    if(page==='dashboard') dashboardUpgrade();
    governancePage(page);
  }
  let queued=false;
  new MutationObserver(()=>{if(queued)return;queued=true;queueMicrotask(()=>{queued=false;apply();});}).observe(root,{childList:true,subtree:false});
  apply();
})();
