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
  const [password, setPassword] = useState('')

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

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
      // O erro é exibido abaixo.
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold">
        Criar conta
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Crie sua conta de colecionador Kurio.
      </p>

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
            className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
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
            className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block text-sm font-medium"
          >
            Senha
          </label>

          <input
            id="register-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
        </div>

        {registerMutation.isError && (
          <p
            role="alert"
            className="text-sm text-red-500"
          >
            Não foi possível criar sua conta.
          </p>
        )}

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-50"
        >
          {registerMutation.isPending
            ? 'Criando conta...'
            : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm">
        Já possui uma conta?{' '}
        <Link
          to="/login"
          className="text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </main>
  )
}