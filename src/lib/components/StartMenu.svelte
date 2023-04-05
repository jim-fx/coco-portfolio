<div class="start-menu window">
	<div class="blue">
		<div>coco-portfolio</div>
	</div>
	<div class="content" />
</div>

<style>
	.start-menu {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 300px;
		height: 400px;
		z-index: 9999;
		display: grid;
		grid-template-columns: 30px 1fr;
	}

	.blue {
		background: linear-gradient(0deg, navy, #1084d0);
	}

	.blue > div {
		width: 300px;
		position: absolute;
		bottom: 158px;
		transform: rotate(-90deg);
		left: -132px;
		color: white;
		font-size: 1.7em;
	}
</style>
