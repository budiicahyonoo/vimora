'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Premium Silk Blouse', price: 299, quantity: 1, size: 'M', image: '👔' },
    { id: 2, name: 'Leather Bag', price: 599, quantity: 1, size: 'One Size', image: '👜' },
  ])

  const updateQuantity = (id: number, qty: number) => {
    if (qty === 0) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary px-4 py-8">
        <div className="container max-w-7xl">
          <h1 className="text-3xl font-serif font-bold text-foreground">Shopping Cart</h1>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="container max-w-7xl">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-serif font-bold text-foreground mb-4">Your cart is empty</p>
              <p className="text-muted-foreground mb-8">Add some items to get started</p>
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4 border-b border-border pb-8 mb-8">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-0">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center border border-border flex-shrink-0">
                        <div className="text-4xl">{item.image}</div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-foreground mb-1">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mb-3">Size: {item.size}</p>
                        <p className="font-bold text-foreground">${item.price}</p>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <Link href="/shop">
                  <button className="text-accent font-medium hover:underline flex items-center gap-2">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:border-l border-border lg:pl-8">
                <div className="bg-secondary rounded-lg p-6 space-y-6 sticky top-24">
                  <h2 className="text-xl font-serif font-bold text-foreground">Order Summary</h2>

                  {/* Summary Details */}
                  <div className="space-y-4 border-b border-border pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={`text-foreground font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-bold">Total</span>
                    <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                  </div>

                  {/* Promo Code */}
                  <div>
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full px-3 py-2 bg-background border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Benefits */}
                  <div className="space-y-3 text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex gap-2">
                      <span>✓</span>
                      <span>Free shipping on orders over $100</span>
                    </div>
                    <div className="flex gap-2">
                      <span>✓</span>
                      <span>30-day return policy</span>
                    </div>
                    <div className="flex gap-2">
                      <span>✓</span>
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
