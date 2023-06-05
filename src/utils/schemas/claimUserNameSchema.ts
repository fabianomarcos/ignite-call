import { z } from "zod"

export type ClaimUsernameFormDataType = z.infer<typeof claimUsernameFormData>

export const claimUsernameFormData = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
})
