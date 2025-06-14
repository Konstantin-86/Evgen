import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from "./Pages/Main/Main.jsx";
import Statictics from "./Pages/Statictics/Statictics.jsx";
import Footer from "./Pages/Footer/Footer.jsx";
import Semples from "./Pages/Semples/Semples.jsx";
import Settings from "./Pages/Settings/Settings.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router basename="/Evgen">
        <Footer />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/stat" element={<Statictics />} />
          <Route path="/semples" element={<Semples />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </StrictMode>
);
