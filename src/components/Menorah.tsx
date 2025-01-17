import React, { useState } from "react";
import SingleCandle from "./SingleCandle";
import DraggableCandle from "./DraggableCandle";

type MenorahProps = {
  hanukkahDay: number; // Day of Hanukkah (1-8)
  candleColour: string;
};

const Menorah: React.FC<MenorahProps> = ({ hanukkahDay, candleColour }) => {
  const [litCandles, setLitCandles] = useState<number[]>([]);
  const [shamashLit, setShamashLit] = useState<boolean>(false);

  const lightCandle = (index: number) => {
    if (!litCandles.includes(index)) {
      setLitCandles((prev) => [...prev, index]);
    }
  };

  return (
    <div
      className="flex flex-col items-center p-5 w-[800px] h-[300px] relative"
      data-testid="menorah"
    >
      <div className="flex items-end relative h-full">
        {/* Left candles */}
        {[...Array(4)].map((_, idx) => (
          <div
            key={`candleLeft-${idx}`}
            className="flex justify-center items-end w-6 h-24 bg-gray-400 mx-2 relative"
            data-testid="candle-holder"
          >
            {idx + 1 <= hanukkahDay && (
              <div className="absolute bottom-full">
                <SingleCandle
                  isLit={litCandles.includes(idx)}
                  onLight={() => lightCandle(idx)}
                  candleColour={candleColour}
                />
              </div>
            )}
          </div>
        ))}

        {/* Shamash */}
        <div
          className="flex justify-center items-end w-7 h-32 bg-gray-400 mx-2 relative"
          data-testid="shamash-holder"
        ></div>
        <DraggableCandle
          onDropAction={lightCandle}
          isLit={shamashLit}
          onLight={() => setShamashLit(true)}
        />

        {/* Right candles */}
        {[...Array(4)].map((_, idx) => (
          <div
            key={`candleRight-${idx}`}
            className="flex justify-center items-end w-6 h-24 bg-gray-400 mx-2 relative"
            data-testid="candle-holder"
          >
            {idx + 5 <= hanukkahDay && (
              <div className="absolute bottom-full">
                <SingleCandle
                  isLit={litCandles.includes(idx + 4)}
                  onLight={() => lightCandle(idx + 4)}
                  candleColour={candleColour}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Wooden base */}
      <div className="w-[400px] h-8 bg-[#8B4513] rounded-md shadow-md"></div>
    </div>
  );
};

export default Menorah;
