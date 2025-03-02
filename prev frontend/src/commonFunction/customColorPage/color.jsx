import React, { useState } from "react";

const Color = () => {
  const [mainColor, setMainColor] = useState("rgb(0, 0, 255)");
  const [textColor, setTextColor] = useState("rgb(0, 0, 0)");
  const [bgColor, setBgColor] = useState("rgb(255, 255, 255)");

  // States for custom color inputs
  const [showMainColorPicker, setShowMainColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const [customMainColor, setCustomMainColor] = useState(mainColor);
  const [customTextColor, setCustomTextColor] = useState(textColor);
  const [customBgColor, setCustomBgColor] = useState(bgColor);

  // Default colors
  const defaultColors = {
    mainColor: "rgb(255, 87, 51)",
    textColor: "rgb(0, 0, 0)",
    bgColor: "rgb(255, 255, 255)",
  };

  // Color change handlers
  const handleMainColorChange = (color) => {
    setMainColor(color);
    setCustomMainColor(color); // Set the custom color as well
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
    setCustomTextColor(color); // Set the custom color as well
  };

  const handleBgColorChange = (color) => {
    setBgColor(color);
    setCustomBgColor(color); // Set the custom color as well
  };

  // Reset to default colors
  const resetToDefault = () => {
    setMainColor(defaultColors.mainColor);
    setTextColor(defaultColors.textColor);
    setBgColor(defaultColors.bgColor);
    setCustomMainColor(defaultColors.mainColor);
    setCustomTextColor(defaultColors.textColor);
    setCustomBgColor(defaultColors.bgColor);
  };

  const mainColorOptions = [
    "rgb(255,87,51)",
    "rgb(51,255,87)",
    "rgb(51,87,255)",
    "rgb(241,196,15)",
    "rgb(142,68,173)",
    "rgb(26,188,156)",
    "rgb(231,76,60)",
    "rgb(243,156,18)",
    "rgb(127,140,141)",
  ];

  const textColorOptions = [
    "rgb(0, 0, 0)",
    "rgb(255, 255, 255)",
    "rgb(127, 140, 141)",
    "rgb(149, 165, 166)",
    "rgb(189, 195, 199)",
    "rgb(44, 62, 80)",
    "rgb(52, 73, 94)",
    "rgb(22, 160, 133)",
    "rgb(41, 128, 185)",
  ];

  const bgColorOptions = [
    "rgb(255, 255, 255)",
    "rgb(240, 240, 240)",
    "rgb(232, 245, 233)",
    "rgb(255, 243, 224)",
    "rgb(253, 238, 244)",
    "rgb(213, 245, 227)",
    "rgb(214, 234, 248)",
    "rgb(250, 219, 216)",
    "rgb(248, 196, 113)",
  ];

  return (
    <div className="m-20 max-h-screen bg-white w-[1000px] flex flex-col p-5">
      {/* Default button */}
      <div className="flex flex-row items-center justify-between w-full my-5 mx-10">
        <p className="text-xl font-semibold">Customize your colors</p>
        <button
          onClick={resetToDefault}
          className="text-white bg-blue-500 py-1 px-4 border-2 rounded-md hover:bg-blue-600"
        >
          Default
        </button>
      </div>
      <hr className="my-5 h-1 bg-gray-400 border rounded-xl" />

      {/* Main Color */}
      <div>
        <p className="text-lg font-medium">Main Color</p>
        <div className="flex flex-row justify-between">
          <div className="flex space-x-3">
            {mainColorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleMainColorChange(color)}
                className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ${
                  mainColor === color ? "border-4 border-black" : ""
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowMainColorPicker(!showMainColorPicker)}
              className="text-white bg-blue-500 py-1 px-4 border-2 rounded-md hover:bg-blue-600"
            >
              Set Custom
            </button>
            {showMainColorPicker && (
              <input
                type="color"
                value={customMainColor}
                onChange={(e) => {
                  const selectedColor = e.target.value;
                  setCustomMainColor(selectedColor);
                  setMainColor(selectedColor); // Update main color
                }}
                className="w-12 h-12 cursor-pointer"
              />
            )}
          </div>
        </div>
        <hr className="my-5 bg-gray-400 border rounded-xl" />
      </div>

      {/* Text Color */}
      <div className="mt-5">
        <p className="text-lg font-medium">Text Color</p>
        <div className="flex flex-row justify-between">
          <div className="flex space-x-3">
            {textColorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleTextColorChange(color)}
                className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ${
                  textColor === color ? "border-4 border-black" : ""
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTextColorPicker(!showTextColorPicker)}
              className="text-white bg-blue-500 py-1 px-4 border-2 rounded-md hover:bg-blue-600"
            >
              Set Custom
            </button>
            {showTextColorPicker && (
              <input
                type="color"
                value={customTextColor}
                onChange={(e) => {
                  const selectedColor = e.target.value;
                  setCustomTextColor(selectedColor);
                  setTextColor(selectedColor); // Update text color
                }}
                className="w-12 h-12 cursor-pointer"
              />
            )}
          </div>
        </div>
        <hr className="my-5 bg-gray-400 border rounded-xl" />
      </div>

      {/* Background Color */}
      <div className="mt-7">
        <p className="text-lg font-medium ">Background Color</p>
        <div className="flex flex-row justify-between">
          <div className="flex space-x-3">
            {bgColorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => handleBgColorChange(color)}
                className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-300 ${
                  bgColor === color ? "border-4 border-black" : ""
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowBgColorPicker(!showBgColorPicker)}
              className="text-white bg-blue-500 py-1 px-4 border-2 rounded-md hover:bg-blue-600"
            >
              Set Custom
            </button>
            {showBgColorPicker && (
              <input
                type="color"
                value={customBgColor}
                onChange={(e) => {
                  const selectedColor = e.target.value;
                  setCustomBgColor(selectedColor);
                  setBgColor(selectedColor); // Update background color
                }}
                className="w-12 h-12 cursor-pointer"
              />
            )}
          </div>
        </div>
        <hr className="my-5 h-1 bg-gray-400 border rounded-xl" />
      </div>

      {/* Display the selected colors */}
      <div
        className="mt-10 p-5 rounded-lg shadow-lg"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          transition: "all 0.3s ease",
        }}
      >
        <p className="text-lg" style={{ color: mainColor }}>
          Main Color: {mainColor}
        </p>
        <p>Text Color: {textColor}</p>
        <p>Background Color: {bgColor}</p>
      </div>
    </div>
  );
};

export default Color;
