"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    specialInstructions: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your order is empty. Please add items to your order.");
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please provide your name and phone number.");
      return;
    }

    // Validate phone number (simple validation)
    if (!/^\d{10}$/.test(formData.phone.trim())) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      toast.success("Your order has been placed successfully!");
      clearCart();
      setIsSubmitting(false);

      // Redirect back to home page after successful order
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-orange-600">Shubhhundai</h1>
          <p className="text-gray-600 mt-2">Complete Your Order</p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Please provide your details to complete the order</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Any special instructions for your order"
                ></textarea>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order before confirming</CardDescription>
          </CardHeader>
          <CardContent className={items.length === 0 ? "empty-order-message" : ""}>
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Your order is empty</p>
                <p className="text-sm mt-2">Return to the menu to add items to your order</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b">
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
                        <p className="text-sm text-gray-500">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t pt-6">
            <div className="w-full flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="w-full flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Link href="/">
            <Button variant="outline" className="w-full md:w-auto">
              Back to Menu
            </Button>
          </Link>
          <Button
            className="w-full md:w-auto bg-green-600 hover:bg-green-700"
            disabled={isSubmitting || items.length === 0}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Processing..." : "Confirm Order"}
          </Button>
        </div>
      </div>
    </main>
  );
}
