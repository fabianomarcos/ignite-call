import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { validateSchema } from '@/utils/schemaValidator'
import {
  ClaimUsernameFormDataType,
  claimUsernameFormData,
} from '@/utils/schemas/claimUserNameSchema'

export function ClaimUsernameForm() {
  const { register, handleSubmit, errors, isSubmitting } =
    validateSchema<ClaimUsernameFormDataType>(claimUsernameFormData)

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormDataType) {
    const { username } = data
    router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="ignite.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
