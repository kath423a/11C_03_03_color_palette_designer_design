"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
  const input = document.querySelector("input");

  //getInput starts, when there is an input in the input-tag
  input.addEventListener("input", getInput);

  getInput(input);
}

function getInput(input) {
  input = document.querySelector("input");

  //hex is now the same as the input's hexvalue
  let hex = input.value;

  //Changes the color of the div #color
  document.querySelector("#color").style.backgroundColor = `${hex}`;

  const displayHex = `HEX: (${hex})`;

  //Inserts hex-string in p-element
  document.querySelector("#hex").textContent = displayHex;

  //Calls next function and brings the parameter 'hex'
  hexToRGB(hex);
}

function hexToRGB(hex) {
  //Converts string into numbers and frem hex to RGB
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  //Shows the RGB values
  const rgb = `RGB: (${r}, ${g}, ${b})`;

  document.querySelector("#rgb").textContent = rgb;

  //calls next function and again brings the parameters
  rgbToHSL(r, g, b);
}

function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

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

  //shortens the decimals to 0
  let hsl = `HSL: (${h.toFixed(0)}, ${s.toFixed(0)}, ${l.toFixed(0)})`;

  document.querySelector("#hsl").textContent = hsl;
}
