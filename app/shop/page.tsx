'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 1000])

  const products = [
    { id: 1, name: 'Silk Blouse', category: 'Clothing', price: 299, image: '/products/silk-blouse.jpg' },
    { id: 2, name: 'Wool Blazer', category: 'Clothing', price: 499, image: '/products/wool-blazer.jpg' },
    { id: 3, name: 'Leather Bag', category: 'Accessories', price: 599, image: '/products/leather-bag.jpg' },
    { id: 4, name: 'Cashmere Scarf', category: 'Accessories', price: 199, image: '/products/cashmere-scarf.jpg' },
    { id: 5, name: 'Leather Shoes', category: 'Footwear', price: 399, image: '/products/leather-shoes.jpg' },
    { id: 6, name: 'Designer Heels', category: 'Footwear', price: 349, image: '/products/designer-heels.jpg' },
    { id: 7, name: 'Cotton Dress', category: 'Clothing', price: 349, image: '/products/cotton-dress.jpg' },
    { id: 8, name: 'Silk Tie', category: 'Accessories', price: 149, image: '/products/silk-tie.jpg' },
  ]

  const filteredProducts = products.filter(p => {
    const categoryMatch = !selectedCategory || p.category === selectedCategory
    const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
    return categoryMatch && priceMatch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background px-4 py-3 md:py-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-2 text-xs md:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="border-b border-border bg-secondary px-4 py-8 md:py-12">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Our Collection</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">Discover our curated selection of premium fashion</p>
        </div>
      </div>

      <div className="px-4 py-6 md:py-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {/* Sidebar Filters */}
            <div className="md:border-r border-border md:pr-6 lg:pr-8 pb-6 md:pb-0 border-b md:border-b-0">
              <div className="space-y-6 md:space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="font-serif font-bold text-foreground mb-3 md:mb-4 text-sm md:text-base">Category</h3>
                  <div className="space-y-2 md:space-y-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block text-xs md:text-sm transition-colors ${!selectedCategory ? 'text-accent font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      All Products
                    </button>
                    {['Clothing', 'Accessories', 'Footwear'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block text-xs md:text-sm transition-colors ${selectedCategory === cat ? 'text-accent font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-serif font-bold text-foreground mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">${priceRange[0]}</span>
                      <span className="text-muted-foreground">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="font-serif font-bold text-foreground mb-4">Size</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        className="px-3 py-2 border border-border rounded hover:border-accent text-sm text-foreground"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort & View */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded px-3 py-2 bg-background text-foreground"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group">
                    <Link href={`/shop/${product.id}`}>
                      <div className="bg-secondary rounded-lg aspect-square mb-2 md:mb-4 border border-border group-hover:border-accent transition-colors cursor-pointer overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <h3 className="font-serif font-bold text-foreground text-sm md:text-base mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-sm md:text-base">${product.price}</span>
                      <div className="flex gap-1 md:gap-2">
                        <button className="p-1 md:p-2 hover:bg-secondary rounded-full transition-colors">
                          <Heart className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <button className="p-1 md:p-2 hover:bg-secondary rounded-full transition-colors">
                          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
