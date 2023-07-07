import { zodResolver } from '@hookform/resolvers/zod'
import {
  DeepPartial,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { ZodType } from 'zod'

export function useValidateSchema<T extends FieldValues>(
  formSchema: T,
  defaultValues?: DeepPartial<T> | undefined,
) {
  type SchemaType = typeof formSchema
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    resolver: zodResolver(formSchema as unknown as ZodType),
    defaultValues: defaultValues && defaultValues,
  })
  return {
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    watch,
    isSubmitting,
  }
}

export type SubmitHandlerType = SubmitHandler<{
  intervals: {
    weekDay: number
    enabled: boolean
    startTime: string
    endTime: string
  }[]
}>
