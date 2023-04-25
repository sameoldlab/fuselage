// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { BskyAgent } from "@atproto/api"
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: {
        did: string
        handle: string
      }
      agent: BskyAgent
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {}
