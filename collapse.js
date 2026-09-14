(() => {
  const shell = document.querySelector('.app-shell');
  const nav = document.getElementById('nav');
  const button = document.getElementById('collapseBtn');
  const storageKey = 'nexa-navigation-collapsed';

  if (!shell || !nav || !button) return;

  const labelItems = () => {
    nav.querySelectorAll('[data-page]').forEach((item) => {
      const visibleLabel = item.textContent.trim().replace(/^\S+\s*/, '');
      item.dataset.label = visibleLabel;
      item.title = visibleLabel;
    });
  };

  const setCollapsed = (collapsed) => {
    shell.classList.toggle('nav-collapsed', collapsed);
    button.setAttribute('aria-expanded', String(!collapsed));
    button.setAttribute('aria-label', collapsed ? '展開導航列' : '收合導航列');
    button.title = collapsed ? '展開導航列' : '收合導航列';
    localStorage.setItem(storageKey, collapsed ? 'true' : 'false');
  };

  labelItems();
  setCollapsed(localStorage.getItem(storageKey) === 'true' && window.innerWidth > 800);

  button.addEventListener('click', () => {
    setCollapsed(!shell.classList.contains('nav-collapsed'));
  });

  new MutationObserver(labelItems).observe(nav, { childList: true, subtree: true });
})();
