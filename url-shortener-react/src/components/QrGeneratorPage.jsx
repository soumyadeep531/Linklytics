import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

const QrGeneratorPage = () => {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(220); // M
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef();

  const handleUrlChange = (e) => {
    let value = e.target.value;
    setUrl(value);
  };

  const getFormattedUrl = () => {
    if (!url) return "";
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const downloadQR = () => {
    if (!url) return;
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const copyUrl = () => {
    if (!url) return;
    navigator.clipboard.writeText(getFormattedUrl());
    toast.success("URL Copied!");
  };

  const resetForm = () => {
    setUrl("");
    setSize(220);
    setFgColor("#000000");
    setBgColor("#ffffff");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">Free QR Code Generator</h1>
        <p className="text-center text-slate-600 mb-8">Create instantly downloadable QR codes for any link.</p>

        <div className="flex flex-col md:flex-row gap-8 bg-white p-6 md:p-10 rounded-xl shadow-lg">
          {/* Controls */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">URL to encode</label>
              <input
                type="text"
                placeholder="example.com or https://example.com"
                value={url}
                onChange={handleUrlChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Size</label>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={160}>Small (160px)</option>
                  <option value={220}>Medium (220px)</option>
                  <option value={300}>Large (300px)</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Foreground</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Background</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Reset
              </button>
              <button
                onClick={copyUrl}
                disabled={!url}
                className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                Copy URL
              </button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <span className="font-semibold">Pro tip:</span> Want to track how many times this QR code is scanned? <Link to="/dashboard" className="underline font-bold text-blue-900">Shorten your link first!</Link>
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 bg-gray-50">
            <div ref={qrRef} className="flex justify-center items-center bg-white p-4 rounded-lg shadow-sm" style={{ minHeight: '332px', minWidth: '332px' }}>
              {url ? (
                <QRCodeCanvas
                  value={getFormattedUrl()}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={"H"}
                  includeMargin={true}
                />
              ) : (
                <div className="w-[220px] h-[220px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                  <span className="text-gray-400 font-medium">Enter URL to preview</span>
                </div>
              )}
            </div>
            
            <button
              onClick={downloadQR}
              disabled={!url}
              className="mt-8 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 w-full md:w-auto"
            >
              Download PNG
            </button>
          </div>
        </div>

        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="font-bold text-lg mb-2">Paste Your Link</h3>
              <p className="text-gray-600">Enter any website URL or text you want to encode into the generator.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="font-bold text-lg mb-2">Customize</h3>
              <p className="text-gray-600">Adjust the size and pick colors that match your brand or presentation.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="font-bold text-lg mb-2">Download & Share</h3>
              <p className="text-gray-600">Get a high-quality PNG image ready to be printed or shared digitally.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrGeneratorPage;
