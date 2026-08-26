const GRAIN_FILTER_ID = 'aura-grain-filter'

const AuraBackground = () => (
  <div aria-hidden="true" className="absolute inset-0 overflow-hidden dark:hidden">
    <div className="absolute inset-0 bg-[#faf8f2]" />
    <div className="aura-layer aura-layer-1" />
    <div className="aura-layer aura-layer-2" />
    <div className="aura-layer aura-layer-3" />
    <div className="aura-layer aura-layer-4" />
    <div className="aura-layer aura-layer-5" />
    <div className="aura-layer aura-layer-6" />
    <div className="aura-grain">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={GRAIN_FILTER_ID}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0.181 0.608 0.061 0 0.075
                    0.181 0.608 0.061 0 0.075
                    0.181 0.608 0.061 0 0.075
                    0     0     0     1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${GRAIN_FILTER_ID})`} />
      </svg>
    </div>
    <div className="aura-grain-solid">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" filter={`url(#${GRAIN_FILTER_ID})`} />
      </svg>
    </div>
  </div>
)

export default AuraBackground
