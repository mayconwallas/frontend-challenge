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
      <main className="mx-auto flex min-h-[420px] w-full max-w-[1200px] items-center justify-center px-4">
        <p
          role="status"
          className="text-sm text-muted-foreground"
        >
          Carregando perfil...
        </p>
      </main>
    )
  }

  if (
    profileQuery.isError ||
    !profileQuery.data
  ) {
    return (
      <main className="mx-auto flex min-h-[420px] w-full max-w-[1200px] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Perfil indisponível
        </h1>

        <p className="mt-3 text-sm text-muted-foreground">
          Entre na sua conta para acessar seu perfil.
        </p>

        <Link
          to="/login"
          className="mt-6 rounded-[5px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
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

  const [
    displayName,
    setDisplayName,
  ] = useState(
    profile.displayName,
  )

  const [
    username,
    setUsername,
  ] = useState(
    profile.username,
  )

  const [email, setEmail] =
    useState(
      profile.email,
    )

  const [
    ensName,
    setEnsName,
  ] = useState(
    profile.ensName ?? '',
  )

  const [
    walletNickname,
    setWalletNickname,
  ] = useState(
    profile.walletNickname ?? '',
  )

  const [
    avatarUrl,
    setAvatarUrl,
  ] = useState(
    profile.avatarUrl ?? '',
  )

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState('')

  const [
    newPassword,
    setNewPassword,
  ] = useState('')

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
      ensName:
        ensName || undefined,
      walletNickname:
        walletNickname || undefined,
      avatarUrl:
        avatarUrl || undefined,
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
      // O estado de erro é exibido abaixo.
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-7 sm:px-6 lg:pb-16 lg:pt-10">
      <div className="mb-6 flex items-center gap-4 lg:hidden">
        <Link
          to="/"
          aria-label="Voltar"
          className="flex size-9 items-center justify-center rounded-full border border-border text-foreground"
        >
          ←
        </Link>

        <h1 className="text-xl font-bold">
          Meu perfil
        </h1>
      </div>

      <div className="grid gap-7 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-10">
        <ProfileNavigation />

        <div className="min-w-0">
          <section>
            <div className="border-b border-border pb-4">
              <h2 className="text-lg font-bold text-foreground">
                Perfil do colecionador
              </h2>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Gerencie as informações associadas ao
                seu perfil de colecionador.
              </p>
            </div>

            <form
              onSubmit={handleProfileSubmit}
              className="mt-6"
            >
              <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
                <ProfileField
                  id="display-name"
                  label="Nome de exibição"
                  value={displayName}
                  required
                  onChange={
                    setDisplayName
                  }
                />

                <ProfileField
                  id="username"
                  label="Nome de usuário"
                  value={username}
                  required
                  onChange={
                    setUsername
                  }
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
                  placeholder="Carteira principal"
                  onChange={
                    setWalletNickname
                  }
                />

                <ProfileField
                  id="avatar-url"
                  label="Avatar"
                  value={avatarUrl}
                  placeholder="URL da imagem"
                  onChange={setAvatarUrl}
                />
              </div>

              <div className="mt-7 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar do perfil"
                      className="size-16 rounded-full border border-border object-cover"
                    />
                  ) : (
                    <div
                      aria-label="Avatar não definido"
                      className="flex size-16 items-center justify-center rounded-full border border-primary/40 bg-card text-xl font-bold text-primary"
                    >
                      {displayName
                        .charAt(0)
                        .toUpperCase() ||
                        '?'}
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-bold text-foreground">
                      Foto de perfil
                    </p>

                    <p className="mt-1 text-[10px] text-muted-foreground">
                      Identidade visual do colecionador
                    </p>

                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setAvatarUrl('')
                        }
                        className="mt-2 text-xs text-primary"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    updateProfileMutation.isPending
                  }
                  className="h-11 rounded-[5px] bg-primary px-7 text-sm font-bold text-primary-foreground disabled:opacity-50"
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
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Alterar senha
              </h2>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Atualize sua senha de acesso à Kurio.
              </p>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="mt-6 max-w-[620px]"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <ProfileField
                    id="current-password"
                    label="Senha atual"
                    type="password"
                    value={
                      currentPassword
                    }
                    required
                    onChange={
                      setCurrentPassword
                    }
                  />
                </div>

                <ProfileField
                  id="new-password"
                  label="Nova senha"
                  type="password"
                  value={newPassword}
                  required
                  onChange={
                    setNewPassword
                  }
                />

                <ProfileField
                  id="confirm-new-password"
                  label="Confirmar nova senha"
                  type="password"
                  value={
                    confirmPassword
                  }
                  required
                  onChange={
                    setConfirmPassword
                  }
                />
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={
                    changePasswordMutation.isPending
                  }
                  className="h-11 rounded-[5px] bg-primary px-7 text-sm font-bold text-primary-foreground disabled:opacity-50"
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
              </div>

              {changePasswordMutation.isError && (
                <p
                  role="alert"
                  className="mt-4 text-sm text-red-500"
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

function ProfileNavigation() {
  return (
    <aside className="h-fit overflow-hidden rounded-[8px] bg-card">
      <div className="hidden border-b border-border px-5 py-4 lg:block">
        <h1 className="text-sm font-bold text-foreground">
          Meu perfil
        </h1>
      </div>

      <nav
        aria-label="Navegação do perfil"
        className="flex overflow-x-auto lg:block"
      >
        <Link
          to="/profile"
          className="block shrink-0 border-b-2 border-primary px-5 py-3 text-xs font-bold text-primary lg:border-b-0 lg:border-l-2"
        >
          Dados do perfil
        </Link>

        <Link
          to="/profile/wallets"
          className={navItemClass}
        >
          Carteiras
        </Link>

        <span className={navItemClass}>
          Atividade
        </span>

        <span className={navItemClass}>
          Lista de interesse
        </span>

        <span className={navItemClass}>
          Ofertas
        </span>

        <span className={navItemClass}>
          Arquivos baixados
        </span>

        <span className={navItemClass}>
          Suporte
        </span>

        <span className="hidden border-t border-border px-5 py-3 text-xs text-muted-foreground lg:block">
          Sair
        </span>
      </nav>
    </aside>
  )
}

const navItemClass =
  'block shrink-0 px-5 py-3 text-xs text-muted-foreground transition-colors hover:text-primary'

interface ProfileFieldProps {
  id: string
  label: string
  value: string
  type?: string
  placeholder?: string
  required?: boolean
  onChange: (
    value: string,
  ) => void
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
        className="mb-2 block text-xs font-medium text-foreground"
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
          onChange(
            event.target.value,
          )
        }
        className="h-11 w-full rounded-[4px] border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
    </div>
  )
}