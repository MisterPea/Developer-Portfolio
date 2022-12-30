import * as React from 'react';
import { useEffect, useRef } from 'react';
import aboutImageBASE64 from './AboutImage';

export default function AboutImageCanvas({ darkMode }) {
  const k = 9; // kernel size;
  const firstRun = useRef(null);

  const uniqueId = () => {
    return `on-canvas-${darkMode ? 'dark' : 'light'}`;
  };

  function drawImage() {
    const img = new Image();
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(img);
      };
      img.src = aboutImageBASE64();
    });
  }

  function renderDarkLine(ctx, x, y, val) {
    const density = ((k / 2) * (1 - val) - 5) * -1;
    ctx.beginPath();
    ctx.moveTo((x - k / 1.9), (y - k / 1.9));
    ctx.lineTo(x + k / 2, y + k / 2);
    ctx.lineWidth = density;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.closePath();
  }
  function renderLightLine(ctx, x, y, val) {
    ctx.beginPath();
    ctx.moveTo((x - k / 1.9), (y - k / 1.9));
    ctx.lineTo(x + k / 2, y + k / 2);
    ctx.lineWidth = (k / 2) * (1 - val);
    ctx.strokeStyle = '#0074b2';
    ctx.stroke();
    ctx.closePath();
  }

  function renderDarkDot(ctx, x, y, val) {
    const density = ((k / 1.9) * (1 - (val * .9)) - 5) * -1;
    ctx.beginPath();
    ctx.ellipse(x, y, density, density, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }

  function renderLightDot(ctx, x, y, val) {
    ctx.beginPath();
    ctx.ellipse(x, y, (k / 1.9) * (1 - val), (k / 1.9) * (1 - val), 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  function renderAnimation(ctx, sampledData) {
    const lightOptions = [
      renderLightDot,
      renderLightLine,
    ];
    const darkOptions = [
      renderDarkDot,
      renderDarkLine,
    ];

    function nextDrawing(currentOption) {
      const canvas = document.getElementById(uniqueId());
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < sampledData.length; i += 1) {
        const { x, y, totalAvg } = sampledData[i];
        currentOption(ctx, x, y, totalAvg);
      }
    }
    // const index = Math.ceil(Math.random() * 2) - 1;
    // index 0 is dots, index 1 is lines
    const index = 1;
    if (darkMode) {
      nextDrawing(darkOptions[index]);
    } else {
      nextDrawing(lightOptions[index]);
    }
  }

  function parseImageData(imageData, ctx) {
    const sampledData = [];
    const { data, width, height } = imageData;
    for (let y = 0; y <= height - k; y += k) {
      for (let x = 0; x <= width - k; x += k) {
        sampledData.push(parseSample(x, y, width, data, ctx));
      }
    }
    return { ctx, sampledData };
  }

  function parseSample(x, y, width, data) {
    const temp = [];
    for (let i = y; i < y + k; i += 1) {
      for (let j = x; j < x + k; j += 1) {
        const loc = ((i * width) + j) * 4;
        const R = data[loc];
        const G = data[loc + 1];
        const B = data[loc + 2];
        const avg = 0.1 * (R / 255) + 0.7 * (G / 255) + 0.1 * (B / 255);
        temp.push(avg);
      }
    }
    const totalAvg = (temp.reduce((acc, curr) => acc + curr, 0)) / temp.length;
    return { x, y, totalAvg };
  }

  function addImage(img) {
    const mainDiv = document.querySelector('.main-div');
    const onCanvas = document.createElement('CANVAS');
    onCanvas.id = uniqueId();
    // this is to prevent non-square pixels at the ends/
    onCanvas.width = img.width - (onCanvas.width % k);
    onCanvas.height = img.height - (onCanvas.height % k);
    const onCtx = onCanvas.getContext('2d');
    onCtx.clearRect(0, 0, img.width, img.height);
    onCtx.beginPath();
    onCtx.ellipse((img.width / 2) - 10, (img.height / 2) - 10, (img.width / 2) - 10, (img.width / 2) - 10, 0, 0, 2 * Math.PI);
    onCtx.clip();
    mainDiv.appendChild(onCanvas);
    // onCtx.drawImage(img, 0, 0, onCanvas.width, onCanvas.height);

    const offCanvas = document.createElement('CANVAS');
    offCanvas.width = img.width - (offCanvas.width % k);
    offCanvas.height = img.height - (offCanvas.height % k);
    const offCtx = offCanvas.getContext('2d');
    offCtx.drawImage(img, 0, 0, onCanvas.width, onCanvas.height);
    const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
    return { imageData, onCtx };
  }

  useEffect(() => {
    if (firstRun.current === null) {
      firstRun.current = true;
      drawImage()
        .then((img) => addImage(img))
        .then(({ imageData, onCtx }) => parseImageData(imageData, onCtx))
        .then(({ ctx, sampledData }) => renderAnimation(ctx, sampledData));
    }
  });


  return (
    <div className="main-div" />
  );
}
