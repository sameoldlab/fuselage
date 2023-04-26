<script lang="ts">
</script>

<slot />
<svelte:head>
    <title>Fuselage</title>
</svelte:head>
<style lang="scss">
  :root {
    --text: white;
    --bg: #0f0f0f;

    background-color: var(--bg);
    color: var(--text);
    font-family: "Fira Sans", Ubuntu, "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
  }
  @media (prefers-color-scheme: light) {
    :root {
      --bg: #ecdbc7;
      --text: rgba(0, 0, 0, 0.95);
    }
  }
</style>
