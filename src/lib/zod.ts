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

const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '').trim();
};

const requiredEditorString = z.string().refine(
  (val) => {
    const strippedText = stripHtmlTags(val);
    return strippedText.length > 0;
  },
  { message: 'Required' }
);

// Client-side schema
export const clientPostSchema = z.object({
  title: z.string().min(1),
  image: z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "File must be less than 1MB"),
  summary: z.string().nullable(),
  body: requiredEditorString,
  tags: z.array(z.string().min(1)),
});

// Server-side schema (remains the same)
export const serverPostSchema = z.object({
  title: z.string().min(1),
  image: z.string().nullable(),
  summary: z.string().nullable(),
  body: requiredEditorString,
  tags: z.array(z.string().min(1)),
});

export type ClientPostValues = z.infer<typeof clientPostSchema>;
export type ServerPostValues = z.infer<typeof serverPostSchema>;

// comments
export const commentSchema = z.object({
  postId: z.string().uuid(),
  userId: z.string().uuid(),
  body: z.string().min(1, 'You cannot submit an empty comment').max(1000),
});
export type CommentValues = z.infer<typeof commentSchema>;

export const replySchema = z.object({
  commentId: z.string().uuid(),
  userId: z.string().uuid(),
  body: z.string().min(1, 'You cannot submit an empty comment').max(1000),
});
export type ReplyValues = z.infer<typeof replySchema>;

// dont think we need a reply schema since it will be the same as the comment schema
