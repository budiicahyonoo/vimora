'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Menu, Search, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    { name: 'Clothing', image: '/Clothes.png' },
    { name: 'Accessories', image: '/kalung.png' },
    { name: 'Footwear', image: '/foot.png' }
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">

          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/velmora-logo.svg" alt="Velmora Logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Shop</Link>
            <Link href="/collection" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Collection</Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:inline-flex p-2 hover:bg-secondary rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/auth/login" className="hidden md:inline-flex p-2 hover:bg-secondary rounded-full transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/wishlist" className="p-2 hover:bg-secondary rounded-full transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-foreground text-xs rounded-full flex items-center justify-center">0</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col gap-4 p-4">
              <Link href="/shop">Shop</Link>
              <Link href="/collection">Collection</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 px-4 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold">
                Luxury Refined
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our exclusive collection of premium fashion pieces crafted with precision and elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg">Shop Now</Button>
                </Link>
                <Link href="/collection">
                  <Button size="lg" variant="outline">View Collection</Button>
                </Link>
              </div>
            </div>

            {/* HERO IMAGE DITAMBAHKAN */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden border border-border">
                <Image
                  src="/Logo Velmora.png"
                  alt="Hero Image"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 px-4 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-serif font-bold mb-12">Shop by Category</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/shop?category=${category.name.toLowerCase()}`}>
                <div className="group relative cursor-pointer rounded-lg overflow-hidden aspect-square border border-border">

                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">
                      {category.name}
                    </h3>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 px-4 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-serif font-bold mb-12">Featured Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: 1, name: 'Black Wool Blazer', price: '$499', image: '/products/featured-1.jpg' },
              { id: 2, name: 'White Silk Blouse', price: '$299', image: '/products/featured-2.jpg' },
              { id: 3, name: 'Leather Handbag', price: '$599', image: '/products/featured-3.jpg' },
              { id: 4, name: 'Cashmere Scarf', price: '$199', image: '/products/featured-4.jpg' }
            ].map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group">
                <div className="relative bg-secondary rounded-lg aspect-square mb-4 border border-border overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif font-bold mb-2">{product.name}</h3>
                <span className="font-bold">{product.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}