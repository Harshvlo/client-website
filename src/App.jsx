import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Home     from "./pages/Home";
import About    from "./pages/About";
import Services from "./pages/Services";
import Partners from "./pages/Partners";
import Track    from "./pages/Track";
import Contact  from "./pages/Contact";
import Pricing  from "./pages/Pricing";
import InfoPage from "./pages/InfoPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing"  element={<Pricing />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/track"    element={<Track />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/terms"    element={<InfoPage type="terms" />} />
          <Route path="/privacy"  element={<InfoPage type="privacy" />} />
          <Route path="/resources" element={<InfoPage type="resources" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
