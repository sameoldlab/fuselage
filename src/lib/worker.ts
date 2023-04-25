import type { PostMessage, PostMessageDataRequest } from "$lib/message-types"
import { BskyAgent, type AtpSessionData } from "@atproto/api"
import { writable } from "svelte/store"

const _session = writable<AtpSessionData | null>(null)
onmessage = ({ data: { data, msg } }) => {
  const agent = new BskyAgent({
    service: "https://bsky.social",
    //   persistSession: persistSession,
  })

  console.log(msg, data)

  if (msg === "login") {
    // if (!data.identifier || !data.password) return
    console.debug('logging in')
    login(data.identifier, data.password, agent).then((res) => {
      if (res?.success && res?.data) {
        _session.set(res.data)
        postMessage({ msg: "success", data: res.data })
      } else postMessage({ msg: "error", data: res.error })
    })
  } else {
    const message: PostMessage<PostMessageDataRequest> = {
      msg: "requiem pt.1",
      data: { text: "got a brother in the cut, bring the wood out" },
    }
    return postMessage(message)
  }
}

export const login = async (
  identifier: string,
  password: string,
  agent: BskyAgent
) => {
  try {
    console.log('begin try')
    const { success, data } = await agent.login({
      identifier,
      password,
    })
    if (success) {
      return { success: true, data }
    }
  } catch (error) {
    console.error(error)
    return { success: false, error }
  }
}

export {}
