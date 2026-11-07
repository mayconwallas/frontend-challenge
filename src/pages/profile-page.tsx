import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'

import {
  useChangePassword,
  useProfile,
  useUpdateProfile,
} from '@/features/profile'
import type { CollectorProfile } from '@/features/profile'

export function ProfilePage() {
  const profileQuery = useProfile()

  if (profileQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <p>Carregando perfil...</p>
      </main>
    )
  }

  if (
    profileQuery.isError ||
    !profileQuery.data
  ) {
    return (
      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <h1 className="text-2xl font-semibold">
          Perfil indisponível
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Entre na sua conta para acessar seu perfil.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block text-primary"
        >
          Entrar
        </Link>
      </main>
    )
  }

  return (
    <ProfileContent
      profile={profileQuery.data.profile}
    />
  )
}

interface ProfileContentProps {
  profile: CollectorProfile
}

function ProfileContent({
  profile,
}: ProfileContentProps) {
  const updateProfileMutation =
    useUpdateProfile()

  const changePasswordMutation =
    useChangePassword()

  const [displayName, setDisplayName] =
    useState(profile.displayName)

  const [username, setUsername] =
    useState(profile.username)

  const [email, setEmail] =
    useState(profile.email)

  const [ensName, setEnsName] =
    useState(profile.ensName ?? '')

  const [walletNickname, setWalletNickname] =
    useState(profile.walletNickname ?? '')

  const [avatarUrl, setAvatarUrl] =
    useState(profile.avatarUrl ?? '')

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState('')

  const [newPassword, setNewPassword] =
    useState('')

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('')

  const [
    profileSaved,
    setProfileSaved,
  ] = useState(false)

  const [
    passwordChanged,
    setPasswordChanged,
  ] = useState(false)

  async function handleProfileSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setProfileSaved(false)

    await updateProfileMutation.mutateAsync({
      displayName,
      username,
      email,
      ensName: ensName || undefined,
      walletNickname:
        walletNickname || undefined,
      avatarUrl: avatarUrl || undefined,
    })

    setProfileSaved(true)
  }

  async function handlePasswordSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setPasswordChanged(false)

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
        confirmPassword,
      })

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordChanged(true)
    } catch {
      // O estado de erro da mutation é exibido abaixo.
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="h-fit border border-border bg-card">
          <div className="border-b border-border px-5 py-4">
            <h1 className="font-semibold">
              Meu perfil
            </h1>
          </div>

          <nav
            aria-label="Navegação do perfil"
            className="flex overflow-x-auto lg:block"
          >
            <Link
              to="/profile"
              className="block shrink-0 border-b-2 border-primary px-5 py-3 text-sm text-primary lg:border-b-0 lg:border-l-2"
            >
              Dados do perfil
            </Link>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Carteiras
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Atividade
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Lista de interesse
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Ofertas
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Arquivos baixados
            </span>

            <span className="block shrink-0 px-5 py-3 text-sm text-muted-foreground">
              Suporte
            </span>
          </nav>
        </aside>

        <div className="min-w-0">
          <section>
            <h2 className="text-xl font-semibold">
              Perfil do colecionador
            </h2>

            <form
              onSubmit={handleProfileSubmit}
              className="mt-6"
            >
              <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
                <ProfileField
                  id="display-name"
                  label="Nome de exibição"
                  value={displayName}
                  required
                  onChange={setDisplayName}
                />

                <ProfileField
                  id="username"
                  label="Nome de usuário"
                  value={username}
                  required
                  onChange={setUsername}
                />

                <ProfileField
                  id="profile-email"
                  label="E-mail"
                  type="email"
                  value={email}
                  required
                  onChange={setEmail}
                />

                <ProfileField
                  id="ens-name"
                  label="Nome ENS"
                  value={ensName}
                  placeholder="nome.eth"
                  onChange={setEnsName}
                />

                <ProfileField
                  id="wallet-nickname"
                  label="Apelido da carteira"
                  value={walletNickname}
                  onChange={setWalletNickname}
                />

                <ProfileField
                  id="avatar-url"
                  label="Avatar"
                  value={avatarUrl}
                  placeholder="URL da imagem"
                  onChange={setAvatarUrl}
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex min-h-16 items-center gap-4">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar do perfil"
                      className="h-16 w-16 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div
                      aria-label="Avatar não definido"
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-card text-lg font-semibold text-primary"
                    >
                      {displayName
                        .charAt(0)
                        .toUpperCase() || '?'}
                    </div>
                  )}

                  {avatarUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setAvatarUrl('')
                      }
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    updateProfileMutation.isPending
                  }
                  className="bg-primary px-6 py-3 font-medium text-primary-foreground disabled:opacity-50"
                >
                  {updateProfileMutation.isPending
                    ? 'Salvando...'
                    : 'Salvar perfil'}
                </button>
              </div>

              {profileSaved && (
                <p
                  role="status"
                  className="mt-4 text-sm text-primary"
                >
                  Perfil atualizado com sucesso.
                </p>
              )}

              {updateProfileMutation.isError && (
                <p
                  role="alert"
                  className="mt-4 text-sm text-red-500"
                >
                  Não foi possível atualizar o perfil.
                </p>
              )}
            </form>
          </section>

          <section className="mt-12 border-t border-border pt-8">
            <h2 className="text-xl font-semibold">
              Alterar senha
            </h2>

            <form
              onSubmit={handlePasswordSubmit}
              className="mt-6 max-w-xl space-y-5"
            >
              <ProfileField
                id="current-password"
                label="Senha atual"
                type="password"
                value={currentPassword}
                required
                onChange={setCurrentPassword}
              />

              <ProfileField
                id="new-password"
                label="Nova senha"
                type="password"
                value={newPassword}
                required
                onChange={setNewPassword}
              />

              <ProfileField
                id="confirm-new-password"
                label="Confirmar nova senha"
                type="password"
                value={confirmPassword}
                required
                onChange={setConfirmPassword}
              />

              <button
                type="submit"
                disabled={
                  changePasswordMutation.isPending
                }
                className="bg-primary px-6 py-3 font-medium text-primary-foreground disabled:opacity-50"
              >
                {changePasswordMutation.isPending
                  ? 'Salvando...'
                  : 'Salvar nova senha'}
              </button>

              {passwordChanged && (
                <p
                  role="status"
                  className="text-sm text-primary"
                >
                  Senha atualizada com sucesso.
                </p>
              )}

              {changePasswordMutation.isError && (
                <p
                  role="alert"
                  className="text-sm text-red-500"
                >
                  Não foi possível alterar a senha.
                  Verifique os dados informados.
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </main>
  )
}

interface ProfileFieldProps {
  id: string
  label: string
  value: string
  type?: string
  placeholder?: string
  required?: boolean
  onChange: (value: string) => void
}

function ProfileField({
  id,
  label,
  value,
  type = 'text',
  placeholder,
  required = false,
  onChange,
}: ProfileFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
      >
        {label}

        {required && (
          <span className="text-primary">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary"
      />
    </div>
  )
}