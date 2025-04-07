import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="py-6 bg-white shadow mb-8">
          <div className="container mx-auto flex justify-center">
            <div className="flex gap-6">
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-2 rounded-full shadow">
                Lihat Produk
              </Link>
              <Link to="/checkout" className="bg-green-600 hover:bg-green-700 text-white text-lg font-medium px-6 py-2 rounded-full shadow">
                Checkout
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
