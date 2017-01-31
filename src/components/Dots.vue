<template>
	<transition appear
		v-on:enter="enter"
		v-on:leave="leave"
		mode="out-in">

		<div class="dots"></div>

	</transition>
</template>

<script>
	import { forEach } from 'foreach'
	import { on, once, off } from 'sm-events'
	import { degToRad } from 'math'
	import { handleEvent } from '../utils/mixins'

	export default {
		name: 'dots',

		mixins: [ handleEvent() ],

		data() {
			return {
				radius: 36,
				total: 10,
				isDestroyed: true,
				width: window.innerWidth,
				height: window.innerHeight,
				progress: 0,
				targetProgress: 0,
				size: 1,
				targetSize: 1
			}
		},

		computed: {
			dotSize() {
				return this.radius * 5
			},
			tl() {
				return new TimelineMax({ paused: true })
			},
			$containers() {
				return []
			},
			$dots() {
				return []
			}
		},

		methods: {

			createContainer() {
				const $container = this.createDiv()
				$container.classList.add('posa', 't50p', 'l50p', 'bdrs50p', 'wctrf')
				return $container
			},

			createDot() {
				const $dot = this.createDiv()
				$dot.classList.add('dot', 'posa', 't50p', 'l50p')
				return $dot
			},

			createDiv() {
				return document.createElement('div')
			},

			loop() {
				if (this.isDestroyed) return

				this.targetProgress = this.x / this.width
				this.progress += (this.targetProgress - this.progress) * 0.05
				if (this.progress < 0.01) this.progress = 0

				this.targetSize = 0.025 + (this.y * 0.975 / this.height)
				this.size += (this.targetSize - this.size) * 0.1

				TweenMax.set(this.$dots, {
					scaleX: this.size,
					scaleY: this.size
				})

				this.tl.progress(this.progress)

				requestAnimationFrame(this.loop.bind(this))
			},

			mousemoveHandler(e) {
				this.setPosition(e.clientX, e.clientY)
			},

			touchstartHandler(e) {
				const touch = e.touhes[0]
				this.setPosition(touch.clientX, touch.clientY)
			},

			touchmoveHandler(e) {
				const touch = e.touches[0]
				this.setPosition(touch.clientX, touch.clientY)
			},

			setPosition(x, y) {
				this.x = x
				this.y = y
			},

			resizeHandler() {
				this.width = window.innerWidth
				this.height = window.innerHeight
			},

			enter($el, done) {

				TweenMax.staggerFrom(this.$dots, 1, {
					scaleX: 0,
					scaleY: 0,
					x: 0,
					y: 0,
					ease: Expo.easeOut
				}, 0.01, done)

			},

			leave($el, done) {

				this.isDestroyed = true

				off(document, 'mousemove', this)
				off(document, 'touchstart', this)
				off(document, 'touchmove', this)

				TweenMax.staggerTo(this.$dots, 0.6, {
					scaleX: 0,
					scaleY: 0,
					x: 0,
					y: 0,
					ease: Expo.easeInOut
				}, 0.01, done)

				setTimeout(() => {
					TweenMax.staggerTo(this.$dots, 0.3, {
						opacity: 0,
						ease: Expo.easeOut
					}, 0.01, done)
				}, 300);

			}

		},

		created() {
			this.isDestroyed = false

			on(document, 'mousemove', this)
			once(document, 'mousemove', this.loop.bind(this))

			on(document, 'touchstart', this)
			on(document, 'touchmove', this)

			for (let n = 0; n <= this.total; n++) {
				const $container = this.createContainer();
				const size = (2 * n) * this.radius * 2
				const numberOfDots = 1 * n + 1

				for (let m = 0; m < numberOfDots; m++) {
					const $dot = this.createDot()
					const dotSize = this.dotSize
					const angle = degToRad(360 / numberOfDots * m)
					const x = size / 2 * Math.cos(angle)
					const y = size / 2 * Math.sin(angle)

					$container.appendChild($dot)

					TweenMax.set($dot, {
						x: numberOfDots > 1 ? x : 0,
						y: numberOfDots > 1 ? y : 0,
						z: (n + 1) * -1,
						width: dotSize,
						height: dotSize,
						marginTop: dotSize * -0.5 + 'px',
						marginLeft: dotSize * -0.5 + 'px'
					})

					this.$dots.push($dot)
				}

				TweenMax.set($container, {
					zIndex: this.total - n,
					width: size,
					height: size,
					z: (n + 1) * -1,
					marginTop: size * -0.5 + 'px',
					marginLeft: size * -0.5 + 'px'
				})

				this.tl.fromTo($container, 10, {
					rotation: 90
				}, {
					rotation: 270,
					ease: Expo.easeInOut
				}, n / 5)

				this.$containers.push($container)
			}

		},

		mounted() {

			forEach(this.$containers, ($container) =>{
				this.$el.appendChild($container)
			})

		},

		beforeDestroy() {
			off(document, 'mousemove', this)
			off(document, 'touchstart', this)
			off(document, 'touchmove', this)
		}
	}
</script>

<style lang="scss">
	@import "../assets/scss/base/variables";

	.dots {
		transform-style: preserve-3d;
		perspective: 5px;
	}

	.dot:after {
		content: "";
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: $white;
		border: 4px solid $grey-dark;
		border-radius: 50%;

		transform: scale(0.5);
		transition: all 0.6s cubic-bezier(0.85, 0.01, 0.13, 1.02);
		will-change: transform;
	}
</style>
