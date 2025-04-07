import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/Index';
import { useState } from 'react';
import axios from 'axios';
import { clearCart } from '../store/ProductsSlice';

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.products.cart);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/checkout', {
        products: cart
      });
      setMessage(response.data.message);
      dispatch(clearCart());
    } catch (error) {
      setMessage('Checkout gagal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">💳 Checkout</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Produk</th>
              <th className="px-4 py-2 text-right">Harga</th>
              <th className="px-4 py-2 text-center">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2 text-right">Rp {item.price.toLocaleString()}</td>
                <td className="px-4 py-2 text-center">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-4 text-lg font-semibold">
        Total: Rp {total.toLocaleString()}
      </div>

      <div className="mt-6">
        <button
          onClick={handleCheckout}
          disabled={loading || cart.length === 0}
          className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
      </div>

      {message && <p className="mt-4 text-center font-medium text-blue-700">{message}</p>}
    </div>
  );
};

export default Checkout;
