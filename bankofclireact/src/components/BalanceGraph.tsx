import { useMemo, useState } from "react";
import type { BalancePoint } from "./BalanceHistory";

interface BalanceGraphProps {
    points: BalancePoint[];
}

const WIDTH = 600;
const HEIGHT = 180;
const PAD = { top: 16, right: 16, bottom: 28, left: 72 };

const formatMoney = (value: number) =>
    `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const shortDate = (timestamp: string) => timestamp.split(",")[0];

export default function BalanceGraph({ points }: BalanceGraphProps) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const { coords, yTicks, areaPath, linePath, innerBottom } = useMemo(() => {
        const balances = points.map((p) => p.balance);
        let min = Math.min(...balances);
        let max = Math.max(...balances);

        const span = max - min;
        const padding = span > 0 ? span * 0.1 : Math.max(Math.abs(max) * 0.02, 1);
        min -= padding;
        max += padding;

        const innerW = WIDTH - PAD.left - PAD.right;
        const innerH = HEIGHT - PAD.top - PAD.bottom;
        const innerBottom = PAD.top + innerH;

        const xFor = (i: number) =>
            points.length === 1 ? PAD.left + innerW / 2 : PAD.left + (i / (points.length - 1)) * innerW;
        const yFor = (v: number) => PAD.top + (1 - (v - min) / (max - min)) * innerH;

        const coords = points.map((p, i) => ({ x: xFor(i), y: yFor(p.balance) }));

        const linePath = coords
            .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
            .join(" ");

        const first = coords[0];
        const last = coords[coords.length - 1];
        const areaPath = `${linePath} L ${last.x.toFixed(1)} ${innerBottom} L ${first.x.toFixed(1)} ${innerBottom} Z`;

        const mid = (max + min) / 2;
        const yTicks = [max, mid, min].map((value) => ({ value, y: yFor(value) }));

        return { coords, yTicks, areaPath, linePath, innerBottom };
    }, [points]);

    const hovered = hoverIndex !== null ? points[hoverIndex] : null;

    return (
        <div className="w-full">
            <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className="w-full h-auto text-accent"
                role="img"
                aria-label="Balance history line chart"
            >
                {/* Horizontal grid lines and y-axis labels */}
                {yTicks.map((tick, i) => (
                    <g key={i}>
                        <line
                            x1={PAD.left}
                            x2={WIDTH - PAD.right}
                            y1={tick.y}
                            y2={tick.y}
                            stroke="currentColor"
                            strokeOpacity={0.12}
                        />
                        <text
                            x={PAD.left - 8}
                            y={tick.y}
                            textAnchor="end"
                            dominantBaseline="middle"
                            fontSize={11}
                            fill="currentColor"
                            opacity={0.7}
                        >
                            {formatMoney(tick.value)}
                        </text>
                    </g>
                ))}

                {/* Filled area under the line */}
                <path d={areaPath} fill="currentColor" fillOpacity={0.12} />

                {/* The line itself */}
                <path
                    d={linePath}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* A visible dot at every transaction, enlarged when hovered */}
                {coords.map((c, i) => (
                    <circle
                        key={`dot-${i}`}
                        cx={c.x}
                        cy={c.y}
                        r={hoverIndex === i ? 5 : 3}
                        fill="currentColor"
                        pointerEvents="none"
                    />
                ))}

                {/* Invisible, larger hit targets so each point is easy to hover or focus */}
                {coords.map((c, i) => (
                    <circle
                        key={`hit-${i}`}
                        cx={c.x}
                        cy={c.y}
                        r={12}
                        fill="transparent"
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onFocus={() => setHoverIndex(i)}
                        onBlur={() => setHoverIndex(null)}
                        tabIndex={0}
                    />
                ))}

                {/* X-axis labels: first and last points */}
                <text
                    x={coords[0].x}
                    y={innerBottom + 18}
                    textAnchor="start"
                    fontSize={11}
                    fill="currentColor"
                    opacity={0.7}
                >
                    {shortDate(points[0].timestamp)}
                </text>
                {points.length > 1 && (
                    <text
                        x={coords[coords.length - 1].x}
                        y={innerBottom + 18}
                        textAnchor="end"
                        fontSize={11}
                        fill="currentColor"
                        opacity={0.7}
                    >
                        {shortDate(points[points.length - 1].timestamp)}
                    </text>
                )}
            </svg>

            <p className="mt-2 text-xs text-muted min-h-4">
                {hovered
                    ? `${shortDate(hovered.timestamp)}: ${formatMoney(hovered.balance)}`
                    : "Hover over a point to see the balance at that transaction."}
            </p>
        </div>
    );
}