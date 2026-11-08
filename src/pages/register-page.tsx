import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  useNavigate,
} from '@tanstack/react-router'

import { useRegister } from '@/features/auth'

export function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation =
    useRegister()

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)

  const [
    validationError,
    setValidationError,
  ] = useState<string | null>(
    null,
  )

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setValidationError(null)

    if (
      password !==
      confirmPassword
    ) {
      setValidationError(
        'As senhas informadas não correspondem.',
      )

      return
    }

    if (password.length < 8) {
      setValidationError(
        'A senha deve ter pelo menos 8 caracteres.',
      )

      return
    }

    try {
      await registerMutation.mutateAsync({
        name,
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
      <section className="w-full max-w-[370px] rounded-[22px] bg-[#100a08] px-6 pb-8 pt-12 sm:px-8 lg:max-w-[430px] lg:rounded-[4px] lg:border lg:border-border lg:px-10 lg:pb-8 lg:pt-6 lg:shadow-2xl">
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
              aria-label="Fechar cadastro"
              className="flex size-7 items-center justify-center text-primary"
            >
              ×
            </Link>
          </div>

          <h1 className="mt-14 text-base font-bold text-foreground lg:mt-0">
            Criar perfil de colecionador
          </h1>

          <p className="mt-3 hidden text-[10px] leading-5 text-muted-foreground lg:block">
            Crie seu perfil para colecionar NFTs e
            conecte uma carteira.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-3 lg:mt-5"
        >
          <div>
            <label
              htmlFor="name"
              className="sr-only"
            >
              Nome
            </label>

            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
              placeholder="Nome de usuário"
              className="h-11 w-full rounded-[6px] border border-border bg-transparent px-4 text-xs text-foreground outline-none placeholder:text-[#b79267] focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="sr-only"
            >
              E-mail
            </label>

            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder="Digite seu e-mail"
              className="h-11 w-full rounded-[6px] border border-border bg-transparent px-4 text-xs text-foreground outline-none placeholder:text-[#b79267] focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="sr-only"
            >
              Senha
            </label>

            <div className="relative">
              <input
                id="register-password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                placeholder="Senha"
                className="h-11 w-full rounded-[6px] border border-border bg-transparent px-4 pr-12 text-xs text-foreground outline-none placeholder:text-[#b79267] focus:border-primary"
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
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="sr-only"
            >
              Confirmar senha
            </label>

            <div className="relative">
              <input
                id="confirm-password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                required
                minLength={8}
                autoComplete="new-password"
                value={
                  confirmPassword
                }
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                placeholder="Confirmar senha"
                className="h-11 w-full rounded-[6px] border border-border bg-transparent px-4 pr-12 text-xs text-foreground outline-none placeholder:text-[#b79267] focus:border-primary"
              />

              <span
                aria-hidden="true"
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-primary"
              >
                ◉
              </span>
            </div>
          </div>

          {validationError && (
            <p
              role="alert"
              className="rounded-[5px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-500"
            >
              {validationError}
            </p>
          )}

          {registerMutation.isError && (
            <p
              role="alert"
              className="rounded-[5px] border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-500"
            >
              Não foi possível criar sua conta.
            </p>
          )}

          <button
            type="submit"
            aria-label="Criar conta"
            disabled={
              registerMutation.isPending
            }
            className="mt-6 h-[52px] w-full rounded-[7px] bg-[#dd914c] text-sm font-bold text-[#140d0a] transition-opacity hover:opacity-90 disabled:opacity-50 lg:mt-4 lg:h-10 lg:text-xs"
          >
            {registerMutation.isPending
              ? 'Criando perfil...'
              : 'Criar perfil'}
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
            className="flex h-9 w-full items-center justify-center gap-3 rounded-[4px] border border-border text-[11px] text-[#c9aa82] transition-colors hover:border-primary"
          >
            <span className="font-bold text-[#4285f4]">
              G
            </span>
            Continuar com Google
          </button>

          <button
            type="button"
            className="flex h-9 w-full items-center justify-center gap-3 rounded-[4px] border border-border text-[11px] text-[#c9aa82] transition-colors hover:border-primary"
          >
            <span className="text-base font-bold text-[#517bbd]">
              f
            </span>
            Continuar com Facebook
          </button>
        </div>

        <p className="mt-9 text-center text-xs text-[#c9aa82] lg:mt-6 lg:text-[10px]">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="transition-colors hover:text-primary"
          >
            Entre
          </Link>
        </p>
      </section>
    </main>
  )
}