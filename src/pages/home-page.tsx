import { Button } from '@/components/ui/button'
import { PageContainer } from '@/components/layout/page-container'
import { Section } from '@/components/layout/section'

export function HomePage() {
  return (
    <PageContainer>
      <Section>
        <p className="mb-3 text-sm tracking-wide text-primary">
          Bem-vindo à Kurio
        </p>

        <h1 className="max-w-xl text-3xl font-bold uppercase leading-tight md:text-4xl lg:text-5xl">
          Seja dono da cultura digital
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
          Descubra NFTs selecionados de criadores do mundo todo.
        </p>

        <Button className="mt-6">
          Explorar
        </Button>
      </Section>
    </PageContainer>
  )
}