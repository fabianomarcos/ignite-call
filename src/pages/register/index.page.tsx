import { useEffect } from 'react'
import { ArrowRight } from 'phosphor-react'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'
import { useRouter } from 'next/router'
import { useValidateSchema } from '@/hooks/useSchemaValidator'
import {
  RegisterFormDataType,
  registerFormSchema,
} from '@/utils/schemas/registerSchema'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { Loader } from '@/components/loader'

export default function Register() {
  const { register, handleSubmit, setValue, errors, isSubmitting } =
    useValidateSchema(registerFormSchema as unknown as RegisterFormDataType)

  const router = useRouter()

  useEffect(() => {
    if (router.query.username)
      setValue('username', String(router.query.username))
  }, [router.query?.username, setValue])

  async function handleRegister({ name, username }: RegisterFormDataType) {
    try {
      await api.post('/users', {
        name,
        username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.error(err)
    }
  }

  console.log('isSubmitting: ', isSubmitting)
  return (
    <>
      {isSubmitting && <Loader />}
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="ignite.com/"
              placeholder="seu-usuário"
              {...register('username')}
            />

            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
