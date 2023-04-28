<script lang="ts">
  import Login from "./Login.svelte"
  import Feed from "./Feed.svelte"
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs"

  const worker = new Worker(new URL("$lib/worker.ts", import.meta.url), {
    type: "module",
  })

  let session = false
  let initFeed: FeedViewPost[] | undefined

  const onWorkerMessage = ({ data: { msg, data } }: MessageEvent) => {
    if (msg === "attempt") {
      if (data.sucess) {
        console.log("welcome", data)
        session = true
      }
    }
    if (msg === "feed") {
      if (data.success) {
        initFeed = data.feed
        console.log("feed loaded: \n", initFeed)
      }
    } else if (msg === "login") {
      console.log("welcome", data)
      session = true
      const message = { msg: "feed" }
      worker.postMessage(message)
    } else {
      session = false
      console.error(msg, data)
    }
  }
  worker.onmessage = onWorkerMessage
</script>

{#if session}
  {#if initFeed}
    <Feed init={initFeed} {worker} />
  {:else}
    Loading Feed...
  {/if}
{:else}
  <Login {worker} />
{/if}
