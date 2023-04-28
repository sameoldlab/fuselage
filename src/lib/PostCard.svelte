<script lang="ts">
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs"
  import ReplyCard from "$lib/ReplyCard.svelte"
  import RepostCard from "$lib/RepostCard.svelte"
  export let postData: FeedViewPost
  export let id

  /** Toggle to display like, reply, reskeet */
  export let reactions = false

  const { post } = postData
</script>

<div class="post">
  {#if postData.reply}
    <ReplyCard {postData} />
  {:else if postData.reason}
    <RepostCard {postData} />
  {:else}
    <!-- Post Header -->
    <div class="header">
      <span class="author">
        {post.author.displayName}&nbsp;
        <span class="handle">@{post.author.handle}</span>
      </span>
    </div>

    <!-- Post Content -->
    <p>{post.record.text}</p>
    {#if post.embed?.images}
      <div class="media">
        {#each post.embed.images as img}
          <img src={img.thumb} alt={img.alt} />
        {/each}
      </div>
    {/if}

    <!-- <span class="cid">{post.cid}</span> -->
  {/if}
</div>

<style lang="scss">
  p {
    opacity: 0.98;
    padding-bottom: 0.25rem;
    margin: 0;
  }
  .why {
    opacity: 0.7;
    font-size: small;
  }
  .post {
    width: 100%;
    margin: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .author {
    display: flex;
    flex-direction: row;
    opacity: 0.9;
  }
  .author,
  .handle {
    font-weight: 800;
    font-size: 0.85rem;
  }
  .handle,
  .cid {
    opacity: 0.35;
  }

  .media {
    display: flex;
    flex-direction: row;
    // flex-wrap: wrap;
    gap: 4px;
    margin: .5rem 0;
  }
  img {
    box-sizing: border-box;
    // padding: 1rem;
    // border: 1px solid red;
    // max-height: 50vh;
    overflow: hidden;
    border-radius: .25rem;
    object-fit: cover;
    opacity: 0.6;
  }
</style>
