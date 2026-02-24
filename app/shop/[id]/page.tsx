'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Share2, ChevronLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [addedToCart, setAddedToCart] = useState(false)

  // Mock product data
  const product = {
    id: params.id,
    name: 'Premium Silk Blouse',
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 128,
    category: 'Clothing',
    description: 'Luxurious silk blouse crafted from the finest Italian silk. Features a delicate cut and premium finish, perfect for both casual and formal occasions.',
    longDescription: 'This premium silk blouse combines timeless elegance with modern comfort. Made from 100% mulberry silk, it offers a soft, breathable feel and a beautiful drape. The attention to detail is evident in every stitch, from the carefully placed buttons to the perfectly tailored seams.',
    colors: ['Black', 'Ivory', 'Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    image: '👔'
  }

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background px-4 py-4 sticky top-16 z-30">
        <div className="container max-w-7xl">
          <div className="flex gap-2 text-sm text-muted-foreground items-center">
            <Link href="/shop" className="hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-8">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-secondary rounded-lg aspect-square flex items-center justify-center border border-border">
                <div className="text-8xl">{product.image}</div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-secondary rounded-lg aspect-square flex items-center justify-center border border-border cursor-pointer hover:border-accent transition-colors">
                    <div className="text-4xl">{product.image}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase mb-2">{product.category}</p>
                    <h1 className="text-4xl font-serif font-bold text-foreground">{product.name}</h1>
                  </div>
                  <button className="p-2 hover:bg-secondary rounded-full transition-colors flex-shrink-0">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-foreground">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <span className="text-sm font-bold text-accent">Save ${product.originalPrice - product.price}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-foreground text-base leading-relaxed">{product.longDescription}</p>

              {/* Colors */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-3">Color</label>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className="px-4 py-2 border border-border rounded hover:border-accent transition-colors text-sm text-foreground"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold text-foreground mb-3">Size</label>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border rounded font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-foreground hover:border-accent'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-bold text-foreground">Quantity</label>
                <div className="flex items-center border border-border rounded w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-l border-r border-border text-center min-w-12">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <p className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : 'Out of Stock'}
              </p>

              {/* Add to Cart & Buy */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 text-base font-semibold transition-all ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 text-base font-semibold border-primary text-primary hover:bg-secondary"
                >
                  Buy Now
                </Button>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 text-accent font-medium hover:underline">
                <Share2 className="w-4 h-4" />
                Share This Product
              </button>

              {/* Shipping & Returns */}
              <div className="border-t border-border pt-6 space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-accent">📦</span>
                  <div>
                    <p className="font-bold text-foreground">Free Shipping</p>
                    <p className="text-muted-foreground">On orders over $100</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent">🔄</span>
                  <div>
                    <p className="font-bold text-foreground">Easy Returns</p>
                    <p className="text-muted-foreground">30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="group">
                  <div className="bg-secondary rounded-lg aspect-square flex items-center justify-center mb-4 border border-border group-hover:border-accent transition-colors">
                    <div className="text-6xl">👔</div>
                  </div>
                  <h3 className="font-serif font-bold text-foreground mb-1">Related Product {i}</h3>
                  <p className="text-sm text-muted-foreground mb-3">$199</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 h-10 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
