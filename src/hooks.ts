import type { Handle } from '@sveltejs/kit'
import { BskyAgent } from '@atproto/api'

export const handle: Handle = async ({ event, resolve }) => {
    
    const accessToken = event.cookies.get('session')
    console.log(accessToken)
    if(!accessToken)     return await resolve(event)
    const agent = new BskyAgent({service: "https://bsky.social"})
    
    const {success, data} = await agent.getAuthorFeed({}, accessToken)
    if (success) {
        event.locals.user = {
            did: data.did,
            handle: data.handle
        }
        event.locals.agent = agent
    }
    
    return await resolve(event)

}