import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js";
import Header from "../Components/Header";

const TextEncrypt = () => {
  const [text, setText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [manualEncryptedText, setManualEncryptedText] = useState("");

  const secretKey = import.meta.env.VITE_APP_CRYPTO_KEY; // Use a secure key

  const encryptText = () => {
    if (!text.trim()) {
      toast.error("Please enter some text to encrypt.");
      return;
    }
    const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
    setEncryptedText(encrypted);
    setManualEncryptedText("");
    setDecryptedText("");
  };

  const decryptText = () => {
    try {
      const textToDecrypt = manualEncryptedText || encryptedText;
      if (!textToDecrypt.trim()) {
        toast.error("Please enter an encrypted text to decrypt.");
        return;
      }
      const bytes = CryptoJS.AES.decrypt(textToDecrypt, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) throw new Error();
      setDecryptedText(decrypted);
      toast.success("Text decrypted successfully!");
    } catch (error) {
      toast.error("Invalid encrypted text or key!");
    }
  };

  const shareText = (platform) => {
    const shareUrl = encodeURIComponent(encryptedText);
    let url = "";

    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${shareUrl}`;
        break;
      case "instagram":
        toast.error(
          "Instagram sharing is limited to media; copy text and share manually."
        );
        return;
      case "mail":
        url = `mailto:?subject=Encrypted%20Text&body=${shareUrl}`;
        break;
      default:
        break;
    }

    if (url) window.open(url, "_blank");
  };

  return (
    <>
      <Header />
      
      <section className="bg-black">
        <Container className="min-vh-100 d-flex justify-content-center align-items-center">
          <Row className="w-100">
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="shadow p-4">
                <Card.Body>
                  <h1 className="text-center mb-4">
                    Text Encryption & Decryption
                  </h1>

                  <Form.Group className="mb-3">
                    <Form.Label>Enter text to encrypt</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-4">
                    <Button variant="primary" onClick={encryptText}>
                      Encrypt
                    </Button>
                  </div>

                  {encryptedText && (
                    <div className="mb-3">
                      <h5>Encrypted Text:</h5>
                      <InputGroup>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          readOnly
                          value={encryptedText}
                        />
                      </InputGroup>
                    </div>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Enter encrypted text to decrypt</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter encrypted text"
                      value={manualEncryptedText}
                      onChange={(e) => setManualEncryptedText(e.target.value)}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-4">
                    <Button
                      variant="success"
                      onClick={decryptText}
                      disabled={!encryptedText && !manualEncryptedText}
                    >
                      Decrypt
                    </Button>
                  </div>

                  {decryptedText && (
                    <div className="mb-3">
                      <h5>Decrypted Text:</h5>
                      <InputGroup>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          readOnly
                          value={decryptedText}
                        />
                      </InputGroup>
                    </div>
                  )}

                  {encryptedText && (
                    <div>
                      <h5>Share Encrypted Text:</h5>
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          onClick={() => shareText("whatsapp")}
                        >
                          WhatsApp
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => shareText("instagram")}
                        >
                          Instagram
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => shareText("mail")}
                        >
                          Email
                        </Button>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TextEncrypt;
