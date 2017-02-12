<template>
	<transition appear
		v-on:enter="enter"
		v-on:leave="leave">

		<div class="atom">
			<div class="neutron"></div>
			<div class="proton"></div>
			<div class="electron"></div>
		</div>

	</transition>
</template>

<script>

	export default {
		name: 'three',

		methods: {

			enter($el, done) {
				done()
			},

			leave($el, done) {
				done()
			}
		},

		mounted() {

			TweenMax.to('.atom', 1, {
				rotation: 360,
				repeat: -1,
				ease: Linear.easeNone
			})

		}
	}
</script>

<style lang="scss">

	.proton,
	.neutron,
	.electron {
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: 50%;
	}

	.proton,
	.neutron {
		width: 12px;
		height: 12px;
		margin: -6px 0 0 -6px;
		border: 1px solid;
	}

	.proton {
		background: #fff;
		color: #111;
		transform: translateX(-3px);
	}

	.neutron {
		background: #111;
		color: #fff;
		transform: translateX(3px);
	}

	.electron {
		width: 6px;
		height: 6px;
		margin: -3px 0 0 -3px;
		background: #fff;
		transform: translate(-10vmin, -10vmin);
	}
</style>
