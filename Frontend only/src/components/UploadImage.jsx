import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
    
        reader.onload = (e) => {
          const base64String = e.target.result;
          // Now you have the base64 string of the selected image
          setSelectedFile(base64String);
        };
    
        reader.readAsDataURL(selectedFile);
      }
    
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        setUploading(true);
        console.log(selectedFile)
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch("http://localhost:5000/api/upload", {
            method: 'POST', 
            headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "no-cors"
          },
          body: JSON.stringify({path: selectedFile})
          
        });

        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
        setSelectedFile(null);
      }
    }
  };

  return (
    <div>
      <h2>Image Upload Form</h2>
      <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !selectedFile}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default ImageUpload;
