<script lang="ts">
  import { onMount } from "svelte"
  import Login from "./Login.svelte"
  import Feed from "./Feed.svelte"

  let session = false

  let syncWorker: Worker | undefined = undefined
  const onWorkerMessage = ({ data: { msg, data } }: MessageEvent) => {
    if (msg === "attempt") {
      if (data.sucess) {
        console.log("welcome", data)
        session = true
      }
    } else console.error(msg, data)
  }

  const loadWorker = async () => {
    const SyncWorker = await import("$lib/worker?worker")
    syncWorker = new SyncWorker.default()

    syncWorker.onmessage = onWorkerMessage

    const message = {msg: "attempt"}
    syncWorker.postMessage(message)
  }
  onMount(loadWorker)
  $: if(session) {
    console.log("loggedin")
}
    

  async function loadFeed() {
    const message = {msg: "feed"}
    syncWorker?.postMessage(message)
  }
  function handleSession(){
    // loadFeed();
    const message = {msg: "feed"}
    syncWorker?.postMessage(message)
    session = true
  }
</script>

{session}
{#if session}
  <Feed />
{:else}
  <Login on:session={handleSession}/>
{/if}
