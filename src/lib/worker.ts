import { BskyAgent, type AtpSessionData } from "@atproto/api"

let _session: AtpSessionData | undefined
const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (_, sess) => {
    _session = sess
  },
})

onmessage = async ({ data: { data, msg } }) => {
  console.debug("Incoming request: ", msg)

  /*
    To login to different services:
    need to set agent service 
    if(!_session || msg !== 'login) return
    if !session or msg !== login RETURN
        just use var???
    if (result == success) create _session 
    
    POST result

    if (_session) {
        everything else
    }



  */
  switch (msg) {
    case "attempt":
      // Attempt to login from saved data
      // TODO: impl localdb
      if (_session) {
        console.log("Logged In")
        postMessage({
          msg,
          data: { success: true, handle: _session.handle },
        })
      } else {
        postMessage({
          msg,
          data: { success: false },
        })
      }
      break

    case "login":
      login(data.identifier, data.password)
        .then(async (data) => {
          postMessage({
            msg,
            data: { success: true, handle: data?.handle },
          })
        })
        .catch((error) => postMessage({ msg: "error", data: error }))
      break

    case "check":
      break

    case "feed":
      console.debug("fetching timeline")
      getFeed()
        .then((res) => {
          console.log("Return: ", res)
          postMessage({
            msg,
            data: {
              success: true,
              feed: res.feed,
              cursor: res.cursor,
            },
          })
        })
        .catch((error) => {
          console.log(error)
          postMessage({
            msg,
            data: {
              success: false,
              error,
            },
          })
        })

      break

    case "refresh":
      break

    default:
      break
  }
}

function getFeed() {
  return agent.getTimeline({ limit: 50 }).then((res) => {
    console.log("returning data timeline")
    return { ...res.data }
  })
}

async function login(identifier: string, password: string) {
  // try {
  const res = await agent.login({
    identifier,
    password,
  })
  if (res.success) {
    return res.data
  }
}

export {}
