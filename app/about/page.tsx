export const metadata = {
    title: "About | Velmora",
    description: "Discover the philosophy behind Velmora.",
  }
  
  export default function AboutPage() {
    return (
      <div className="min-h-screen bg-background">
  
        <section className="px-4 py-24 border-b border-border bg-secondary">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-5xl font-serif font-bold mb-6">
              Our Philosophy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Velmora was founded on the belief that true luxury is subtle,
              intentional, and enduring.
            </p>
          </div>
        </section>
  
        <section className="px-4 py-24">
          <div className="container mx-auto max-w-4xl space-y-8 text-muted-foreground leading-relaxed text-lg">
            <p>
              We prioritize craftsmanship, premium materials, and timeless design.
              Our collections are curated for individuals who value refinement
              over excess.
            </p>
            <p>
              Every garment and accessory is developed with meticulous attention
              to silhouette, proportion, and texture.
            </p>
          </div>
        </section>
  
      </div>
    )
  }