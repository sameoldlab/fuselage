<script lang="ts">
  import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs"
  export let postData: FeedViewPost

  /** Toggle to display like, reply, reskeet */
  export let reactions = false

  const { post, reason, reply } = postData
</script>

<!-- Display parent comment for a reply. Remove !reply above to show -->

<span class="author">
  <!-- Need to display reposts without adding random strangers to sidebar -->
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
  {post.author.displayName}&nbsp;<span class="handle">
    @{post.author.handle}</span
  >
</span>
{#if reply}
  <!-- {reply.parent.record.text} -->
  <span class="why">Repling to {reply.parent.author.displayName}</span>
{/if}
<p>{post.record.text}</p>
{#if post.embed?.images}
  {#each post.embed.images as img}
    <img src={img.thumb} alt={img.alt} />
  {/each}
{/if}

<!-- <span class="cid">{post.cid}</span> -->

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
