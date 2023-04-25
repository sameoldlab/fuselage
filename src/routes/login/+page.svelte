<script lang="ts">
  import type { ActionData } from "./$types"
  import { enhance } from "$app/forms"
  import { onMount } from "svelte"
  import type {
    PostMessage,
    PostMessageDataRequest,
    PostMessageDataResponse,
  } from "$lib/message-types"

  let syncWorker: Worker | undefined = undefined

  const onWorkerMessage = ({
    data: { msg, data },
  }: MessageEvent<PostMessage<PostMessageDataResponse>>) => {
    console.log(msg, data)
  }

  const loadWorker = async () => {
    const SyncWorker = await import("$lib/worker?worker")
    syncWorker = new SyncWorker.default()

    syncWorker.onmessage = onWorkerMessage

    const message: PostMessage<PostMessageDataRequest> = {
      msg: "requiem pt.1",
      data: { text: "Wher da hood, where da hood, where da hood at?" },
    }
    syncWorker.postMessage(message)
  }

  onMount(loadWorker)

  export let form: ActionData
  let service: string,
    handle: string,
    password = "",
    loggingIn = false
</script>

{#if loggingIn}
  <p>Logging in...</p>
{:else}
  <div class="container">
    <p id="photocred">
      <!-- Who tryna get sublicenced?? 👉👈 pls contact ibro.xyz on bsky -->
      Photo by
      <a
        href="https://unsplash.com/@pueblovista?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
      >
        Paul Pastourmatzis
      </a>
    </p>

    <main>
      <h1>Log in</h1>
      <form class="login" method="POST" use:enhance>
        <!-- Would need to rewrite to actually support service currently. This is a bug. -->
        <!-- <p>
            Service
            <input type="text" bind:value={service} />
          </p> -->

        <label>
          Handle
          <input
            type="text"
            name="handle"
            bind:value={handle}
            placeholder="example.bsky.social"
            required
          /></label
        ><br />

        <label>
          Password
          <input
            name="password"
            type="password"
            bind:value={password}
            required
          /></label
        ><br />

        <button>Log In</button>

        <p>
          Use an <a
            href="https://github.com/bluesky-social/atproto-ecosystem/blob/main/app-passwords.md"
            >app password</a
          > to keep your account safe
        </p>
      </form>
      <button on:click={()=>{syncWorker?.postMessage({msg: 'login', data: {identifier: handle, password}})}}>Send to worker</button>
      <!-- {#if form?.success} Success {/if} -->
      {#if form?.missing} Please complete all fields {/if}
      {#if form?.invalid} Invalid username or password {/if}
    </main>
  </div>
{/if}

<style lang="scss">
  .container {
    height: 100vh;
    min-height: -webkit-fill-available;
    display: flex;
    background: url("login-bg.jpg") center center no-repeat;
    background-size: cover;
  }
  main {
    border-radius: 0.75rem;
    padding: 3rem;
    margin: 3vmin;
    flex-grow: grow;
    background: var(--bg);
    width: clamp(35vw, 500px, 95vw);
  }
  .login {
    --b-radius: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1vh;

    button {
      font-size: 1.125rem;
      font-weight: 600;
      padding: 0.5rem;
      border-radius: var(--b-radius);
      border: none;
      width: 100%;
    }
    label {
      font-weight: 600;
    }
    input:not([type="checkbox"]) {
      color: inherit;
      margin-top: 0.5vh;
      background: inherit;
      border-radius: var(--b-radius);
      border: 1px solid #74747477;
      width: 100%;
      padding: 0.5rem 1rem;
      box-sizing: border-box;
    }
  }
  #photocred {
    position: absolute;
    bottom: 0;
    left: 1rem;
    opacity: 0.4;
    a {
      color: var(--text);
    }
  }
</style>
