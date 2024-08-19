import {
  boolean,
  timestamp,
  pgTable,
  text,
  integer,
  primaryKey,
  json,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

// Accounts table
export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// Sessions table
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// user table
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text('username').unique(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  password: text('password'),
  image: text('image'),
  role: text('role').default('Blogger'),
  bio: text('bio'),
  location: text('location'),
  pronouns: text('pronouns'),
  work: text('work'),
  github: text('github'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
export type User = InferSelectModel<typeof users>; // export a type for the posts table just incase

// user relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));


// Posts table
export const posts = pgTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  coverImage: text('coverImage'),
  summary: text('summary'), // for seo purposes we fit use ai generate am later user doesnt need to care about this
  body: text('body').notNull(),
  featured: boolean('featured').default(false).notNull(),
  views: integer('views').default(0).notNull(),
  tags: json('tags').$type<string[]>().notNull(), // Tags are stored as a JSON array
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
export type Post = InferSelectModel<typeof posts>; // export a type for the posts table just incase

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  likes: many(likes), // Relation to the postLikes table
  bookmarks: many(bookmarks), // Relation to the postBookmarks table
  tags: many(tags),
  // tags: many(tags, {
  //   through: postTags,
  //   fields: [posts.id],
  //   references: [postTags.postId],
  // }),
}));

// Post Likes Table
export const likes = pgTable(
  'likes',
  {
    postId: text('post_id')
      .references(() => posts.id, { onDelete: 'cascade' })
      .notNull(),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({columns: [table.postId, table.userId]}),
  })
);

// Post Likes Relations
export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));

// Post Bookmarks Table
export const bookmarks = pgTable(
  'bookmarks',
  {
    postId: text('post_id')
      .references(() => posts.id, { onDelete: 'cascade' })
      .notNull(),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({columns: [table.postId, table.userId]}),
  })
);

// Post Bookmarks Relations
export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  post: one(posts, {
    fields: [bookmarks.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));

// Comments table
export const comments = pgTable('comments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  body: text('body').notNull(),
  postId: text('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});
export type Comment = InferSelectModel<typeof comments>;

// Comments relations
export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  replies: many(replies),
}));

// Replies table
export const replies = pgTable('replies', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
  body: text('body').notNull(),
  commentId: text('comment_id')
    .notNull()
    .references(() => comments.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});
export type Reply = InferSelectModel<typeof replies>;

export const repliesRelations = relations(replies, ({ one }) => ({
  user: one(users, {
    fields: [replies.userId],
    references: [users.id],
  }),
  parentComment: one(comments, {
    fields: [replies.commentId],
    references: [comments.id],
  }),
}));

// Tags table
export const tags = pgTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
});

// join table for post and tags
export const postTags = pgTable('post_tags', {
  postId: text('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  tagId: text('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.postId, table.tagId] }),
}));

// Relations for Tags
export const tagsRelations = relations(tags, ({ many }) => ({
  // posts: many(posts, {
  //   through: postTags,
  //   fields: [tags.id],
  //   references: [postTags.tagId],
  // }),
  posts: many(posts),
}));