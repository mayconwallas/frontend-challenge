import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  useNavigate,
} from '@tanstack/react-router'

import { useLogin } from '@/features/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')
  const [showPassword, setShowPassword] =
    useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    try {
      await loginMutation.mutateAsync({
        email,
        password,
      })

      await navigate({
        to: '/',
      })
    } catch {
      // O erro da mutation é exibido no formulário.
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-72px)] w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-primary/5"
      />

      <div
        aria-hidden="true"
        className="absolute left-[8%] top-[12%] h-52 w-52 border border-primary/20"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[10%] right-[8%] h-40 w-40 border border-border"
      />

      <section className="relative z-10 w-full max-w-md border border-border bg-background p-6 shadow-2xl sm:p-8">
        <div className="text-center">
          <Link
            to="/"
            aria-label="Kurio - página inicial"
            className="inline-block text-2xl font-bold tracking-[0.25em] text-primary"
          >
            KURIO
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Área do colecionador
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Entrar
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Acesse sua conta para gerenciar favoritos,
            carteiras e pedidos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="collector@kurio.com"
              className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Senha
              </label>

              <button
                type="button"
                className="text-xs text-primary"
              >
                Esqueceu a senha?
              </button>
            </div>

            <div className="relative">
              <input
                id="password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className="w-full border border-border bg-background px-4 py-3 pr-20 outline-none transition-colors focus:border-primary"
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? 'Ocultar conteúdo'
                    : 'Exibir conteúdo'
                }
                aria-pressed={showPassword}
                onClick={() =>
                  setShowPassword(
                    (current) => !current,
                  )
                }
                className="absolute inset-y-0 right-0 px-4 text-xs font-medium text-primary"
              >
                {showPassword
                  ? 'Ocultar'
                  : 'Mostrar'}
              </button>
            </div>
          </div>

          {loginMutation.isError && (
            <p
              role="alert"
              className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              E-mail ou senha inválidos.
            </p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-primary px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loginMutation.isPending
              ? 'Entrando...'
              : 'Entrar'}
          </button>
        </form>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            ou continue com
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Google
          </button>

          <button
            type="button"
            className="border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Facebook
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-muted-foreground">
          Ainda não possui conta?{' '}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  )
}