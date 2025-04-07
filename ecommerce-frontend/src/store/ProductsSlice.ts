import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductState {
  cart: Product[];
}

const initialState: ProductState = {
  cart: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.cart.find(p => p.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const { addToCart, clearCart } = productsSlice.actions;
export default productsSlice.reducer;