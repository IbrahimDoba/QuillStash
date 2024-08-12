import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  json,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { AdapterAccount } from "next-auth/adapters";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);

export const db = drizzle(sql);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("username").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  password: text("password"),
  image: text("image"),
  role: text("role").default("Blogger"),
  bio: text("bio"),
  location: text("location"),
  pronouns: text("pronouns"),
  work: text("work"),
  github: text("github"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});
// Accounts table
export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccount>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: (account.provider, account.providerAccountId),
    })
  );
  
  // Sessions table
  export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  });
  
  // Verification tokens table
  export const verificationTokens = pgTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
      compositePk: (
        verificationToken.identifier,
        verificationToken.token
      ),
    })
  );
  
  // Authenticators table (Optional, based on your need)
  export const authenticators = pgTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: boolean("credentialBackedUp").notNull(),
      transports: text("transports"),
    },
    (authenticator) => ({
      compositePK: (
        authenticator.userId,
        authenticator.credentialID
      ),
    })
  );

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug"),
  title: text("title").notNull(),
  coverImage: text("coverImage"),
  bodyImage: text("bodyImage"), // remove
  body: text("body").notNull(),
  featured: boolean("featured").default(false),
  views: integer("views").default(0),
  tags: json("tags").$type<string[]>(), // Tags are stored as a JSON array
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Join table for post likes
export const postLikes = pgTable("post_likes", {
    postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    primaryKey: (text("post_id"), text("user_id")),
  });
  
  // Join table for post bookmarks
  export const postBookmarks = pgTable("post_bookmarks", {
    postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    primaryKey: (text("post_id"), text("user_id")),
  });
  
  // Comments table
  export const comments = pgTable("comments", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    // Use JSON for storing likes as an array
    likes: json("likes").$type<string[]>(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  });
  
  // Recursive relation for comment replies
  export const commentReplies = pgTable("comment_replies", {
    commentId: text("comment_id").references(() => comments.id, {
      onDelete: "cascade",
    }),
    replyId: text("reply_id").references(() => comments.id, {
      onDelete: "cascade",
    }),
    primaryKey: (text("comment_id"), text("reply_id")),
  });
  
  // Tags table
  export const tags = pgTable("tags", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").unique().notNull(),
  });
  
  // Join table for posts and tags (many-to-many relationship)
  export const postTags = pgTable("post_tags", {
    postId: text("post_id").references(() => posts.id, { onDelete: "cascade" }),
    tagId: text("tag_id").references(() => tags.id, { onDelete: "cascade" }),
    primaryKey: (text("post_id"), text("tag_id")),
  });
