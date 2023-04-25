import type { PageLoad } from "./$types"
import { agent } from "$lib/atsession"
import { error, redirect } from "@sveltejs/kit";
import { get } from 'svelte/store'


export const load = (async (event) => {
    // console.log(event)
    // const json = localStorage.getItem('session')
    // if (!json) return
    // const session = JSON.parse(json)
    // console.log(session)
    const _agent = get(agent)
    // await _agent?.resumeSession(session)

    // if (!_agent) throw redirect(307, '/login')
 /*  const follows = async () => {
    const { success, data } = await agent.getFollows({actor: })
    if (success) return data.follows
  } */
  const feed = () => _agent?.getTimeline({ limit: 50 } )
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
