import { useForm as useRHF, UseFormProps, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodType } from 'zod';

/**
 * Typed useForm wrapper with automatic Zod resolver.
 */
export function useForm<T extends FieldValues>(
  schema: ZodType<T, any, any>,
  options?: Omit<UseFormProps<T>, 'resolver'>
) {
  return useRHF<T>({
    resolver: zodResolver(schema) as any,
    mode: 'onTouched',
    ...options,
  });
}
