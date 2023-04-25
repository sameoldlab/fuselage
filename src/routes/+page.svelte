<script lang="ts">
  import { agent, session } from "$lib/atsession"

  export let data
  const feed = data.feed?.feed

  //   console.log(feed[3].reason)

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

  //   console.log(authors)

  /** Filters authors to be displayed */
  let filter = new Set(authors.set) // these are apparently pointers not copies

  function editFilter(handle: string) {
    {
      if (filter.has(handle)) {
        filter.delete(handle)
        filter = filter
      } else {
        filter.add(handle)
        filter = filter
      }
    }
  }

  let filterTitle = ""
  function createFilter() {
    if (filterTitle === "") return
    const filterSet = authors
    authors.push(filterSet)
    // authors.add(filterTitle)
    authors = authors
  }

  /* 
            {uri: 'at://did:plc:mxdlsmrzuki6rzn4nrx6rif3/app.bsky.feed.post/3jtjtfskbez2z', cid: 'bafyreibkkz25ewkyryqtny6avonufums2trrv6um5yusmixhg3hp5my22y', author: {…}, record: {…}, embed: {…}, …}
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
        viewer: {}
            
  */
</script>

<div class="sidepane">
  {#each authors.set as handle}
    <div class="cube">
      <button
        on:click={() => editFilter(handle)}
        class:selected={filter.has(handle)}>{handle}</button
      >
    </div>
  {/each}
  <div>
    <input type="text" bind:value={filterTitle} />
    <button on:click={createFilter}>Save</button>
  </div>
</div>

<main class="container">
  <section class="posts">
    {#if feed}
      <!-- {#each feed as { post, reason, reply }, id} -->
      {#each feed.filter( (d) => filter.has(d.post.author.handle) ) as { post, reason, reply }, id}
        <!-- Only show original posts -->
        {#if true}
          <div class="post">
            <!-- Display parent comment for a reply. Remove !reply above to show -->
            {#if reply}
              ↳{reply.parent.author.displayName}: {reply.parent.record.text}
            {/if}
            <br />
            <br />
            <span class="author">
              <!-- Need to display reposts without adding random strangers to sidebar -->
              {#if reason}
                <svg
                  viewBox="0 0 576 512"
                  height="16"
                  width="16"
                  tabindex="-1"
                  style="margin-right: 4px;"
                  ><path
                    fill="#B9B9C1"
                    d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"
                  /></svg
                >
                {reason.by.displayName} reposted
              {/if}
              {post.author.displayName}
            </span>
            <!-- <span class="handle"> @{post.author.handle}</span> -->
            <p>{post.record.text}</p>
            {#if post.embed?.images}
              {#each post.embed?.images as img}
                <img src={img.thumb} alt={img.alt} />
              {/each}
            {/if}

            <!-- <span class="cid">{post.cid}</span> -->
          </div>
          <!-- <hr /> -->
        {/if}
      {/each}
    {/if}
  </section>
</main>

<style lang="scss">

  .container {
    margin-left: 20vw;
    display: flex;
    padding: 1rem;
  }
  .sidepane {
    position: fixed;
    top: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
      background-color: #75969060 ; //meant to be a test but lowkey vibing
    }
    &:hover {
      cursor: pointer;
      background-color: red; //meant to be a test but lowkey vibing
    }
  }
  //   }

  p {
    font-size: 1.125rem;
    opacity: 0.98;
    padding: 0.25rem 0 1.5rem;
    margin: 0;
  }
  .posts {
    max-width: 65ch;
    margin: auto;
    border-bottom: 1px solid black;
  }
  .post {
    padding-bottom: 1rem;
  }
  .author {
    display: flex;
    flex-direction: row;
  }
  .author,
  .handle {
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 0.85rem;
    opacity: 0.75;
  }
  .handle,
  .cid {
    opacity: 0.35;
  }
  img {
    width: 100%;
    box-sizing: border-box;
    // padding: 1rem;
    // border: 1px solid red;
    // max-height: 50vh;
    overflow: hidden;
    border-radius: 1rem;
    object-fit: cover;
    opacity: 0.6;
  }
</style>
