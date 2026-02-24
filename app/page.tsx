'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Menu, Search, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-7xl items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img 
              src="/velmora-logo.svg" 
              alt="Velmora Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Shop
            </Link>
            <Link href="/collection" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Collection
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="flex flex-col gap-4 p-4">
              <Link href="/shop" className="text-sm font-medium text-foreground hover:text-accent">Shop</Link>
              <Link href="/collection" className="text-sm font-medium text-foreground hover:text-accent">Collection</Link>
              <Link href="/about" className="text-sm font-medium text-foreground hover:text-accent">About</Link>
              <Link href="/contact" className="text-sm font-medium text-foreground hover:text-accent">Contact</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 px-4 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground text-balance leading-tight">
                Luxury Refined
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md">
                Discover our exclusive collection of premium fashion pieces crafted with precision and elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 md:pt-4">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/collection" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-secondary">
                    View Collection
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full max-w-sm aspect-square bg-accent/10 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold text-accent/30">V</div>
                  <p className="text-muted-foreground">Featured Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 px-4 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8 md:mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {['Clothing', 'Accessories', 'Footwear'].map((category) => (
              <Link key={category} href={`/shop?category=${category.toLowerCase()}`}>
                <div className="group cursor-pointer bg-secondary rounded-lg aspect-square flex items-center justify-center hover:bg-accent/20 transition-colors border border-border">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors text-center px-4">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 px-4 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Featured Products</h2>
            <Link href="/shop" className="text-accent font-medium hover:underline text-sm md:text-base whitespace-nowrap">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { id: 1, name: 'Black Wool Blazer', price: '$499', image: '/products/featured-1.jpg' },
              { id: 2, name: 'White Silk Blouse', price: '$299', image: '/products/featured-2.jpg' },
              { id: 3, name: 'Leather Handbag', price: '$599', image: '/products/featured-3.jpg' },
              { id: 4, name: 'Cashmere Scarf', price: '$199', image: '/products/featured-4.jpg' }
            ].map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`} className="group">
                <div className="bg-secondary rounded-lg aspect-square mb-3 md:mb-4 border border-border group-hover:border-accent transition-colors overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif font-bold text-foreground text-sm md:text-base mb-1 md:mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm md:text-base">{product.price}</span>
                  <button className="p-1 md:p-2 hover:bg-secondary rounded-full transition-colors">
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Join Our Community</h2>
            <p className="text-sm md:text-base text-muted-foreground">Subscribe to get exclusive offers, new arrivals, and style tips.</p>
            <form className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div>
              <h3 className="font-serif font-bold text-base md:text-lg mb-3 md:mb-4">VELMORA</h3>
              <p className="text-xs sm:text-sm text-primary-foreground/70">Premium luxury fashion and accessories for the modern connoisseur.</p>
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wide">Shop</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/70">
                <li><Link href="/shop" className="hover:text-primary-foreground transition-colors">All Products</Link></li>
                <li><Link href="/collection" className="hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
                <li><Link href="/sale" className="hover:text-primary-foreground transition-colors">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wide">Support</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/70">
                <li><Link href="/faq" className="hover:text-primary-foreground transition-colors">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-primary-foreground transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-primary-foreground transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-4">Contact</h4>
              <p className="text-sm text-primary-foreground/70 mb-2">support@velmora.com</p>
              <p className="text-sm text-primary-foreground/70">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; 2024 Velmora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
