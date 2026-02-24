'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddProduct, setShowAddProduct] = useState(false)

  const products = [
    { id: 1, name: 'Premium Silk Blouse', category: 'Clothing', price: '$299', stock: 45, sales: 245 },
    { id: 2, name: 'Leather Bag', category: 'Accessories', price: '$599', stock: 28, sales: 189 },
    { id: 3, name: 'Designer Heels', category: 'Footwear', price: '$349', stock: 12, sales: 167 },
    { id: 4, name: 'Cashmere Scarf', category: 'Accessories', price: '$199', stock: 58, sales: 156 },
    { id: 5, name: 'Wool Blazer', category: 'Clothing', price: '$499', stock: 33, sales: 134 },
    { id: 6, name: 'Cotton Dress', category: 'Clothing', price: '$349', stock: 67, sales: 98 },
  ]

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => setShowAddProduct(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
          <option>All Categories</option>
          <option>Clothing</option>
          <option>Accessories</option>
          <option>Footwear</option>
        </select>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg p-8 max-w-lg w-full max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Add New Product</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Product Name" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              <textarea placeholder="Description" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" rows={3} />
              <input type="number" placeholder="Price" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="number" placeholder="Stock" className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                <option>Select Category</option>
                <option>Clothing</option>
                <option>Accessories</option>
                <option>Footwear</option>
              </select>
              <div className="flex gap-4 pt-6">
                <Button variant="outline" onClick={() => setShowAddProduct(false)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Add Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-background border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-bold text-foreground">Product</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Category</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Price</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Stock</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Sales</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{product.name}</td>
                  <td className="py-4 px-6 text-muted-foreground">{product.category}</td>
                  <td className="py-4 px-6 font-bold text-foreground">{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 50 ? 'bg-green-100 text-green-700' :
                      product.stock > 20 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">{product.sales}</td>
                  <td className="py-4 px-6 flex items-center gap-2">
                    <button className="p-2 hover:bg-secondary rounded transition-colors">
                      <Edit className="w-4 h-4 text-accent" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
