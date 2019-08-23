<script>
	export let name
	export let classes
</script>

<svg xmlns="http://www.w3.org/2000/svg" class={classes}>
	<use xlink:href="/assets/{name}.svg#{name}" />
</svg>
