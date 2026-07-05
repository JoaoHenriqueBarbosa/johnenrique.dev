import { Header } from "./header";
import { Hero } from "./hero";
import { Work } from "./work";
import { Contact } from "./contact";
import { Footer } from "./footer";

export function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
