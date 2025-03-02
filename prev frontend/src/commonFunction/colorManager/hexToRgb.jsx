export default function hexToRgb(hex) {
    // Remove the hash (#) symbol if present
    hex = hex.replace(/^#/, '');
    
    // Parse hex values to get the RGB components
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    return `rgb(${r},${g},${b})`;
}
