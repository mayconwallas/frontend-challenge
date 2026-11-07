import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  useNavigate,
} from '@tanstack/react-router'

import { useRegister } from '@/features/auth'

export function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegister()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')
  const [showPassword, setShowPassword] =
    useState(false)
  const [validationError, setValidationError] =
    useState<string | null>(null)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setValidationError(null)

    if (password !== confirmPassword) {
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
            Novo colecionador
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Criar conta
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Crie sua conta para colecionar NFTs e
            gerenciar suas carteiras.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
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
                setName(event.target.value)
              }
              className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium"
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
                setEmail(event.target.value)
              }
              className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium"
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

            <p className="mt-2 text-xs text-muted-foreground">
              Use pelo menos 8 caracteres.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-medium"
            >
              Confirmar senha
            </label>

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
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value,
                )
              }
              className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
            />
          </div>

          {validationError && (
            <p
              role="alert"
              className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              {validationError}
            </p>
          )}

          {registerMutation.isError && (
            <p
              role="alert"
              className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              Não foi possível criar sua conta.
            </p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-primary px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {registerMutation.isPending
              ? 'Criando conta...'
              : 'Criar conta'}
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
          Já possui uma conta?{' '}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Entrar
          </Link>
        </p>
      </section>
    </main>
  )
}