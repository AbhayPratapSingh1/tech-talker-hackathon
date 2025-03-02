export default function adjustBrightness(rgbColor, opacityPercentage) {
    const opacity = Math.min(100, Math.max(0, opacityPercentage)) / 100;
    const [r, g, b] = rgbColor.match(/\d+/g).map(Number);
  
  
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;

  }