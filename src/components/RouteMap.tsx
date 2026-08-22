type Stop = {
  x: number;
  y: number;
  label: string;
  sublabel: string;
  labelDy: number;
};

const MADRID: Stop = { x: 178, y: 160, label: "Madrid", sublabel: "Aug 30 – Sep 2", labelDy: -16 };
const SAN_SEBASTIAN: Stop = {
  x: 268,
  y: 25,
  label: "San Sebastián",
  sublabel: "Sep 2 – Sep 5",
  labelDy: -16,
};
const BILBAO: Stop = { x: 145, y: 30, label: "Bilbao", sublabel: "Sep 5 – Sep 6", labelDy: -16 };

const STOPS = [MADRID, SAN_SEBASTIAN, BILBAO];

// Simplified silhouette of mainland Spain (Portugal excluded) - a decorative
// backdrop, not a navigational map.
const SPAIN_OUTLINE =
  "M28.6,16.4 " +
  "C90,10 140,8 174.6,12.3 " +
  "C260,16 330,30 387.3,57.4 " +
  "C375,75 368,88 363.5,98.5 " +
  "C340,130 305,155 282.5,176.4 " +
  "C260,220 235,255 215.9,287.2 " +
  "C185,300 155,310 127,316.4 " +
  "C95,300 70,285 60.3,270.8 " +
  "C55,245 60,220 73,201 " +
  "C68,165 70,125 79.4,94.4 " +
  "C60,65 40,40 28.6,16.4 Z";

export default function RouteMap() {
  const routeD = `M${MADRID.x},${MADRID.y} Q${(MADRID.x + SAN_SEBASTIAN.x) / 2 + 30},${
    (MADRID.y + SAN_SEBASTIAN.y) / 2
  } ${SAN_SEBASTIAN.x},${SAN_SEBASTIAN.y} L${BILBAO.x},${BILBAO.y}`;

  return (
    <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 sm:p-6">
      <svg
        viewBox="0 0 400 330"
        className="w-full h-auto"
        role="img"
        aria-label="Route map: Madrid to San Sebastián to Bilbao"
      >
        <path
          d={SPAIN_OUTLINE}
          className="fill-[var(--ink)]/[0.05] stroke-[var(--ink)]/25"
          strokeWidth={1.5}
        />
        <path
          d={routeD}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2.5}
          strokeDasharray="7 6"
          strokeLinecap="round"
        />

        {/* Plane: Newark -> Madrid */}
        <text x={MADRID.x - 60} y={MADRID.y + 10} fontSize={16} textAnchor="middle">
          ✈️
        </text>
        {/* Car: Madrid -> San Sebastián */}
        <text x={(MADRID.x + SAN_SEBASTIAN.x) / 2 + 20} y={90} fontSize={14} textAnchor="middle">
          🚗
        </text>
        {/* Plane: Bilbao -> Newark */}
        <text x={BILBAO.x - 35} y={BILBAO.y + 2} fontSize={16} textAnchor="middle">
          ✈️
        </text>

        {STOPS.map((stop) => (
          <g key={stop.label}>
            <circle
              cx={stop.x}
              cy={stop.y}
              r={6}
              fill="var(--accent)"
              stroke="var(--background)"
              strokeWidth={2}
            />
            <text
              x={stop.x}
              y={stop.y + stop.labelDy}
              textAnchor="middle"
              className="fill-[var(--foreground)] font-heading"
              fontSize={13}
            >
              {stop.label}
            </text>
            <text
              x={stop.x}
              y={stop.y + 24}
              textAnchor="middle"
              className="fill-[var(--foreground)]/60"
              fontSize={10}
            >
              {stop.sublabel}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
