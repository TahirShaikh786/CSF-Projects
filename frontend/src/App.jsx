import React from "react";
import Image from "./Pages/Image";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import TextEncrypt from "./Pages/TextEncrypt";
import PasswordGenerator from "./Pages/PasswordGenerator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image" element={<Image />} />
          <Route path="/text" element={<TextEncrypt />} />
          <Route path="/password" element={<PasswordGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
