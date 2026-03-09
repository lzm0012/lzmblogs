(() => {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const DEF_ID = 'liquid-glass-defs';

  const injectDefs = () => {
    if (document.getElementById(DEF_ID)) return;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('id', DEF_ID);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    svg.style.pointerEvents = 'none';

    svg.innerHTML = `
      <defs>
        <filter id="liquid-distort-soft" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="13" result="noise">
            <animate attributeName="baseFrequency" dur="22s" values="0.008 0.014;0.012 0.017;0.008 0.014" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="liquid-distort-medium" x="-40%" y="-40%" width="180%" height="180%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.02" numOctaves="2" seed="17" result="noise">
            <animate attributeName="baseFrequency" dur="18s" values="0.011 0.02;0.016 0.024;0.011 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="liquid-distort-strong" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.026" numOctaves="3" seed="23" result="noise">
            <animate attributeName="baseFrequency" dur="14s" values="0.014 0.026;0.02 0.03;0.014 0.026" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="liquid-sheen-soft" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.015" numOctaves="1" seed="11" result="grain">
            <animate attributeName="baseFrequency" dur="20s" values="0.018 0.015;0.022 0.017;0.018 0.015" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="4" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feGaussianBlur in="warped" stdDeviation="0.35" />
        </filter>
      </defs>
    `;

    document.body.appendChild(svg);
    document.documentElement.classList.add('liquid-glass-svg-ready');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectDefs);
  } else {
    injectDefs();
  }

  document.addEventListener('pjax:complete', injectDefs);
})();
