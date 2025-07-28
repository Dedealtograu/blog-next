'use server'

import { verifyPassword } from '@/lib/login/manage-login'
import { asyncDelay } from '@/utils/async-delay'

type loginActionState = {
  username: string
  error: string
}

export async function loginAction(state: loginActionState, formData: FormData) {
  await asyncDelay(5000)

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    }
  }

  const username = formData.get('username')?.toString().trim() || ''
  const password = formData.get('password')?.toString().trim() || ''

  if (!username || !password) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    }
  }

  const isUsernameValid = username === process.env.LOGIN_USER
  const isPasswordValid = await verifyPassword(password, process.env.LOGIN_PASSWORD || '')

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    }
  }

  return {
    username,
    error: 'Usuário logado com sucesso!',
  }
}
