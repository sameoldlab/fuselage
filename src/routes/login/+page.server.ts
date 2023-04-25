import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData()
    const handle = data.get("handle")
    const password = data.get("password")

    let syncWorker: Worker | undefined = undefined

    const onWorkerMessage = ({
      data: { msg, data },
    }: MessageEvent) => {
      console.log(msg, data)
    }
  
    const loadWorker = async () => {
      const SyncWorker = await import("$lib/worker?worker")
      syncWorker = new SyncWorker.default()
  
      syncWorker.onmessage = onWorkerMessage
  
      const message = {
        msg: "login",
        data: { identifier: handle, password },
      }
      syncWorker.postMessage(message)
    }

    
    // invalid or missing input
    if (!handle || !password) return fail(400, { missing: true })
    if (typeof handle !== "string" || typeof password !== "string") {
        return fail(400, { handle, invalid: true })
    }
    
    // Username or password incorrect
    if (typeof handle !== typeof "string") return
    await loadWorker()
    // if (!res?.success) return fail(400, { handle, invalid: true })

    // console.log(res.data)
    // cookies.set('session', `${res.data?.accessJwt}`, {
    //     path: '/',
    //     httpOnly: true,
    //     sameSite: 'strict', 
    //     secure: process.env.NODE_ENV === 'production',
    //     // expires on browser close when `expires` and max-age` not set
    // })
    // throw redirect(303, "/")
    return fail(400, {handle, invalid: true})
  },
} satisfies Actions

export const load = (async ({ cookies }) => {
  //   const user = await db.getUserFromSession(cookies.get("sessionid"))
  //   return { user }
}) satisfies PageServerLoad
