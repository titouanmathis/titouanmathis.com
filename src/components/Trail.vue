<template>
	<transition appear
		v-on:enter="enter"
		v-on:leave="leave"
		mode="out-in">

		<div class="curn z1">
		</div>

	</transition>
</template>

<script>
	import { forEach } from 'foreach'
	import { on, once, off } from 'sm-events'
	import { degToRad } from 'math'
	import { handleEvent } from '../utils/mixins'

	export default {
		name: 'trail',

		mixins: [ handleEvent() ],

		data() {
			return {
				radius: 8,
				total: 12,
				isDestroyed: true,
				width: window.innerWidth,
				height: window.innerHeight,
				targetX: window.innerWidth / 2,
				targetY: window.innerHeight / 2
			}
		},

		computed: {
			dotSize() {
				return this.radius * 5
			},
			$dots() {
				return []
			}
		},

		methods: {

			createDot() {
				const $dot = this.createDiv()
				$dot.classList.add('posa', 't0', 'l0', 'bdrs50p', 'bd2s')
				return $dot
			},

			createDiv() {
				return document.createElement('div')
			},

			loop() {
				if (this.isDestroyed) return

				forEach(this.$dots, ($dot, index) => {
					$dot.__x += (this.targetX - $dot.__x) * (((index + 5) / 40) - 0.05)
					$dot.__y += (this.targetY - $dot.__y) * (((index + 5) / 40) - 0.05)

					TweenMax.set($dot, {
						x: $dot.__x,
						y: $dot.__y
					})
				})

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
				this.targetX = x
				this.targetY = y
			},

			resizeHandler() {
				this.width = window.innerWidth
				this.height = window.innerHeight
			},

			enter($el, done) {

				TweenMax.staggerFrom(this.$dots, 1, {
					scaleX: 0,
					scaleY: 0,
					opacity: 0,
					ease: Expo.easeOut
				}, 0.02, () => {
					done()
					on(document, 'mousemove', this)
					once(document, 'mousemove', this.loop.bind(this))

					on(document, 'touchstart', this)
					on(document, 'touchmove', this)
				})

			},

			leave($el, done) {

				this.isDestroyed = true

				off(document, 'mousemove', this)
				off(document, 'touchstart', this)
				off(document, 'touchmove', this)

				TweenMax.staggerTo(this.$dots, 0.6, {
					scaleX: 0,
					scaleY: 0,
					x: window.innerWidth / 2,
					y: window.innerHeight / 2,
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

			for (let n = 0; n < this.total; n++) {
				const $dot = this.createDot()
				const size = (n * 2) * this.radius

				$dot.__x = window.innerWidth / 2
				$dot.__y = window.innerHeight / 2

				TweenMax.set($dot, {
					zIndex: this.total - n,
					width: size,
					height: size,
					marginTop: size * -0.5 + 'px',
					marginLeft: size * -0.5 + 'px',
					x: $dot.__x,
					y: $dot.__y
				})

				this.$dots.push($dot)
			}

		},

		mounted() {

			forEach(this.$dots, ($dot) =>{
				this.$el.appendChild($dot)
			})

		},

		beforeDestroy() {
			off(document, 'mousemove', this)
			off(document, 'touchstart', this)
			off(document, 'touchmove', this)
		}
	}
</script>
