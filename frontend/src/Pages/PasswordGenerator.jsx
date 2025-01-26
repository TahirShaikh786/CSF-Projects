import React, { useState } from "react";
import { Card, CardBody, Button, InputGroup } from "react-bootstrap";

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
    if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:",.<>?/';

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
        <CardBody>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password Length</label>
            <InputGroup.Text
              type="number"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <InputGroup.Checkbox
                checked={includeUppercase}
                onCheckedChange={setIncludeUppercase}
              />
              <span>Include Uppercase Letters</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <InputGroup.Checkbox
                checked={includeLowercase}
                onCheckedChange={setIncludeLowercase}
              />
              <span>Include Lowercase Letters</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <InputGroup.Checkbox
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
              />
              <span>Include Numbers</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <InputGroup.Checkbox
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
              <span>Include Symbols</span>
            </label>
          </div>

          <Button onClick={generatePassword} className="w-full mb-4">
            Generate Password
          </Button>

          {generatedPassword && (
            <div className="p-3 bg-gray-200 rounded-md text-center">
              <p className="font-mono text-lg break-all">{generatedPassword}</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
