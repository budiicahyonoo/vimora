'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Check } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const cartItems = [
    { id: 1, name: 'Premium Silk Blouse', price: 299, quantity: 1 },
    { id: 2, name: 'Leather Bag', price: 599, quantity: 1 },
  ]

  const subtotal = 898
  const shipping = 0
  const tax = 89.80
  const total = 987.80

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order #VL-2024-001 has been confirmed. You will receive an email confirmation shortly.
          </p>
          <div className="bg-secondary rounded-lg p-6 text-left">
            <h3 className="font-bold text-foreground mb-4">What's Next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Order confirmation sent to your email</li>
              <li>✓ Tracking number will be provided soon</li>
              <li>✓ Expected delivery in 5-7 business days</li>
            </ul>
          </div>
          <div className="flex gap-4">
            <Link href="/shop" className="flex-1">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-secondary">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary px-4 py-6">
        <div className="container max-w-3xl">
          <Link href="/cart" className="flex items-center gap-2 text-accent font-medium hover:underline">
            <ChevronLeft className="w-4 h-4" /> Back to Cart
          </Link>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="container max-w-3xl">
          {/* Progress Steps */}
          <div className="flex gap-4 mb-12">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  s <= step
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {s}
                </div>
                <span className={`text-sm ${s <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                </span>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-foreground">Shipping Address</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="State / Province"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ZIP / Postal Code"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />

                    {/* Shipping Method */}
                    <div className="mt-8">
                      <h3 className="font-bold text-foreground mb-4">Shipping Method</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border border-accent bg-accent/5 rounded-lg cursor-pointer">
                          <input type="radio" name="shipping" defaultChecked className="w-4 h-4" />
                          <div>
                            <p className="font-medium text-foreground">Standard Shipping</p>
                            <p className="text-xs text-muted-foreground">Delivery in 5-7 business days</p>
                          </div>
                          <span className="ml-auto font-bold text-foreground">Free</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-accent transition-colors">
                          <input type="radio" name="shipping" className="w-4 h-4" />
                          <div>
                            <p className="font-medium text-foreground">Express Shipping</p>
                            <p className="text-xs text-muted-foreground">Delivery in 2-3 business days</p>
                          </div>
                          <span className="ml-auto font-bold text-foreground">$25</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-foreground">Payment Information</h2>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <input type="checkbox" id="same-address" defaultChecked className="w-4 h-4" />
                      <label htmlFor="same-address" className="text-sm text-foreground">
                        Billing address same as shipping
                      </label>
                    </div>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-foreground">Order Review</h2>
                  <div className="space-y-4 border-b border-border pb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-12">
                {step > 1 && (
                  <Button
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-secondary"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setStep(step + 1)}
                  >
                    Continue
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="h-fit sticky top-20">
              <div className="bg-secondary rounded-lg p-6 space-y-6 border border-border">
                <h3 className="font-bold text-foreground text-lg">Order Summary</h3>
                <div className="space-y-3 border-b border-border pb-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
