import Link from "next/link";
import PublicSideMenu from "@/components/client/PublicSideMenu/PublicSideMenu";
import HeroSection from "@/components/client/customers/HeroSection/HeroSection";

export default async function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 pt-24">
        <HeroSection />
        {/* Sidemenu kiri */}
        <div className="hidden md:block">
          <PublicSideMenu />
        </div>

        {/* Kontennnnnnnnnnnn */}
        <section className="px-4 grid md:grid-col-span-3 sm:grid-cols-2 lg:gris-cols-3 gap-6">
          {["Nike", "Adidas", "Puma", "Mizuno", "Specs", "Ortuseight"].map(
            (brand) => (
              <div
                key={brand}
                className="border p-6 rounded-xl text-center shadow hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold mb-4">{brand}</h2>
                <p className="text-gray-600 mb-4">
                  Explore the latest from {brand}
                </p>
                <Link
                  href={`/products?brand=${brand.toLowerCase()}`}
                  className="text-blue-600 font-medium"
                >
                  Shop Now →
                </Link>
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}
