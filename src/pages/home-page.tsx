import { Button } from '@/components/ui/button'

export function HomePage() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <h1 className="text-3xl font-bold uppercase">
        Frontend Challenge
      </h1>

      <Button className="mt-4">
        Explore NFTs
      </Button>
    </main>
  )
}