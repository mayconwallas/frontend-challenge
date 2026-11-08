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

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)

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
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-8 lg:min-h-[calc(100vh-72px)] lg:bg-background/95">
      <section className="w-full max-w-[370px] rounded-[22px] bg-[#100a08] px-6 pb-10 pt-14 sm:px-8 lg:max-w-[430px] lg:rounded-[4px] lg:border lg:border-border lg:px-10 lg:pb-9 lg:pt-6 lg:shadow-2xl">
        <div className="text-center">
          <Link
            to="/"
            aria-label="Kurio, página inicial"
            className="inline-block text-2xl font-bold tracking-[0.24em] text-foreground lg:hidden"
          >
            KURIO
          </Link>

          <div className="hidden items-center justify-end lg:flex">
            <Link
              to="/"
              aria-label="Fechar login"
              className="flex size-7 items-center justify-center text-primary"
            >
              ×
            </Link>
          </div>

          <h1 className="mt-16 text-lg font-bold text-foreground lg:mt-0">
            Entrar
          </h1>

          <p className="mt-4 hidden text-[11px] leading-5 text-muted-foreground lg:block">
            Entre para gerenciar sua carteira,
            coleção e perfil de criador.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-3 lg:mt-6"
        >
          <div>
            <label
              htmlFor="email"
              className="sr-only"
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
                setEmail(
                  event.target.value,
                )
              }
              placeholder="contato@email.com"
              className="h-12 w-full rounded-[6px] border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-[#b79267] focus:border-primary lg:h-10 lg:text-xs"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="sr-only"
            >
              Senha
            </label>

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
                  setPassword(
                    event.target.value,
                  )
                }
                placeholder="Senha"
                className="h-12 w-full rounded-[6px] border border-primary bg-transparent px-4 pr-12 text-sm text-foreground outline-none transition-colors placeholder:text-[#b79267] focus:border-primary lg:h-10 lg:text-xs"
              />

              <button
                type="button"
                aria-label={
                  showPassword
                    ? 'Ocultar conteúdo'
                    : 'Exibir conteúdo'
                }
                aria-pressed={
                  showPassword
                }
                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current,
                  )
                }
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-primary"
              >
                {showPassword
                  ? '○'
                  : '◉'}
              </button>
            </div>

            <div className="mt-2 text-right">
              <button
                type="button"
                className="text-[11px] text-primary"
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>

          {loginMutation.isError && (
            <p
              role="alert"
              className="rounded-[5px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-500"
            >
              E-mail ou senha inválidos.
            </p>
          )}

          <button
            type="submit"
            disabled={
              loginMutation.isPending
            }
            className="mt-7 h-[52px] w-full rounded-[7px] bg-[#dd914c] px-4 text-sm font-bold text-[#140d0a] transition-opacity hover:opacity-90 disabled:opacity-50 lg:mt-5 lg:h-10 lg:text-xs"
          >
            {loginMutation.isPending
              ? 'Entrando...'
              : 'Entrar'}
          </button>
        </form>

        <div className="my-8 flex items-center gap-3 lg:my-5">
          <div className="h-px flex-1 bg-border" />

          <span className="whitespace-nowrap text-[10px] text-foreground">
            Ou continue com
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-3 rounded-[4px] border border-border text-[11px] text-[#c9aa82] transition-colors hover:border-primary"
          >
            <span className="font-bold text-[#4285f4]">
              G
            </span>
            Continuar com Google
          </button>

          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-3 rounded-[4px] border border-border text-[11px] text-[#c9aa82] transition-colors hover:border-primary"
          >
            <span className="text-base font-bold text-[#517bbd]">
              f
            </span>
            Continuar com Facebook
          </button>
        </div>

        <p className="mt-10 text-center text-xs text-[#c9aa82] lg:mt-7 lg:text-[10px]">
          Novo na Kurio?{' '}
          <Link
            to="/register"
            className="text-[#c9aa82] transition-colors hover:text-primary"
          >
            Crie uma conta
          </Link>
        </p>
      </section>
    </main>
  )
}