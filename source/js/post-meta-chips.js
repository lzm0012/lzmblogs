(() => {
  const getText = (el) => (el ? el.textContent.trim() : '');
  const getClassName = (el) => (el ? el.className : '');

  const createChip = (iconClass, label, valueNode, chipClass) => {
    if (!valueNode || !getText(valueNode)) return null;

    const chip = document.createElement('span');
    chip.className = `post-meta-chip ${chipClass || ''}`.trim();

    if (iconClass) {
      const icon = document.createElement('i');
      icon.className = iconClass;
      chip.appendChild(icon);
    }

    if (label) {
      const labelEl = document.createElement('span');
      labelEl.className = 'post-meta-label';
      labelEl.textContent = label.replace(/:\s*$/, '');
      chip.appendChild(labelEl);
    }

    valueNode.classList.add('post-meta-value');
    chip.appendChild(valueNode);
    return chip;
  };

  const buildPostMetaChips = () => {
    const postMeta = document.querySelector('#post-info #post-meta');
    if (!postMeta || postMeta.dataset.chipsBuilt === 'true') return;

    const firstLine = postMeta.querySelector('.meta-firstline');
    const secondLine = postMeta.querySelector('.meta-secondline');
    if (!firstLine || !secondLine) return;

    const firstLineIcons = firstLine.querySelectorAll('i.post-meta-icon');
    const secondLineIcons = secondLine.querySelectorAll('i.post-meta-icon');
    const firstLineLabels = firstLine.querySelectorAll('.post-meta-label');
    const secondLineLabels = secondLine.querySelectorAll('.post-meta-label');

    const chips = [];

    const createdChip = createChip(
      getClassName(firstLineIcons[0]),
      getText(firstLineLabels[0]),
      postMeta.querySelector('.post-meta-date-created')?.cloneNode(true),
      'post-meta-chip-strong'
    );
    if (createdChip) chips.push(createdChip);

    const updatedChip = createChip(
      getClassName(firstLineIcons[1]),
      getText(firstLineLabels[1]),
      postMeta.querySelector('.post-meta-date-updated')?.cloneNode(true),
      'post-meta-chip-strong'
    );
    if (updatedChip) chips.push(updatedChip);

    const wordValue = document.createElement('span');
    wordValue.textContent = getText(postMeta.querySelector('.word-count'));
    const wordChip = createChip(getClassName(secondLineIcons[0]), getText(secondLineLabels[0]), wordValue, 'post-meta-chip-medium');
    if (wordChip) chips.push(wordChip);

    const readingNode = secondLineLabels[1]?.nextElementSibling;
    const readingValue = document.createElement('span');
    readingValue.textContent = getText(readingNode);
    const readingChip = createChip(getClassName(secondLineIcons[1]), getText(secondLineLabels[1]), readingValue, 'post-meta-chip-medium');
    if (readingChip) chips.push(readingChip);

    const pvSource = postMeta.querySelector('#busuanzi_value_page_pv');
    const pvValue = document.createElement('span');
    pvValue.id = 'busuanzi_value_page_pv';
    if (pvSource) pvValue.innerHTML = pvSource.innerHTML;
    const pvChip = createChip(getClassName(secondLineIcons[2]), getText(secondLineLabels[2]), pvValue, 'post-meta-chip-strong');
    if (pvChip) chips.push(pvChip);

    if (!chips.length) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'post-meta-chip-list';
    chips.forEach((chip) => wrapper.appendChild(chip));

    postMeta.innerHTML = '';
    postMeta.appendChild(wrapper);
    postMeta.dataset.chipsBuilt = 'true';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildPostMetaChips);
  } else {
    buildPostMetaChips();
  }

  document.addEventListener('pjax:complete', buildPostMetaChips);
})();
