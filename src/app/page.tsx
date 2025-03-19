"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const foodItems = [
  {
    id: 1,
    name: "Waffer",
    price: 30,
    image: "https://png.pngtree.com/png-vector/20241119/ourlarge/pngtree-high-quality-waffle-cookies-clipart-for-tasty-dessert-illustrations-png-image_14491326.png",
    description: "Crispy and delicious waffer cookies"
  },
  {
    id: 2,
    name: "Biscuit",
    price: 25,
    image: "https://s.alicdn.com/@sc04/kf/H9c951e1e671043b7ab0b3e771118765c7.jpg_720x720q50.jpg",
    description: "Crunchy biscuits perfect with tea or coffee"
  },
  {
    id: 3,
    name: "Sweet Lime Water",
    price: 45,
    image: "https://images.squarespace-cdn.com/content/v1/592308c2d2b8577cbf90c0ee/c73d3cb0-80fb-4f38-896f-16643b27b0b0/Recipe+Fresh+Lime+Soda.jpg",
    description: "Refreshing sweet lime water with a hint of mint"
  },
  {
    id: 4,
    name: "Cold Coffee",
    price: 60,
    image: "https://www.allrecipes.com/thmb/Hqro0FNdnDEwDjrEoxhMfKdWfOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21667-easy-iced-coffee-ddmfs-4x3-0093-7becf3932bd64ed7b594d46c02d0889f.jpg",
    description: "Chilled coffee with creamy milk and ice"
  },
  {
    id: 5,
    name: "Masala Tea",
    price: 35,
    image: "https://boulderlocavore.com/wp-content/uploads/2020/10/Chai-Masala-and-latte-title-image.jpg",
    description: "Aromatic masala chai with spices"
  },
  {
    id: 6,
    name: "Cappuccino",
    price: 65,
    image: "https://images.ctfassets.net/v601h1fyjgba/6TroCkgvDucbXj1OSPeve5/7cfeb09a7498e59bd7a48c4e048d2cec/Lite_Iced_Cappuccino_Hi.jpg",
    description: "Rich and creamy cappuccino with frothy milk"
  },
  {
    id: 7,
    name: "Black Coffee",
    price: 50,
    image: "https://www.cariboucoffee.com/wp-content/uploads/2020/07/2024_SignatureFoilRedesign_ProductProfile_Dark-4_2000x2000_Mahogany.png",
    description: "Strong and bold black coffee"
  },
  {
    id: 8,
    name: "Herbal Green Tea",
    price: 40,
    image: "https://m.media-amazon.com/images/I/81ujLBzJ14L.jpg",
    description: "Soothing herbal green tea with antioxidants"
  }
];

export default function Home() {
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  const handleAddToOrder = (item: typeof foodItems[0]) => {
    addItem(item);
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-orange-600">Shubh hundai</h1>
          <p className="text-gray-600 mt-2">Delicious Food & Beverages</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Food & Beverage Menu</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foodItems.map((item) => (
                <Card key={item.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      {/* <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                        ₹{item.price}
                      </Badge> */}
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleAddToOrder(item)}
                    >
                      Add to Order
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Your Order <Badge className="ml-2 bg-orange-500">{totalItems}</Badge></CardTitle>
                <CardDescription>Items in your current order</CardDescription>
              </CardHeader>
              <CardContent className={items.length === 0 ? "empty-order-message" : ""}>
                {items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Your order is empty</p>
                    <p className="text-sm mt-2">Add items from the menu to place an order</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {/* <div className="w-full flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div> */}
                <Link href="/checkout" className="w-full">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={items.length === 0}
                  >
                    Continue to Checkout
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
