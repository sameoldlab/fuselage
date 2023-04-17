<script lang="ts">
  //   import { agent, session } from "$lib/atsession"

  export let data
  const feed = data.feed
  console.log(feed[1].reply)
  // let actor = $session ? $session.did : ""
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

<main class="posts">
  {#if feed}
    {#each feed as { post, reason, reply }, id}
      <!-- Only show original posts -->
      {#if !reason && !reply}
        <!-- Display parent comment for a reply. Remove !reply above to show -->
        {#if reply}
          {reply.parent.record.text} - {reply.parent.author.handle}
        {/if}
        <div>
          <p>{post.record.text}</p>
          {#if post.embed?.images}
            {#each post.embed?.images as img}
              <img src={img.thumb} alt={img.alt} />
            {/each}
          {/if}

          <span class="author">{post.author.displayName}</span> -
          <span class="cid">{post.cid}</span>
        </div>
        <hr />
      {/if}
    {/each}
  {/if}
</main>

<style lang="scss">
  :root {
    background-color: #070707;
    color: white;
    font-family: "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
  }
  .posts {
    max-width: 70ch;
    margin: auto;
  }
  .author {

    font-weight: 600;
    opacity: 0.3;
    margin-bottom: 5rem;
  }
  img {
    width: 100%;
    box-sizing: border-box;
    padding: 2rem;
  }
  .cid {
    opacity: 0.3;
  }
</style>
