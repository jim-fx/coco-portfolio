<script lang="ts">
	const thiccness = 7;

	export let direction: string;
	export let width: number;
	export let height: number;

	export let minHeight = 200;
	export let minWidth = 400;

	$: if (height) {
		height = Math.max(height, minHeight);
	}
	$: if (width) {
		width = Math.max(width, minWidth);
	}

	export let x: number;
	export let y: number;

	$: scaleTop = direction.includes('top');
	$: scaleLeft = direction.includes('left');
	$: scaleY = direction.includes('top') || direction.includes('bottom');
	$: scaleX = direction.includes('left') || direction.includes('right');

	let elWidth = thiccness + 'px';
	let elHeight = thiccness + 'px';
	let top: string | undefined = undefined;
	let right: string | undefined = undefined;
	let bottom: string | undefined = undefined;
	let left: string | undefined = undefined;
	let cursor = 'handle';

	$: if (direction) {
		switch (direction) {
			case 'top':
				top = '-' + thiccness + 'px';
				left = thiccness / 2 + 'px';
				elWidth = 'calc(100% - ' + thiccness + 'px)';
				cursor = 'n-resize';
				break;
			case 'right':
				elHeight = 'calc(100% - ' + thiccness + 'px)';
				top = thiccness / 2 + 'px';
				right = '-' + thiccness + 'px';
				cursor = 'e-resize';
				break;
			case 'bottom':
				elWidth = 'calc(100% - ' + thiccness + 'px)';
				left = thiccness / 2 + 'px';
				bottom = '-' + thiccness + 'px';
				cursor = 's-resize';
				break;
			case 'left':
				elHeight = 'calc(100% - ' + thiccness + 'px)';
				top = thiccness / 2 + 'px';
				left = '-' + thiccness + 'px';
				cursor = 'w-resize';
				break;

			case 'top-left':
				elWidth = thiccness * 2 + 'px';
				elHeight = thiccness * 2 + 'px';
				top = '-' + thiccness + 'px';
				left = '-' + thiccness + 'px';
				cursor = 'nw-resize';
				break;
			case 'top-right':
				elWidth = thiccness * 2 + 'px';
				elHeight = thiccness * 2 + 'px';
				top = '-' + thiccness + 'px';
				right = '-' + thiccness + 'px';
				cursor = 'ne-resize';
				break;
			case 'bottom-right':
				elWidth = thiccness * 2 + 'px';
				elHeight = thiccness * 2 + 'px';
				bottom = '-' + thiccness + 'px';
				right = '-' + thiccness + 'px';
				cursor = 'se-resize';
				break;
			case 'bottom-left':
				elWidth = thiccness * 2 + 'px';
				elHeight = thiccness * 2 + 'px';
				left = '-' + thiccness + 'px';
				bottom = '-' + thiccness + 'px';
				cursor = 'sw-resize';
				break;
		}
	}

	let isDown = false;

	let downX = 0;
	let downY = 0;
	let downPosX = 0;
	let downPosY = 0;
	let downWidth = 0;
	let downHeight = 0;

	const handleMouseDown = (ev) => {
		const { x, y } = ev;
		ev.preventDefault();
		ev.stopPropagation();
		ev.stopImmediatePropagation();
		document.addEventListener('mouseup', handleMouseUp, { once: true });
		document.addEventListener('mouseleave', handleMouseUp, { once: true });
		downX = x;
		downY = y;
		downWidth = width;
		downHeight = height;
		downPosX = x;
		downPosY = y;
		isDown = true;

		document.body.style.pointerEvents = 'none';
	};

	const handleMouseMove = ({ x: _x, y: _y }) => {
		if (isDown) {
			let vx = downX - _x;
			let vy = downY - _y;

			if (scaleX) {
				if (scaleLeft) {
					if (downWidth + vx > minWidth) {
						x = downPosX - vx;
						width = downWidth + vx;
					}
				} else {
					width = downWidth - vx;
				}
			}

			if (scaleY) {
				if (scaleTop) {
					if (downHeight + vy > minHeight) {
						y = downPosY - vy;
						height = downHeight + vy;
					}
				} else {
					height = downHeight - vy;
				}
			}
		}
	};

	const handleMouseUp = () => {
		isDown = false;
		document.body.style.pointerEvents = '';
	};
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	class="handler"
	style={`
    width: ${elWidth}; 
    height: ${elHeight}; 
    top: ${top || 'unset'}; 
    left: ${left || 'unset'}; 
    right: ${right || 'unset'}; 
    bottom: ${bottom || 'unset'}; 
    cursor: ${cursor}; 
    `}
/>

<style>
	.handler {
		position: absolute;
		z-index: 1;
	}
</style>
