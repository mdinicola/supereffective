import { z } from 'zod'

export const IDSchema = z.string().regex(/^[a-zA-Z0-9]{5,100}$/)
export const UserNameSchema = z
  .string()
  .min(4)
  .max(16)
  .regex(/^[a-zA-Z0-9_]{4,16}$/)
export const EmailSchema = z.string().email()
export const isValidID = (id: any): boolean => {
  return IDSchema.safeParse(id).success
}

// export type IDField = z.infer<typeof IDSchema>

export const UserCreatedTitleSchema = z.string().min(1).max(100)
export const UserCreatedDescriptionSchema = z.string().min(1).max(1000)

export const UserCreatedPostSchema = z.string().refine(content => {
  const words = content.split(' ')
  return words.length <= 500 && content.length <= 10000
})
