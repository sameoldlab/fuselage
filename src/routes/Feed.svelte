<script lang="ts">
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs"
  import PostCard from "$lib/PostCard.svelte"
  import { onDestroy } from "svelte"

  export let worker: Worker
  export let init

  let feed = init as FeedViewPost[]
  console.log(feed)
  let cursor: string

  worker.onmessage = ({ data: { msg, data } }) => {
    if (msg !== "feed") console.error(data)
    if (data.success && cursor !== data.cursor) {
      cursor = data.cursor
      feed = data.feed
      // Append new posts where unique
      // data.feed.forEach()
      console.log("feed refreshed: \n", data.feed)
    }
  }

  const clear = setInterval(() => {
    console.debug("Requesting update")
    worker.postMessage({ msg: "feed" })
  }, 1000 * 600)

  onDestroy(() => clearInterval(clear))

  /**
   * Handles of all followed authors on my skyline
   */
  let authors = {
    name: "default",
    set: [
      ...new Set(
        feed
          ?.filter((data) => !data.reason)
          .map((data) => data.post.author.handle)
      ),
    ],
  }

  /** Filters authors to be displayed */
  let filter = new Set(authors.set) // these are apparently pointers not copies

  console.log("Power user? Use Ctrl to get a single user")
  function editFilter(handle: string, event: MouseEvent) {
    {
      if (event.altKey) {
        console.log("alt", handle)
        console.log(filter)
        // filter = filter
      }
      if (event.ctrlKey) {
        console.log("ctrl")
        filter.clear()
        filter.add(handle)
      }
      if (event.shiftKey) {
        console.log("shift")
      }
      // comment
      else if (filter.has(handle)) {
        filter.delete(handle)
        // filter = filter
      } else {
        filter.add(handle)
      }

      console.log(filter)
      filter = filter
    }
  }

  let filterTitle = ""
  let cabin = [authors]
  function createFilter() {
    if (filterTitle === "") return
    cabin = [...cabin, { set: [...filter], name: filterTitle }]
  }

  $: filteredFeed = feed.filter(
    (d) => filter.has(d.post.author.handle) || filter.has(d.reason?.by.handle)
  )
  /* 
              [{uri: 'at://did:plc:mxdlsmrzuki6rzn4nrx6rif3/app.bsky.feed.post/3jtjtfskbez2z', cid: 'bafyreibkkz25ewkyryqtny6avonufums2trrv6um5yusmixhg3hp5my22y', author: {…}, record: {…}, embed: {…}, …}
          author:
              avatar: "https://cdn.bsky.social/imgproxy/WjtT9VDnd0hpav82l5RK1cSnLfgbQiWlpPmgmCRWZ4Y/rs:fill:1000:1000:1:0/plain/bafkreiffuomnrxcostqe7mzdl66lekqgwoq2vjcks6x3f2dtvkogsyfh4q@jpeg"
              did: "did:plc:mxdlsmrzuki6rzn4nrx6rif3"
              displayName: "Brendon Luke Jaramillo"
              handle: "blj.bsky.social"
              labels: Array(0)
              length: 0
              [[Prototype]]: Array(0)
              viewer:
              followedBy: "at://did:plc:mxdlsmrzuki6rzn4nrx6rif3/app.bsky.graph.follow/3jtg4ikxerr25"
              following: "at://did:plc:ukgwapa3bceculh4cobcopg3/app.bsky.graph.follow/3jtglprcwzp2t"
              muted: false
          cid: "bafyreibkkz25ewkyryqtny6avonufums2trrv6um5yusmixhg3hp5my22y"
          embed:
              $type: "app.bsky.embed.images#view"
              images: Array(1)
              0: {thumb: 'https://cdn.bsky.social/imgproxy/WK5cn0wAVS3nH7FZy…6syfki4wlzwfx4cltzt44h2ab55jn3q43s2nlvbftwg4@jpeg', fullsize: 'https://cdn.bsky.social/imgproxy/6lAglu9W2ZIYnTcMn…6syfki4wlzwfx4cltzt44h2ab55jn3q43s2nlvbftwg4@jpeg', alt: ''}
              length: 1
          indexedAt: "2023-04-17T01:45:13.287Z"
          labels: Array(0)
              length: 0
          likeCount: 3
          record:
              $type: "app.bsky.feed.post"
              createdAt: "2023-04-17T01:45:13.114Z"
              embed: {
                  $type: 'app.bsky.embed.images',
                   images: Array(1)
                  }
              text: "What’s your favorite food? 🍜 \nAt your favorite restaurant? 🏯\nIn your favorite city? 🏙️ \nShow me yours, here’s mine! 🤤 \n\n- Vegan Ethiopian Plate\n- Desta\n- Atlanta, GA USA"
              [[Prototype]]: Object
          replyCount: 0
          repostCount: 0
          uri: "at://did:plc:mxdlsmrzuki6rzn4nrx6rif3/app.bsky.feed.post/3jtjtfskbez2z"
          viewer: {}]
              
    */
</script>

<div class="container">
  <div class="side-container">
    <div class="sidepane">
      <div class="side-section">
        Groups:
        mutuals???
        team???
        <form on:submit|preventDefault={createFilter}>
          <input type="text" bind:value={filterTitle} />
          <button placeholder="new group">Save</button>
        </form>
        {#each cabin as { name, set }}
          <div class="cube">
            <button
              on:click={() => {
                filter = new Set(set)
                console.log("Filter: ", filter)
                console.log("Feed", feed)
                console.log("Filtered", filteredFeed)
              }}
              class:selected={false}>{name}</button
            >
          </div>
        {:else}
          <div />
        {/each}
      </div>
      {#each { length: 19 } as v}
        <div class="cube"></div>
      {/each}
      <div class="side-section">
        Recent:
        {#each authors.set as handle}
          <div class="cube">
            <button
              on:click={(e) => {
                editFilter(handle, e)
              }}
              class:selected={filter.has(handle)}>{handle}</button
            >
          </div>
        {/each}
      </div>
    </div>
  </div>

  <main>
    <section class="posts">
      <!-- {#each feed as { post, reason, reply }, id} -->
      {#each filteredFeed as postData, i}
        <PostCard {postData} id={postData.post.cid} />
      {/each}
    </section>
  </main>
</div>

<style lang="scss">
  .container {
    // display: flex;
    position: relative;
  }
  main {
    margin-left: 25vw;
    display: flex;
    padding: 1rem;
    flex-grow: 1;
  }
  .side-container {
    position: sticky;
  }
  .sidepane {
    box-sizing: border-box;
    background: #181818;
    max-width: 300px;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    left: 0;
  }
  .sidepane::-webkit-scrollbar {
    display: none;
  }
  //   .cube {
  button {
    opacity: 0.7;
    padding: 0.25rem 0.5rem;
    border: none;
    color: var(--text);
    background: var(--bg);
    font-size: 1rem;
    border-radius: 4px;

    &.selected {
      opacity: 1;
      font-weight: 600;
      background-color: #75969060; //meant to be a test but lowkey vibing
    }
    &:hover {
      cursor: pointer;
      background-color: red; //meant to be a test but lowkey vibing
    }
  }
  .posts {
    margin-left: 8vw;
    max-width: 65ch;
    border-bottom: 1px solid black;
  }
  //   }
  .side-section {
    border-bottom: 2px solid rgb(255, 255, 255, 0.2);
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
