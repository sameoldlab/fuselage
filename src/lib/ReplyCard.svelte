<script lang="ts">
    import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs"
    export let postData: FeedViewPost
  
    /** Toggle to display like, reply, reskeet */
    export let reactions = false
  
    const { post, reply } = postData
  </script>
  
    <!-- Display parent comment for a reply. Remove !reply above to show -->
  
    <span class="author">
      <!-- Need to display reposts without adding random strangers to sidebar -->

      {post.author.displayName}&nbsp;<span class="handle">
        @{post.author.handle}</span
      >
    </span>
      <!-- {reply.parent.record.text} -->
      <span class="why">Repling to {reply.parent.author.displayName}</span>
    <p>
        {post.record.text}</p>
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
  