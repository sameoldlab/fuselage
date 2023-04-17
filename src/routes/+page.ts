import type { PageLoad } from "./$types"
import { agent } from "$lib/atsession"

export const load = (async () => {
  // Validate session
  if (!agent.hasSession) return

 /*  const follows = async () => {
    const { success, data } = await agent.getFollows({actor: })
    if (success) return data.follows
  } */
  const feed = async () => {
    const res = await agent.getTimeline({ limit: 50 })
    if (res.success) {
        return res.data.feed
    } else {
        throw res.success
    }
  }
  return {
    // follows: follows(),
    feed: feed()
  }
}) satisfies PageLoad
