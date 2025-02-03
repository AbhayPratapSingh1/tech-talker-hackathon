const cropString = (str, maxLength) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export function capitalize(str) {
  if (!str) return str; // Return the string as-is if it's empty or null
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
