'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Premium Silk Blouse', price: 299, image: '👔', inStock: true },
    { id: 2, name: 'Leather Bag', price: 599, image: '👜', inStock: true },
    { id: 3, name: 'Cashmere Scarf', price: 199, image: '🧣', inStock: false },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary px-4 py-8">
        <div className="container max-w-7xl">
          <h1 className="text-3xl font-serif font-bold text-foreground">Wishlist</h1>
          <p className="text-muted-foreground mt-2">Your favorite items saved for later</p>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="container max-w-7xl">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-2xl font-serif font-bold text-foreground mb-4">Your wishlist is empty</p>
              <p className="text-muted-foreground mb-8">Start adding items you love</p>
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistItems.map(item => (
                  <div key={item.id} className="group">
                    <div className="bg-secondary rounded-lg aspect-square flex items-center justify-center mb-4 border border-border group-hover:border-accent transition-colors relative">
                      <div className="text-6xl">{item.image}</div>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 p-2 bg-background rounded-full border border-border hover:border-accent transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                    <h3 className="font-serif font-bold text-foreground mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-foreground mb-4">${item.price}</p>
                    {item.inStock ? (
                      <div className="flex gap-2">
                        <Link href={`/shop/${item.id}`} className="flex-1">
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            View Product
                          </Button>
                        </Link>
                        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full border-muted-foreground text-muted-foreground" disabled>
                        Out of Stock
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
