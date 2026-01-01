import { Suspense } from "react";
import { DirectoryContent } from "@/components/directory-content";

export default function Home() {
  return (
    <div className="min-h-screen geometric-pattern">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-arabic text-primary-foreground text-lg font-bold">ق</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg tracking-tight">QUL Directory</h1>
                <p className="text-xs text-muted-foreground">Built with QUL Resources</p>
              </div>
            </div>
            <a
              href="https://qul.tarteel.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Visit QUL
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <section className="text-center mb-12">
          <h2 className="font-arabic text-4xl sm:text-5xl text-primary mb-4">
            بِسْمِ اللَّهِ
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Discover Apps &amp; Tools Built with QUL
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A curated directory of applications, tools, and websites that leverage the{" "}
            <a
              href="https://qul.tarteel.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              Quranic Universal Library
            </a>
            {" "}&mdash; the largest open-source collection of Quranic resources.
          </p>
        </section>

        <Suspense fallback={
          <div className="space-y-8">
            <div className="h-12 bg-muted animate-pulse rounded-xl" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
        }>
          <DirectoryContent />
        </Suspense>
      </main>

      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              Resources are displayed in random order for fairness
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://qul.tarteel.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                QUL
              </a>
              <span className="text-border">|</span>
              <a
                href="https://tarteel.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Tarteel AI
              </a>
              <span className="text-border">|</span>
              <a
                href="https://github.com/TarteelAI/quranic-universal-library"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
