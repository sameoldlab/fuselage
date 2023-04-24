import type { PageLoad } from "./$types"
import { agent } from "$lib/atsession"
import { error } from "@sveltejs/kit";

export const load = (async () => {
 /*  const follows = async () => {
    const { success, data } = await agent.getFollows({actor: })
    if (success) return data.follows
  } */
  const feed = () => agent.getTimeline({ limit: 50 })
    .then(res => {
        if(!res.success) throw error(402, 'fdfaf')
        return {...res.data}
    })
    .catch(err => console.error("failed to retreive timeline", err));
  
  return {
    // follows: follows(),
    feed: feed()
  }
}) satisfies PageLoad
