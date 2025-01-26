import React, { useState } from "react";
import "../assets/CSS/pages.css";
import { AES, enc } from "crypto-js";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { Container, Row } from "react-bootstrap";

function Image() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [decryptedImage, setDecryptedImage] = useState(null);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to encrypt the image and trigger download
  const encryptImage = () => {
    if (!image || !encryptionKey) {
      toast.error("Please provide an image and an encryption key.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      const encrypted = AES.encrypt(imageData, encryptionKey).toString();
      setEncryptedImage(encrypted);
      setDecryptedImage(null); // Reset decrypted image

      // Create a Blob for the encrypted image to allow download
      const blob = new Blob([encrypted], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = url;
      link.download = "encrypted_image.enc";
      link.click();
    };
    reader.readAsDataURL(image);
  };

  // Function to decrypt the image after key verification
  const decryptImage = () => {
    if (!encryptedImage || !encryptionKey) {
      alert("Please provide an encrypted image and a decryption key.");
      return;
    }

    const bytes = AES.decrypt(encryptedImage, encryptionKey);
    const decryptedData = bytes.toString(enc.Utf8);
    if (decryptedData) {
      setDecryptedImage(decryptedData);
    } else {
      alert("Decryption failed. Please check the key.");
    }
  };

  // Function to handle encrypted image upload
  const handleEncryptedImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const encryptedData = reader.result;
        setEncryptedImage(encryptedData);
      };
      reader.readAsText(file); // Read encrypted image as text
    }
  };

  return (
    <>
      <Header />

      <section className="bg-black">
        <Container>
          <Row className="ImageHead">
            <h2>Image Encryption & Decryption</h2>
          </Row>
          <Row className="d-flex justify-content-around">
            {/* Image upload section */}
            <div className="encrypt-box">
              <h3>Encrypt Image</h3>
              <div className="upload-section">
                <input type="file" onChange={handleImageUpload} />
                <div className="image-preview">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" width="200" />
                  )}
                </div>
              </div>

              {/* Encryption key input */}
              <div className="key-section">
                <input
                  type="text"
                  placeholder="Enter Encryption Key"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                />
              </div>

              {/* Encrypt button */}
              <div className="buttons">
                <button onClick={encryptImage}>Encrypt Image</button>
              </div>
            </div>

            {/* Decrypt section */}
            <div className="decryption-section">
              <h3>Decrypt Image</h3>
              <input
                type="file"
                onChange={handleEncryptedImageUpload}
                accept=".enc"
              />

              {/* Decrypted image preview */}
              <div className="image-preview">
                {decryptedImage && (
                  <img src={decryptedImage} alt="Decrypted" width="200" />
                )}
              </div>

              {/* Encryption key input */}
              <div className="key-section">
                <input
                  type="text"
                  placeholder="Enter Decryption Key"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                />
              </div>

              <div className="buttons">
                <button onClick={decryptImage}>Decrypt Image</button>
              </div>
            </div>
          </Row>
        </Container>

        {/* Encrypted image preview and download */}
        <div className="d-flex justify-content-center py-3">
          <div className="encrypt-data">
            {encryptedImage && (
              <div className="encrypted-preview">
                <h3 className="text-center">Encrypted Data</h3>
                <textarea
                  readOnly
                  value={encryptedImage}
                  rows="5"
                  cols="50"
                  placeholder="Encrypted Image Data"
                ></textarea>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Image;
