(() => {
  const GLASS_SELECTOR = [
    '#recent-posts .recent-post-item',
    '#aside-content .card-widget',
    '.layout .pagination > *:not(.space)',
    '.article-sort-item',
    '.tag-cloud-list a',
    '.category-lists .category-list a',
    '#page-header.not-top-img #nav',
    '#page-header.nav-fixed #nav',
    '#nav .menus_items .menus_item .menus_item_child',
    '#post-info #post-meta .post-meta-chip',
  ].join(',');

  // 是否支持 backdrop-filter（不支持时无需运行）
  const supportsBackdrop =
    CSS.supports('-webkit-backdrop-filter', 'blur(1px)') ||
    CSS.supports('backdrop-filter', 'blur(1px)');
  if (!supportsBackdrop) return;

  // 用户是否偏好减少动画
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let rafId = null;
  let pendingUpdates = [];

  const flushUpdates = () => {
    rafId = null;
    for (const { el, x, y } of pendingUpdates) {
      el.style.setProperty('--glass-mx', x);
      el.style.setProperty('--glass-my', y);
    }
    pendingUpdates = [];
  };

  const scheduleUpdate = (el, x, y) => {
    // 合并同一帧内对同一元素的多次更新
    const existing = pendingUpdates.findIndex((u) => u.el === el);
    if (existing >= 0) {
      pendingUpdates[existing] = { el, x, y };
    } else {
      pendingUpdates.push({ el, x, y });
    }
    if (!rafId) rafId = requestAnimationFrame(flushUpdates);
  };

  const handlePointer = (clientX, clientY) => {
    const els = document.querySelectorAll(GLASS_SELECTOR);
    for (const el of els) {
      const rect = el.getBoundingClientRect();
      // 只处理视口内可见的元素
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.bottom < 0 || rect.top > window.innerHeight) continue;

      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;

      // 将坐标限制在合理范围内（略微扩展边界，让边缘移动也有效果）
      const cx = Math.min(Math.max(x, -10), 110).toFixed(1) + '%';
      const cy = Math.min(Math.max(y, -10), 110).toFixed(1) + '%';

      scheduleUpdate(el, cx, cy);
    }
  };

  const resetAll = () => {
    const els = document.querySelectorAll(GLASS_SELECTOR);
    for (const el of els) {
      el.style.removeProperty('--glass-mx');
      el.style.removeProperty('--glass-my');
    }
  };

  // 鼠标事件（PC）
  document.addEventListener('mousemove', (e) => {
    handlePointer(e.clientX, e.clientY);
  }, { passive: true });

  document.addEventListener('mouseleave', resetAll, { passive: true });

  // 触摸事件（移动端）
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  document.addEventListener('touchend', resetAll, { passive: true });
  document.addEventListener('touchcancel', resetAll, { passive: true });

  // pjax 翻页后重置
  document.addEventListener('pjax:complete', resetAll);
})();
