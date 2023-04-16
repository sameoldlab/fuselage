import { BskyAgent } from "@atproto/api"
import type { AtpSessionData } from "@atproto/api"
import { writable } from "svelte/store"

// const persistSession: AT.AtpPersistSessionHandler = (_, ses) => {}
export const agent = new BskyAgent({ service: "https://bsky.social" })


export const session = writable<AtpSessionData | null>(null)

// Hoping bluesky figures out auth, before I need to do JWTs. Only way to use till then is fork  and change env variables 
const { success, data } = await agent.login({
  identifier: import.meta.env.VITE_ID,
  password: import.meta.env.VITE_PASSWD,
})

if (success) session.set(data)

