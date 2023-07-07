import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import {
  ConfirmForm,
  FormActions,
  FormError,
  FormHeader,
  Loader_container,
} from './styles'
import { api } from '@/lib/axios'
import { useValidateSchema } from '@/hooks/useSchemaValidator'
import {
  ConfirmFormDataType,
  confirmFormSchema,
} from '@/utils/schemas/confirmFormDataSchema'
import { Loader } from '@/components/loader'

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const { register, handleSubmit, isSubmitting, errors } = useValidateSchema(
    confirmFormSchema as unknown as ConfirmFormDataType,
  )

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormDataType) {
    const { name, email, observations } = data

    await api.post(`/users/${username}/schedule`, {
      name,
      email,
      observations,
      date: schedulingDate,
    })

    onCancelConfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <>
      {isSubmitting && (
        <Loader_container>
          <Loader />
        </Loader_container>
      )}
      <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
        <FormHeader>
          <Text>
            <CalendarBlank />
            {describedDate}
          </Text>
          <Text>
            <Clock />
            {describedTime}
          </Text>
        </FormHeader>

        <label>
          <Text size="sm">Nome completo</Text>
          <TextInput placeholder="Seu nome" {...register('name')} />
          {errors.name && (
            <FormError size="sm">{errors.name.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Endereço de e-mail</Text>
          <TextInput
            type="email"
            placeholder="johndoe@example.com"
            {...register('email')}
          />
          {errors.email && (
            <FormError size="sm">{errors.email.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Observações</Text>
          <TextArea {...register('observations')} />
        </label>

        <FormActions>
          <Button
            type="button"
            variant="tertiary"
            onClick={onCancelConfirmation}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Confirmar
          </Button>
        </FormActions>
      </ConfirmForm>
    </>
  )
}
