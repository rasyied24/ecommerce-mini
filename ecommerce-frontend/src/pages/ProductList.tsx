import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/ProductsSlice';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data));
  }, []);

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id];
    if (!quantity || quantity <= 0) return;
    dispatch(addToCart({ ...product, quantity }));
    setQuantities(prev => ({ ...prev, [product.id]: 0 })); // reset after add
  };

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities(prev => ({ ...prev, [productId]: value }));
  };

  const calculateTotal = () => {
    return products.reduce((total, p) => {
      const qty = quantities[p.id] || 0;
      return total + (p.price * qty);
    }, 0);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">🛒 Daftar Produk</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map(p => (
          <div key={p.id} className="border rounded-lg shadow-lg p-4 bg-white">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600 mb-2">Rp {p.price.toLocaleString()}</p>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm text-gray-700">Jumlah:</label>
              <input
                type="number"
                min={0}
                value={quantities[p.id] || ''}
                onChange={(e) => handleQuantityChange(p.id, parseInt(e.target.value) || 0)}
                className="w-16 border px-2 py-1 rounded text-sm"
              />
            </div>
            <button
              onClick={() => handleAddToCart(p)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right font-semibold text-lg">
        Total sementara: Rp {calculateTotal().toLocaleString()}
      </div>
    </div>
  );
};

export default ProductList;
