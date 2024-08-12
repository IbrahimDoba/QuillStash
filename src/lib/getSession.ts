import { auth } from "@/auth";
import { cache } from "react";

export default cache(auth); // cache the auth object to prevent dublicate database calls across components
// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#fetching-data-where-its-needed