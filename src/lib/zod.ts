import { nullable, object, string, z } from 'zod';

export const signInSchema = object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type AuthFormData = z.infer<typeof signInSchema>;

export const userProfileSchema = object({
  username: z.string(),
  name: z.string(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().email(),
  github: z.string().url().nullable(),
  pronouns: z.string().nullable(),
  work: z.string().nullable(),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
