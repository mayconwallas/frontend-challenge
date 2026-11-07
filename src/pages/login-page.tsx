import { useState } from 'react'
import type { FormEvent } from 'react'

import { useLogin } from '@/features/auth'
import {
  Link,
  useNavigate,
} from '@tanstack/react-router'


export function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      // O erro é exibido abaixo.
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold">
        Entrar
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Acesse sua conta Kurio.
      </p>

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
            className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium"
          >
            Senha
          </label>

          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        {loginMutation.isError && (
          <p
            role="alert"
            className="text-sm text-red-500"
          >
            E-mail ou senha inválidos.
          </p>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-50"
        >
          {loginMutation.isPending
            ? 'Entrando...'
            : 'Entrar'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm">
  Ainda não possui conta?{' '}
  <Link
    to="/register"
    className="text-primary hover:underline"
  >
    Criar conta
  </Link>
</p>
    </main>
  )
}