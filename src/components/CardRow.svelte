<script>
  import HearthstoneIcon from "./HearthstoneIcon.svelte";
  export let card;

  let showImage = false;
  let loaded = false;

  let pos = { x: 0, y: 0 };

  let rarityColors = {
    FREE: "text-black",
    COMMON: "text-yellow-500",
    RARE: "text-blue-400",
    EPIC: "text-purple-600",
    LEGENDARY: "text-orange-600"
  };

  $: colorClass = rarityColors[card.rarity];
</script>

<style lang="postcss">
  a:hover {
    @apply underline;
  }

  li {
    @apply my-2;
  }
</style>

<li class="font-bold flex flex-row items-center max-w-xs">
  <div class="flex-1 pr-3">
    <span>{card.quantity}x&nbsp;</span>
    <a
      on:mouseover={() => {
        showImage = true;
        loaded = true;
      }}
      on:mouseout={() => (showImage = false)}
      on:mousemove={event => {
        pos.x = event.clientX;
        pos.y = event.clientY;
      }}
      class="{colorClass} flex-1 pr-3"
      href="https://s3.wasabisys.com/hearthstone/{card.dbfId}.png"
      alt="this is a link"
      target="_blank">
      {card.name}
    </a>
  </div>
  <span class="flex items-center">
    <span class="pr-1">{card.cost}</span>
    <HearthstoneIcon
      name="mana-crystal"
      classes="inline-block w-4 h-4 fill-current text-indigo-600" />
  </span>

  {#if loaded}
    <div
      class="absolute"
      class:invisible={!showImage}
      style="top: {pos.y - 32}px; left: {pos.x + 93}px">
      <svg
        xmlns:svg="http://www.w3.org/2000/svg"
        width="64px"
        height="64px"
        viewBox="0 0 128 128"
        xml:space="preserve">
        <g>
          <path
            d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0
            30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8
            48.05v-.02a11.38 11.38 0 0 1-2.93.37z"
            fill="#000000"
            fill-opacity="1" />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="1200ms"
            repeatCount="indefinite" />
        </g>
      </svg>
    </div>
    <div
      class="absolute"
      class:invisible={!showImage}
      style="top: {pos.y - 170}px; left: {pos.x + 20}px">
      <!-- <p>X: {pos.x}, Y: {pos.y}</p> -->
      <img
        width="250px"
        src="https://s3.wasabisys.com/hearthstone/{card.dbfId}.png"
        alt={card.name} />
    </div>
  {/if}
</li>
