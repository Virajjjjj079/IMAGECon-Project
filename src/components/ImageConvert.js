import { useRef, useState } from 'react';
import Footer from './Footer';
import './ImageConvert.css';
import Navbar from './Navbar';

function ImageConvert() {
  const imageFileRef = useRef(null);
  const outputFormatRef = useRef(null);
  const [showNewConvertButton, setShowNewConvertButton] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);

  const handleConvert = () => {
    const imageFile = droppedFile || imageFileRef.current.files[0];
    const outputFormat = outputFormatRef.current.value;

    if (imageFile && outputFormat) {
      const reader = new FileReader();
      const originalFileName = imageFile.name.split('.').slice(0, -1).join('.');

      reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          const dataURL = canvas.toDataURL('image/' + outputFormat);
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = `${originalFileName}.${outputFormat}`;
          link.click();
        };
        image.src = event.target.result;
      };
      reader.readAsDataURL(imageFile);
      setShowNewConvertButton(true);
    }
  };

  const handleNewConvert = () => {
    setShowNewConvertButton(false);
    setDroppedFile(null);
    window.location.reload();
  };

  // 🖱️ Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setDroppedFile(file);
    } else {
      alert('Please drop a valid image file');
    }
  };

  return (
    <div className="imagpdf">
      <Navbar />
      <div className="body">
        <h2>Unleash image format freedom, powered by <span>IMAGECon.</span></h2>
        <div 
          className={`container ${dragActive ? 'drag-active' : ''}`} 
          onDragOver={handleDragOver} 
          onDragLeave={handleDragLeave} 
          onDrop={handleDrop}
        >
          {/* File input */}
          <input type="file" id="imageFile" accept="image/*" ref={imageFileRef} />

          {/* Drag & Drop Box */}
          <div className="drop-area">
            {droppedFile ? (
              <p>📸 {droppedFile.name} selected</p>
            ) : (
              <p>Drag & Drop your image here or click “Choose File”</p>
            )}
          </div>

          {/* Output format select */}
          <span>
            <select id="outputFormat" ref={outputFormatRef}>
              <option value="jpg">jpeg</option>
              <option value="png">png</option>
              <option value="gif">gif</option>
              <option value="bmp">bmp</option>
              <option value="svg">svg</option>
              <option value="tif">tif</option>
              <option value="raw">raw</option>
            </select>
          </span>

          {/* Convert Button */}
          <button id="convertButton" onClick={handleConvert}>Convert</button>

          <div className="newbtn">
            {showNewConvertButton && (
              <button id="newConvertButton" onClick={handleNewConvert}>
                Convert New Image
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="foter">
        <Footer />
      </div>
    </div>
  );
}

export default ImageConvert;
