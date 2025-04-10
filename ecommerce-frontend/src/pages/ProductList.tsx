// File: src/pages/ProductList.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart, updateQuantity } from '../store/ProductsSlice';
import { RootState } from '../store/Index';
import toast from 'react-hot-toast';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {loading ? (
        <div className="col-span-full text-center text-gray-500 text-lg">Loading...</div>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-2">
              <h2 className="text-sm font-medium text-gray-800 truncate">{product.name}</h2>
              <p className="text-black-600 font-semibold text-sm mt-1">
                Rp {Number(product.price).toLocaleString('id-ID')}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="number"
                  min="1"
                  className="w-14 text-center border rounded px-2 py-1 text-sm"
                  value={product.quantity || 1}
                  onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                >
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
