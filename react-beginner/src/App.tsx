import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Footer from "./component/Footer";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Product from "./page/Products";
import ProductDetail from "./page/ProductDetail";
import Customer from "./page/Customer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-4 bg-gray-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product" element={<Product />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/customer" element={<Customer />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
