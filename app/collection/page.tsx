export const metadata = {
    title: "Collection | Velmora",
    description: "Explore the complete Velmora luxury fashion collection.",
  }
  
  export default function CollectionPage() {
    return (
      <div className="min-h-screen bg-background">
  
        {/* Hero Section */}
        <section className="border-b border-border bg-secondary px-4 py-20">
          <div className="container mx-auto max-w-7xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
              The Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A refined selection of timeless essentials designed for modern sophistication.
              Each piece reflects craftsmanship, precision, and understated elegance.
            </p>
          </div>
        </section>
  
        {/* Categories Section */}
        <section className="px-4 py-20 bg-background">
          <div className="container mx-auto max-w-7xl">
  
            <h2 className="text-3xl font-serif font-bold mb-12">
              Explore by Category
            </h2>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  
              {/* Clothing */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-secondary border border-border rounded-lg overflow-hidden mb-6">
                  <img
                    src="/products/featured-1.jpg"
                    alt="Clothing"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold">Clothing</h3>
                <p className="text-muted-foreground mt-2">
                  Tailored silhouettes and timeless staples.
                </p>
              </div>
  
              {/* Accessories */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-secondary border border-border rounded-lg overflow-hidden mb-6">
                  <img
                    src="/products/featured-3.jpg"
                    alt="Accessories"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold">Accessories</h3>
                <p className="text-muted-foreground mt-2">
                  Minimal yet distinctive finishing touches.
                </p>
              </div>
  
              {/* Footwear */}
              <div className="group cursor-pointer">
                <div className="aspect-[4/5] bg-secondary border border-border rounded-lg overflow-hidden mb-6">
                  <img
                    src="/products/leather-shoes.jpg"
                    alt="Footwear"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold">Footwear</h3>
                <p className="text-muted-foreground mt-2">
                  Crafted for presence and comfort.
                </p>
              </div>
  
            </div>
          </div>
        </section>
  
        {/* Editorial Section */}
        <section className="px-4 py-24 bg-secondary border-t border-border">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Designed with Intention
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Velmora, luxury is defined by restraint. We embrace clean lines,
              muted tones, and thoughtful construction to create pieces that endure beyond trends.
            </p>
          </div>
        </section>
  
      </div>
    )
  }