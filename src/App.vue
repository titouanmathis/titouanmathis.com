<template>
	<main class="posa w100p	h100p">

		<div class="z100 posa t1 l1">
			<h1>Titouan Mathis</h1>
			<p><a href="https://twitter.com/titouanmathis" target="_blank">twitter</a> — <a href="https://instagram.com/titouanmathis" target="_blank">instagram</a></p>
		</div>

		<component :is="experiments[current]" class="posa t0 l0 w100p h100p"></component>

		<div class="z100 posa t1 r1 tar">
			<p>lead developer<br>at <a href="http://www.studiometa.fr" title="Agence Web Strasbourg" target="_blank">studio meta</a></p>
		</div>

		<div @click="next" v-if="haveNext" class="z100 posa r1 b1 z1">
			<a>next→</a>
		</div>

		<div class="posa r1 b1 l1 tac">
			<strong>#{{ pad(current + 1, 3) }}</strong>
		</div>

		<div @click="prev" v-if="havePrev" class="z100 posa b1 l1 z1">
			<a>← prev</a>
		</div>
	</main>
</template>

<script>
	import One from './experiments/001'
	import Two from './experiments/002'
	import Three from './experiments/003'

	import { handleEvent } from './utils/mixins'
	import { on, off } from 'sm-events'
	import { debounce } from 'debounce'

	export default {
		name: 'app',
		mixins: [ handleEvent() ],
		data() {
			return {
				experiments: [ One, Two, Three ],
				current: 0,
				havePrev: false,
				haveNext: true
			}
		},
		computed: {
			isMac() {
				return navigator.platform === 'MacIntel' || navigator.platform === 'MacPPC'
			},
			debounceResize() {
				return debounce(100, false, (e) => this.resizeHandler(e))
			}
		},
		components: {
			One,
			Two,
			Three
		},
		watch: {
			current(newValue, oldValue) {
				this.havePrev = this.current > 0
				this.haveNext = this.current < this.experiments.length - 1
			},
			'window.location.hash': (newValue, oldValue) => {
				console.log('hash has changed');
			}
		},
		methods: {
			prev() {
				this.current--
			},
			next() {
				this.current++
			},
			keyupHandler(e) {
				if (e.which === 37 && this.havePrev) this.prev()
				if (e.which === 39 && this.haveNext) this.next()
			},

			pad(value, length) {
				return value.toString().length < length ? this.pad('0' + value, length) : value
			},

			resizeHandler(e) {
				this.$store.commit('SET_VIEW_WIDTH', window.innerWidth)
				this.$store.commit('SET_VIEW_WIDTH', window.innerHeight)
			},

			mousemoveHandler(e) {
				this.setPointerPosition(e.clientX, e.clientY)
			},

			touchmoveHandler(e) {
				const touch = e.touches[0]
				this.setPointerPosition(touch.clientX, touch.clientY)
			},

			touchstartHandler(e) {
				const touch = e.touches[0]
				this.setPointerPosition(touch.clientX, touch.clientY)
			},

			setPointerPosition(x, y) {
				this.$store.commit('SET_POINTER_X', x)
				this.$store.commit('SET_POINTER_Y', y)
			}
		},
		created() {
			this.isMac && document.body.classList.add('is-mac')
			on(document, 'keyup', this)
			on(document, 'mousemove', this)
			on(document, 'touchmove', this)
			on(document, 'touchstart', this)
			on(window, 'resize', this.debounceResize)
		},
		beforeDestroy() {
			off(document, 'keyup', this)
			off(document, 'mousemove', this)
			off(document, 'touchmove', this)
			off(document, 'touchstart', this)
			off(window, 'resize', this.debounceResize)
		}
	}
</script>

<style lang="scss">
	@import "./assets/scss/styles";
</style>
