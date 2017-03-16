<template>
	<transition appear
		v-on:enter="enter"
		v-on:leave="leave">

		<div>
			<div class="xp3 w100p h100p">
				<div class="xp3__inner js-xp3__inner center" :style="`width: ${size}px; height: ${size}px;`">
					<div v-for="current in total" class="posa t50p l50p xp3__anchor js-xp3__anchor">
						<div class="posa t50p l50p xp3__rect js-xp3__rect"></div>
					</div>
				</div>
			</div>
		</div>

	</transition>
</template>

<script>
	import { forEach } from 'foreach'
	import { degToRad } from 'math'
	import { mapState } from 'vuex'
	import { once } from 'sm-events'

	export default {
		name: 'three',

		data() {
			return {
				isDestroyed: true,
				total: 120,
				anchors: [],
				progress: 0,
				targetProgress: 0
			}
		},

		computed: {
			size() {
				return this.VIEW_WIDTH > this.VIEW_HEIGHT ? this.VIEW_HEIGHT * 0.5 : this.VIEW_WIDTH * 0.5
			},
			...mapState(['POINTER_X', 'POINTER_Y', 'VIEW_WIDTH', 'VIEW_HEIGHT'])
		},

		methods: {

			toggleAnchor(index) {
				const $before = this.anchors.slice(0, index)
				const $after = this.anchors.slice(index + 1, this.anchors.length)
				TweenMax.to($after, 1, {
					scaleX: 1,
					scaleY: 1
				})
				TweenMax.to($before, 1, {
					scaleX: 0.5,
					scaleY: 0.5
				})
			},

			loop() {
				if (this.isDestroyed) return

				this.targetProgress = this.POINTER_X / this.VIEW_WIDTH
				this.progress += (this.targetProgress - this.progress) * 0.05
				if (this.progress < 0.01) this.progress = 0

				this.tl.progress(this.progress)

				requestAnimationFrame(this.loop.bind(this))
			},

			enter($el, done) {
				done()
			},

			leave($el, done) {

				TweenMax.staggerTo(this.$anchors, 0.6, {
					x: 0,
					y: 0,
					opacity: 0,
					scaleX: 0,
					scaleY: 0,
					ease: Back.easeIn
				}, 1 / 300, () => {
					this.isDestroyed = true
					done()
				})
			}
		},

		mounted() {
			this.isDestroyed = false
			this.$inner = this.$el.querySelector('.js-xp3__inner')
			this.$anchors = this.$el.querySelectorAll('.js-xp3__anchor')

			forEach(this.$anchors, ($anchor, index) => {
				this.anchors.push($anchor)

				const delta = this.total / 2
				const angle = degToRad(360 / (this.total - delta - 1) * (index - delta / 2))
				const x = this.size / 2 * Math.cos(angle)
				const y = this.size / 2 * Math.sin(angle)
				const zIndex = this.total - index

				TweenMax.set($anchor, { zIndex, opacity: 0, scaleX: 0, scaleY: 0, z: index * -0.1 })
				TweenMax.to($anchor, 1, {
					delay: 0.5 + index / 300,
					x,
					y,
					scaleX: 1,
					scaleY: 1,
					ease: Back.easeOut,
					opacity: 1
				})

				const duration = this.total / 30
				TweenMax.set($anchor.firstChild, {
					animationDelay: (index * (duration / 100)) * -1 + 's',
					animationDuration: duration + 's'
				})
			})

			this.tl = new TimelineMax({
				paused: true
			})
			this.tl.staggerFromTo(this.$anchors, 1, {
				scaleX: 1,
				scaleY: 1
			}, {
				scaleX: 0.5,
				scaleY: 0.5,
				ease: Back.easeInOut
			}, 1 / 30)

			once(document, 'mousemove', this.loop.bind(this))
		}
	}
</script>

<style lang="scss">
	@import "../assets/scss/base/variables";

	.xp3 {
		width: 50vmax;
		height: 50vmax;
		animation: rotation 30s linear infinite;
	}

	.xp3__inner {
		transform-style: preserve-3d;
		perspective: 20px;
	}

	.xp3__anchor {
		width: 2px;
		height: 2px;
		margin: -1px 0 0 -1px;
	}

	.xp3__rect {
		$width: 5vmax;
		$height: $width * 2;

		width: $width;
		height: $height;
		margin: $height * -0.5 0 0 $width * -0.5;
		background-color: $black;
		border: 1px solid $white;
		animation: rotation 5s linear infinite;
	}

</style>
