function hexToRgb(hex: string) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values from the hex string
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

function luminance(r: number, g: number, b: number) {
  // Normalize the RGB values to 0 - 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Apply the sRGB luminance formula
  r = (r <= 0.03928) ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = (g <= 0.03928) ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = (b <= 0.03928) ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Return the luminance value
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function isCloserToWhite(hexColor: string) {
  // Convert the color to RGB
  const [r, g, b] = hexToRgb(hexColor);

  // Calculate the luminance of the given color
  const colorLuminance = luminance(r, g, b);

  // Middle grey luminance is 0.5
  const middleGreyLuminance = luminance(128, 128, 128);

  // Return true if the color is closer to white (luminance closer to 1)
  return colorLuminance > middleGreyLuminance;
}