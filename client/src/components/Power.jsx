import cc from "clsx";
import React from "react";
import { useGauge } from "use-gauge";
export function Power(props) {
  const { value } = props;
  const gauge = useGauge({
    domain: [0, 100],
    startAngle: 90,
    endAngle: 270,
    numTicks: 21,
    diameter: 200,
  });

  const needle = gauge.getNeedleProps({
    value,
    baseRadius: 8,
    tipRadius: 2,
  });

  return (
    <div className="p-4">
      <svg className="w-full overflow-visible p-2" {...gauge.getSVGProps()}>
        <g id="ticks">
          {gauge.ticks.map((angle) => {
            const asValue = gauge.angleToValue(angle);
            const showText = asValue % 20 === 0;

            return (
              <React.Fragment key={`tick-group-${angle}`}>
                <line
                  className={cc([
                    "stroke-gray-300",
                    {
                      "stroke-green-300": asValue <= 20,
                      "stroke-yellow-300": asValue >= 60 && asValue <= 80,
                      "stroke-red-400": asValue >= 80,
                    },
                  ])}
                  strokeWidth={2}
                  {...gauge.getTickProps({
                    angle,
                    length: 8,
                  })}
                />
                {showText && (
                  <text
                    className="text-sm fill-gray-400 font-medium"
                    {...gauge.getLabelProps({ angle, offset: 20 })}
                  >
                    {asValue}
                  </text>
                )}
              </React.Fragment>
            );
          })}
        </g>
        <g id="needle">
          <circle className="fill-gray-300" {...needle.base} r={12} />
          <circle className="fill-gray-700" {...needle.base} />
          <circle className="fill-gray-700" {...needle.tip} />
          <polyline className="fill-gray-700" points={needle.points} />
          <circle className="fill-white" {...needle.base} r={4} />
        </g>
      </svg>
    </div>
  );
}
