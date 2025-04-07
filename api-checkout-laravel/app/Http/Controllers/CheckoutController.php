<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'products' => 'required|array|min:1',
            'products.*.id' => 'required|integer',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $productIds = collect($request->products)->pluck('id');
        $productsFromDb = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $totalPrice = 0;
        $orderItems = [];

        foreach ($request->products as $product) {
            $productDb = $productsFromDb->get($product['id']);

            if (!$productDb) {
                return response()->json([
                    'message' => "Produk dengan ID {$product['id']} tidak ditemukan."
                ], 404);
            }

            $totalPrice += $productDb->price * $product['quantity'];

            $orderItems[] = [
                'product_id' => $productDb->id,
                'product_name' => $productDb->name,
                'price' => $productDb->price,
                'quantity' => $product['quantity'],
            ];
        }

        $order = Order::create(['total_price' => $totalPrice]);

        foreach ($orderItems as $item) {
            OrderItem::create(array_merge(['order_id' => $order->id], $item));
        }

        return response()->json([
            'message' => 'Checkout berhasil!',
            'order_id' => $order->id,
            'total_price' => $totalPrice
        ]);
    }
}
