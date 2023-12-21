import { z } from 'zod'

const createUserFullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Name must start with a capital letter',
    }),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Name must start with a capital letter',
    }),
})

const createUserAddressValidationSchema = z.object({
  string: z.string(),
  city: z.string(),
  country: z.string(),
})

export const createUserValidationSchema = z.object({
  body: z.object({
    userName: z.string(),
    email: z.string().email(),
    password: z.string(),
    fullName: createUserFullNameValidationSchema,
    bio: z.string().optional(),
    dob: z.string().optional(),
    profileImg: z.string().optional(),
    gender: z.string(),
    contactNo: z.string(),
    address: createUserAddressValidationSchema.optional(),
  }),
})

const updateUserFullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Name must start with a capital letter',
    })
    .optional(),
  lastName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Name must start with a capital letter',
    })
    .optional(),
})

const updateUserAddressValidationSchema = z.object({
  string: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
})

export const updateUserValidationSchema = z.object({
  body: z.object({
    fullName: updateUserFullNameValidationSchema,
    bio: z.string().optional(),
    dob: z.string().optional(),
    profileImg: z.string().optional(),
    gender: z.string().optional(),
    contactNo: z.string().optional(),
    address: updateUserAddressValidationSchema.optional(),
  }),
})
