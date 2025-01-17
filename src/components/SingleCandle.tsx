import React from "react";

type SingleCandleProps = {
  isLit: boolean;
  onLight: () => void;
  candleColour: string;
};

const SingleCandle: React.FC<SingleCandleProps> = ({
  isLit,
  onLight,
  candleColour,
}) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onLight}
    >
      {isLit && (
        <div className="w-4 h-4 bg-orange-400 rounded-full transform scale-y-150 scale-x-50"></div>
      )}
      <div className="w-1 h-2 bg-white" data-testid="candle-wick"></div>
      <div
        className={`w-3 h-16 ${
          candleColour ? `bg-${candleColour}-500` : "bg-red-500"
        }`}
      ></div>
    </div>
  );
};

export default SingleCandle;
