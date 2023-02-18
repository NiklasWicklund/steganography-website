import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Extract from "./pages/Extract";
import Layout from "./pages/Layout";
import Embed from "./pages/Embed";
import NoPage from "./pages/NoPage";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="extract" element={<Extract />} />
          <Route path="embed" element={<Embed />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
  </BrowserRouter>
);
