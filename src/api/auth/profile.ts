import {z} from 'zod'
import {AxiosError} from 'axios'

import {instance} from '@/api'

export const profileShema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  favorites: z.array(z.string()),
})

export type profileType = z.infer<typeof profileShema>

export async function getProfile(): Promise<profileType | null> {
  try {
    const response = await instance.get(`/profile`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(`Ошибка: ${error.response?.status || 'Неизвестная ошибка'}`)
      throw new Error()
    } else {
      console.error('Неизвестная ошибка при получении профиля')
    }
    return null
  }
}
