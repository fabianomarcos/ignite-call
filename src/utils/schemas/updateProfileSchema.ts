import { z } from 'zod'

export const updateProfileSchema = z.object({
  bio: z.string(),
})

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>
