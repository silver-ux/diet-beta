import React from "react";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
  }[];
  label?: string;
};
export const CustomTooltip = ({
  active,
  payload,
  label,
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow border text-sm">
        <p>{`日付: ${label}日`}</p>
        <p>{`体重: ${payload[0].value}kg`}</p>
      </div>
    );
  }

  return null;
};
