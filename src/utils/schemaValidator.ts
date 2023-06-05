import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodType } from "zod";

export function validateSchema<T extends ZodType>(formSchema: T) {
  type Schema = typeof formSchema;
  v.b
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(formSchema),
  })
  return {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
  }
}