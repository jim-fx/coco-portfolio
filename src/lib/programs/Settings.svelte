<script lang="ts">
	import { settings } from '$lib/data';
</script>

<select bind:value={$settings.wallpaper}>
	<option value="clouds.jpg">clouds</option>
	<option value="tiled-bricks.png">bricks</option>
	<option value="tiled-bubbles.png">bubbles</option>
	<option value="tiled-stones.png">stones</option>
</select>
