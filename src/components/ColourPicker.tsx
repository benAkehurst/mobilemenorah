type ColourPickerProps = {
  handleCandleColour: (colour: string) => void;
};

const ColourPicker = ({ handleCandleColour }: ColourPickerProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Choose a candle colour</h2>
      <div className="flex space-x-4">
        <button
          className="w-8 h-8 rounded-full bg-red-500"
          onClick={() => handleCandleColour("red")}
        ></button>
        <button
          className="w-8 h-8 rounded-full bg-green-500"
          onClick={() => handleCandleColour("green")}
        ></button>
        <button
          className="w-8 h-8 rounded-full bg-blue-500"
          onClick={() => handleCandleColour("blue")}
        ></button>
        <button
          className="w-8 h-8 rounded-full bg-yellow-500"
          onClick={() => handleCandleColour("yellow")}
        ></button>
        <button
          className="w-8 h-8 rounded-full bg-purple-500"
          onClick={() => handleCandleColour("purple")}
        ></button>
        <button
          className="w-8 h-8 rounded-full bg-orange-500"
          onClick={() => handleCandleColour("orange")}
        ></button>
      </div>
    </div>
  );
};

export default ColourPicker;
