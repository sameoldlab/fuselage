import { BskyAgent } from "@atproto/api"
import type { AtpSessionData, AtpPersistSessionHandler } from "@atproto/api"
import { writable } from "svelte/store"
export const ssr = false 
export const agent = writable<BskyAgent | null>(null)

const persistSession: AtpPersistSessionHandler = (_, sess) =>
  localStorage.setItem("BskySession", JSON.stringify(sess))

export const session = writable<AtpSessionData | null>(null)

// :D
export const login = async (
  identifier: string,
  password: string,
) => {
  const _agent = new BskyAgent({
    service: "https://bsky.social",
    persistSession: persistSession,
  })
  try {
    const { success, data } = await _agent.login({
      identifier,
      password,
    })
    if (success) {
      agent.set(_agent)
      return { success: true, data }
    }
  } catch (error) {
    console.error(error)
    return { success: false, error}
  }
}
