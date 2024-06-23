import jsPDF from 'jspdf';
import React, { useRef, useState } from 'react';
import Footer from './Footer';
import './ImageToPdf.css';
import Navbar from './Navbar';
const ImageToPdf = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const imageFileRef = useRef(null);
  const [showNewConvertButton, setShowNewConvertButton] = useState(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setSelectedImage(e.target.result);
  };

  const generatePdf = () => {
    if (!selectedImage) return;

    //const doc = new jsPDF();
    const doc = new jsPDF({
      format: 'a4',
      unit: 'mm',  // Optional, default is 'mm'
      orientation: 'portrait'  // Optional, default is 'portrait'
  });
    const img = new Image();
    img.src = selectedImage;
    const imageFile = imageFileRef.current.files[0];
    const Filename = imageFile.name.split('.').slice(0, -1).join('.');
    img.onload = () => {
        
      const someMargin = 0;
      const height = doc.internal.pageSize.getHeight() - someMargin;
      const width = doc.internal.pageSize.getWidth() - someMargin;
      
     
      doc.addImage(img, 'JPEG', 0, 0, width, height);
      doc.save(`${Filename}.pdf`);
      setShowNewConvertButton(true);
    };
    
  };

  const handleNewConvert = () => {
    setShowNewConvertButton(false);
    window.location.reload();
  };

  return (
    <div className="imagepdf">
       <Navbar/>
    <div className="body">
     <h2> The smarter way to convert images to PDFs.</h2>
    <div className="image-to-pdf">
      <input type="file" accept="image/*" onChange={handleImageChange} ref={imageFileRef}  />
      <button onClick={generatePdf} disabled={!selectedImage}>
        Generate PDF
      </button>
      
      {showNewConvertButton && (
        <button id="newConvertButton" onClick={handleNewConvert}>Convert New Image</button>
      )}
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ImageToPdf;

//const ratio = img.width / img.height; const width = height * ratio;  const newWidth = width-someMargin;