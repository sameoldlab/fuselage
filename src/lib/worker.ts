import { BskyAgent, type AtpSessionData } from "@atproto/api"
let sessionCache: AtpSessionData | undefined

const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (_, sess) => {
    if (sess) sessionCache = sess
  },
})

onmessage = ({ data: { data, msg } }) => {
  console.debug("Incoming msg: ", msg, data)

  switch (msg) {
    case "attempt":
      // Attempt to login from saved data
      if (sessionCache) {
        console.log('Logged In')
        postMessage({
          msg,
          data: { success: true, handle: sessionCache.handle },
        })
      } else {
        postMessage({
          msg,
          data: { success: false },
        })
      }
      break

    case "login":
      login(data.identifier, data.password, agent)
        .then(async (data) => {
          sessionCache = data
          console.log("welcome: ", data.handle)

          postMessage({
            msg,
            data: { success: true, handle: sessionCache?.handle },
          })
        })
        .catch((error) => postMessage({ msg: "error", data: error }))
      break

    case "check":
      false
      break

    case "feed":
      break

    case "refresh":
      break

    default:
      break
  }

  function getFeed() {
    return agent
      .getTimeline({ limit: 50 })
      .then((res) => {
        return { ...res.data }
      })
      .catch((err) => console.error("failed to retreive timeline", err))
  }
}

async function login(identifier: string, password: string, agent: BskyAgent) {
  // try {
  const res = await agent.login({
    identifier,
    password,
  })
  if (res.success) {
    return res.data
  }
  throw new Error("failure")
  /*} catch (error) {
      console.error(error)
      return error
    }*/
}

export {}
