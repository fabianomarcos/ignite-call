import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'

import { Button, Text, TextInput } from '@ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { useValidateSchema } from '@/hooks/useSchemaValidator'
import {
  ClaimUsernameFormDataType,
  claimUsernameFormData,
} from '@/utils/schemas/claimUserNameSchema'

export function ClaimUsernameForm() {
  const { register, handleSubmit, errors, isSubmitting } = useValidateSchema(
    claimUsernameFormData as unknown as ClaimUsernameFormDataType,
  )

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
