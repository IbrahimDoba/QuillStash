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
  image: z.string().nullable(),
  website: z.string().url({ message: 'Please enter a valid URL' }).nullable(),
  socials: z
    .array(
      z.object({
        link: z
          .string()
          .url({ message: 'Please enter a valid URL' })
          .or(z.literal(''))
          .transform((val) => (val === '' ? null : val)),
      })
    )
    .max(5)
    .nullable(),
  pronouns: z.string().nullable(),
  work: z.string().nullable(),
});

export const serverUserProfileSchema = object({
  username: z.string(),
  name: z.string(),
  image: z.string().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  website: z.string().url({ message: 'Please enter a valid URL' }).nullable(),
  socials: z
    .array(z.string().url({ message: 'Please enter a valid URL' }))
    .max(5)
    .nullable(),
  pronouns: z.string().nullable(),
  work: z.string().nullable(),
});

export type ServerUserProfileFormData = z.infer<typeof serverUserProfileSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;

export const userAccountSchema = object({
  name: z.string(),
  location: z.string().nullable(),
  website: z.string().url({ message: 'Please enter a valid URL' }).nullable(),
  socials: z
    .array(z.string().url({ message: 'Please enter a valid URL' }))
    .max(5)
    .nullable(),
  pronouns: z.string().nullable(),
  work: z.string().nullable(),
  email: z.string({ required_error: 'Email is required' }).min(1, 'Email is required').email('Invalid email'),
});
export type UserAccountValues = z.infer<typeof userAccountSchema>;

const stripHtmlTags = (html: string) => {
  return html.replace(/<[^>]*>/g, '').trim();
};

const requiredEditorString = z.string({required_error: "You forgot to write your awesome story..."}).refine(
  (val) => {
    const strippedText = stripHtmlTags(val);
    return strippedText.length > 0;
  },
  { message: 'You have not written anything yet.' }
);

export const postSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(100, 'Title is too long'),
  coverImage: z.string().url().nullable().optional(),
  summary: z.string().nullable().optional(),
  body: requiredEditorString,
  tags: z.array(z.string().min(1)).min(1, 'At least one tag is required'),
});

export type PostValues = z.infer<typeof postSchema>;

export const draftSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title is too long')
    .nullable(),
  coverImage: z.string().nullable().optional(),
  summary: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  tags: z.array(z.string().min(1)).nullable().optional(),
});

export type DraftValues = z.infer<typeof draftSchema>;

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

export const confirmSchema = z.object({
  username: z
  .string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message: "Username can only contain letters, numbers, hyphens, and underscores. No spaces allowed.",
  }),
  name: z.string().optional(),
});
export type ConfirmValues = z.infer<typeof confirmSchema>;
