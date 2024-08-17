import { defineConfig } from "drizzle-kit";
import { cwd } from 'node:process';
import type { Config } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL!,
  },
});