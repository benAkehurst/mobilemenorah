import React from "react";
import Draggable from "react-draggable";

type DragAndDropCandleProps = {
  onDropAction: (index: number) => void; // Function to light a candle
  isLit: boolean; // Whether the shamash is lit
  onLight: () => void; // Light the shamash
};

const DraggableCandle: React.FC<DragAndDropCandleProps> = ({
  isLit,
  onLight,
  onDropAction,
}) => {
  const handleStop = (e: MouseEvent | TouchEvent, data: any) => {
    // Check collision with candles
    const candleElement = data.node.getBoundingClientRect();
    const holders = document.querySelectorAll("[data-testid='candle-wick']");

    holders.forEach((holder, index) => {
      const holderRect = holder.getBoundingClientRect();
      if (
        candleElement.left < holderRect.right &&
        candleElement.right > holderRect.left &&
        candleElement.top < holderRect.bottom &&
        candleElement.bottom > holderRect.top
      ) {
        onDropAction(index); // Light the candle
      }
    });
  };

  return (
    <Draggable
      bounds="parent" // Restrict movement to parent container
      onStop={handleStop} // Trigger interaction logic on drag stop
    >
      <div className="absolute cursor-grab z-50">
        <div className="flex flex-col items-center" onClick={onLight}>
          {isLit && (
            <div className="w-4 h-4 bg-orange-400 rounded-full transform scale-y-150 scale-x-50"></div>
          )}
          <div className="w-1 h-2 bg-white"></div>
          <div className="w-3 h-16 bg-yellow-500"></div>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableCandle;
