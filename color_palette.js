"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  // set up the eventlistener
  document.querySelector("#colorpicker").addEventListener("input", getColorInput);
}

function getColorInput(event) {
  const color = event.target.value;
  selectColor(color);
}

function selectColor(color) {
  const rgb = hexToRgb(color);
  const hslBase = rgbToHsl(rgb);

  const baseColor = rgbToHsl(hexToRgb());

  calculateHarmony(baseColor);
}

// called from the eventlistener
function displayColorInfo(color, index) {
  // get the color selected

  //const color = document.querySelector("#colorpicker").value;

  // convert from hex to rgb, hsl, css and so on
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb);

  // display those different colors ...
  showHexColor(color, index);
  showRbgColor(rgb, index);
  showHslColor(hsl, index);
  showColorBox(rgb, index);
}

function rgbToHex(rgbObject) {
  const hexR = rgbObject.r.toString(16).padStart(2, "0");
  const hexG = rgbObject.g.toString(16).padStart(2, "0");
  const hexB = rgbObject.b.toString(16).padStart(2, "0");

  const hex = "#" + hexR + hexG + hexB;

  return hex;
}

function hexToRgb(hex) {
  const r = Number.parseInt(hex.substring(1, 3), 16);
  const g = Number.parseInt(hex.substring(3, 5), 16);
  const b = Number.parseInt(hex.substring(5, 7), 16);

  return { r, g, b };
}

function rgbToHsl(rgbObject) {
  const r = rgbObject.r / 255;
  const g = rgbObject.g / 255;
  const b = rgbObject.b / 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  return { h, s, l };
}

function rgbToCss(rgbObject) {}

function hslToRgb(hsl) {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

// display functions
function showHexColor(hex, index) {
  document.querySelector(`#colorinfo${index} .hex .value`).textContent = hex;
}

function showRbgColor(rgb, index) {
  document.querySelector(`#colorinfo${index} .rgb .value`).textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHslColor(hsl, index) {
  document.querySelector(`#colorinfo${index} .hsl .value`).textContent = `${hsl.h}, ${hsl.s}, ${hsl.l}`;
}

function showColorBox(rgb, index) {
  document.querySelector(`#colorinfo${index} .colorbox`).style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}
