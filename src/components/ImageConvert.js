import { useRef, useState } from 'react';
import Footer from './Footer';
import './ImageConvert.css';
import Navbar from './Navbar';
function ImageConvert() {
  // Create references for the file input and output format select elements
  const imageFileRef = useRef(null);
  const outputFormatRef = useRef(null);
  const [showNewConvertButton, setShowNewConvertButton] = useState(false);
  // Function to handle the image conversion when the convert button is clicked
  const handleConvert = () => {
    // Get the selected file from the file input
    const imageFile = imageFileRef.current.files[0];
    // Get the selected output format from the select element
    const outputFormat = outputFormatRef.current.value;

    // Check if a file and an output format are selected
    if (imageFile && outputFormat) {
      const reader = new FileReader(); // Create a FileReader to read the file
      const originalFileName = imageFile.name.split('.').slice(0, -1).join('.');
      console.log('Original File Name (without extension):', originalFileName);
      
      // Define what happens when the file is read
      reader.onload = (event) => {
        const image = new Image(); // Create a new Image object
        // Define what happens when the image is loaded
        image.onload = () => {
          const canvas = document.createElement('canvas'); // Create a canvas element
          const ctx = canvas.getContext('2d'); // Get the 2D rendering context
          canvas.width = image.width; // Set canvas width to image width
          canvas.height = image.height; // Set canvas height to image height
          ctx.drawImage(image, 0, 0); // Draw the image onto the canvas

          // Convert the canvas content to the selected image format
          const dataURL = canvas.toDataURL('image/' + outputFormat);
          
          //const dataURL = canvas.toDataURL('image/' + originalFileName);
          // Create a link element to download the converted image
          const link = document.createElement('a');
          link.href = dataURL; // Set the link's href to the image data URL
          link.download = `${originalFileName}.${outputFormat}`; // Set the download attribute
          link.click(); // Programmatically click the link to trigger the download
        };
        image.src = event.target.result; // Set the image source to the file data URL
      };
      reader.readAsDataURL(imageFile); // Read the file as a data URL
      setShowNewConvertButton(true);
    }

    
  };

  const handleNewConvert = () => {
    setShowNewConvertButton(false);
    window.location.reload();
  };


  return (
    <div className="imagpdf">
      <Navbar/>
    <div className="body">
    <h2>Unleash image format freedom, powered by <span> IMAGECon.</span> </h2>
    <div className="container">
      
      {/* File input to select an image */}
      <input type="file" id="imageFile" accept="image/*" ref={imageFileRef} />
      {/* Select element to choose the output format */}
      <span>
      <select id="outputFormat" ref={outputFormatRef}>
        <option value="jpg">jpeg</option>
        <option value="svg">jpg</option>
        <option value="png">png</option>
        <option value="gif">gif</option>
        <option value="bmp">bmp</option>
        <option value="svg">svg</option>
        <option value="svg">tif</option>
        <option value="svg">raw</option>

      </select>
      </span>
      {/* Button to trigger the image conversion */}
      <button id="convertButton" onClick={handleConvert}>Convert</button>
      <div className="newbtn">
      {showNewConvertButton && (
        <button id="newConvertButton" onClick={handleNewConvert}>Convert New Image</button>
      )}
      </div>
    </div>
    </div>
    <div className="foter">
    <Footer/>
    </div>
    </div>
  );
}

export default ImageConvert;
