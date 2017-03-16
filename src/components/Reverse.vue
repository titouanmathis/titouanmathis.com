<template>
	<div class="reverse z9000 posa t0 l0 bdrs50p"></div>
</template>

<script>
	import { handleEvent } from '../utils/mixins'
	import { mapState } from 'vuex'
	import { on, off } from 'sm-events'

	export default {
		name: 'reverse',
		mixins: [ handleEvent() ],
		data() {
			return {
				duration: 1.5,
				returnTimeScale: 2
			}
		},
		computed: {
			...mapState(['POINTER_X', 'POINTER_Y'])
		},
		methods: {

			clickHandler(e) {
				console.log('click');
				TweenMax.to(this.$el, this.duration, { x: this.POINTER_X, y: this.POINTER_Y, ease: Expo.easeInOut })
				this.tl.timeScale(1).play()
			},

			dblclickHandler(e) {
				console.log('dblclick');
				TweenMax.to(this.$el, this.duration / this.returnTimeScale, { x: this.POINTER_X, y: this.POINTER_Y, ease: Expo.easeInOut })
				this.tl.timeScale(this.returnTimeScale).reverse()
			}
		},
		created() {

		},
		mounted() {
			this.tl = new TimelineMax({ paused: true })
			this.tl.to(this.$el, this.duration, {
				scaleX: 1,
				scaleY: 1,
				ease: Expo.easeInOut
			})
			on(document, 'click', this)
			on(document, 'dblclick', this)
		},
		beforeDestroy() {
			off(document, 'click', this)
			off(document, 'dblclick', this)
		}
	}
</script>

<style lang="scss">
	@import "../assets/scss/base/variables";
	@import "../assets/scss/tools/functions";
	@import "../assets/scss/tools/mixins";


	$size: sqrt(pow(30, 2) + pow(30, 2)) * 1vmax;

	.reverse {
		width: $size;
		height: $size;
		margin: $size * -0.5 0 0 $size * -0.5;
		background: #fff;
		mix-blend-mode: exclusion;

		pointer-events: none;
		transform: translate(50vw, 50vh) scale(0);
	}
</style>
