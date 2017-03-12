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
	import { mapState } from 'vuex'

	export default {
		name: 'two',

		mixins: [ handleEvent() ],

		data() {
			return {
				total: 12,
				isDestroyed: true,
			}
		},

		computed: {
			radius() {
				const radius = this.VIEW_WIDTH > this.VIEW_HEIGHT ? this.VIEW_HEIGHT / 80 : this.VIEW_WIDTH / 80
				return Math.round(radius / 2) * 2
			},
			borderWidth() {
				return Math.ceil(this.radius / 5)
			},
			dotSize() {
				return this.radius * 5
			},
			$dots() {
				return []
			},
			...mapState(['POINTER_X', 'POINTER_Y', 'VIEW_WIDTH', 'VIEW_HEIGHT'])
		},

		methods: {

			createDot() {
				const $dot = this.createDiv()
				$dot.classList.add('posa', 't0', 'l0', 'bdrs50p', 'bd2s', 'bxzcb')
				return $dot
			},

			createDiv() {
				return document.createElement('div')
			},

			loop() {
				if (this.isDestroyed) return

				forEach(this.$dots, ($dot, index) => {
					$dot.__x += (this.POINTER_X - $dot.__x) * (((index + 5) / 40) - 0.05)
					$dot.__y += (this.POINTER_Y - $dot.__y) * (((index + 5) / 40) - 0.05)

					TweenMax.set($dot, {
						x: $dot.__x,
						y: $dot.__y
					})
				})

				requestAnimationFrame(this.loop.bind(this))
			},

			enter($el, done) {

				this.loop()

				TweenMax.staggerFrom(this.$dots, 1, {
					scaleX: 0,
					scaleY: 0,
					x: this.VIEW_WIDTH / 2,
					y: this.VIEW_HEIGHT / 2,
					opacity: 0,
					ease: Expo.easeOut
				}, 0.02, done)

			},

			leave($el, done) {

				this.isDestroyed = true
				$el.classList.remove('curn')

				TweenMax.staggerTo(this.$dots, 0.6, {
					scaleX: 0,
					scaleY: 0,
					x: this.VIEW_WIDTH / 2,
					y: this.VIEW_HEIGHT / 2,
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

				$dot.__x = this.VIEW_WIDTH / 2
				$dot.__y = this.VIEW_HEIGHT / 2

				TweenMax.set($dot, {
					zIndex: this.total - n,
					width: size,
					height: size,
					borderWidth: this.borderWidth + 'px',
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

		}
	}
</script>
