import React, { useState } from "react";
import Header from "../Components/Header.jsx";
import { Card, Button, Form } from "react-bootstrap";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    let characters = "";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

    if (characters.length === 0) {
      alert("Please select at least one option.");
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    setGeneratedPassword(password);
  };

  const copyToClipboard = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      alert("Password copied to clipboard!");
    } else {
      alert("No password to copy!");
    }
  };

  return (
    <>
      <Header />
      
      <section className="d-flex justify-content-center align-items-center min-vh-100 bg-black">
        <Card className="p-4 bg-body shadow-lg" style={{ width: "400px" }}>
          <h1 className="text-center mb-4">Password Generator</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Password Length</Form.Label>
              <Form.Control
                type="number"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Include Uppercase Letters"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Include Lowercase Letters"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Include Numbers"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Include Symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              className="w-100 mb-4"
              onClick={generatePassword}
            >
              Generate Password
            </Button>
          </Form>

          {generatedPassword && (
            <div className="mt-4 p-3 bg-secondary text-white rounded text-center">
              <p className="m-0">{generatedPassword}</p>
              <Button
                variant="light"
                className="mt-2"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          )}
        </Card>
      </section>
    </>
  );
};

export default PasswordGenerator;
