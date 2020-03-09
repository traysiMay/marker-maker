import React, { useState } from "react";
import QRCode from "qrcode";
import templateSrc from "./template.png";
import raptorSrc from "./raptor.png";

const width = 592;
const height = 1007;

function App() {
  const [value, setValue] = useState("meepo");

  const handleChange = e => setValue(e.target.value);

  const makeQR = async value => {
    var opts = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      color: { light: "#FFFFFF" },
      width: 400,
      rendererOpts: {
        quality: 1
      }
    };
    const qr = await QRCode.toDataURL(value, opts);
    return qr;
  };

  const drawMarker = async () => {
    const qr = await makeQR(value);
    const canvas = document.getElementById("canvas");
    const template = new Image();
    const qrImg = new Image();
    const raptor = new Image();
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    template.src = templateSrc;
    template.onload = () => {
      ctx.drawImage(template, 0, 0, 592, 1007);
      qrImg.src = qr;
      qrImg.onload = () => {
        ctx.drawImage(qrImg, 190, 402, 205, 205);
        raptor.src = raptorSrc;
        raptor.onload = () => {
          ctx.drawImage(raptor, canvas.width / 2 - 25, canvas.height / 2 - 20);
        };
      };
    };
  };

  return (
    <div className="App">
      <input onChange={handleChange} />
      <button onClick={drawMarker}>peepee</button>
      <canvas id="canvas" height={height} width={width} />
    </div>
  );
}

export default App;
