<template>
	<main class="posa w100p	h100p">

		<div class="z100 posa t1 l1">
			<h1>Titouan Mathis</h1>
			<p><a href="https://twitter.com/titouanmathis" target="_blank">twitter</a> — <a href="https://instagram.com/titouanmathis" target="_blank">instagram</a></p>
		</div>

		<router-view class="posa t0 l0 w100p h100p"></router-view>

		<div class="z100 posa t1 r1 tar">
			<p>lead developer<br>at <a href="http://www.studiometa.fr" title="Agence Web Strasbourg" target="_blank">studio meta</a></p>
		</div>

		<router-link :to="next" @click.stop @touchstart.stop @mousemove.stop @touchmove.stop v-if="haveNext" class="z100 posa r1 b1 z1">
			<span>next→</span>
		</router-link>

		<div class="posa r1 b1 l1 tac">
			<strong>#{{ pad(current, 3) }}</strong>
		</div>

		<router-link :to="prev" @click.stop @touchstart.stop @mousemove.stop @touchmove.stop v-if="havePrev" class="z100 posa b1 l1 z1">
			<span>← prev</span>
		</router-link>
	</main>
</template>

<script>
	import { handleEvent } from './utils/mixins'
	import { log } from './utils'
	import { on, off } from 'sm-events'
	import { debounce } from 'debounce'

	import { experiments } from './router/routes'

	export default {
		name: 'app',
		mixins: [ handleEvent() ],
		data() {
			return {
				experiments
			}
		},
		computed: {
			isMac() {
				return navigator.platform === 'MacIntel' || navigator.platform === 'MacPPC'
			},
			debounceResize() {
				return debounce(100, false, (e) => this.resizeHandler(e))
			},
			havePrev() {
				return this.current > 1
			},
			haveNext() {
				return this.current < this.experiments.length
			},
			current() {
				return this.getCurrent(this.$route.path) || 0
			},
			prev(e) {
				const path = this.pad(this.current - 1, 3)
				return `/${path}/`
			},
			next(e) {
				const path = this.pad(this.current + 1, 3)
				return `/${path}/`
			},
		},
		methods: {
			getCurrent(path) {
				path = path.replace(/\//g, '')
				return parseInt(path)
			},

			keyupHandler(e) {
				if (e.which === 37 && this.havePrev) this.$router.push(this.prev)
				if (e.which === 39 && this.haveNext) this.$router.push(this.next)
			},

			pad(value, length) {
				return value.toString().length < length ? this.pad('0' + value, length) : value
			},

			resizeHandler(e) {
				this.$store.commit('SET_VIEW_WIDTH', window.innerWidth)
				this.$store.commit('SET_VIEW_WIDTH', window.innerHeight)
			},

			mousemoveHandler(e) {
				log('mousemoveHandler');
				this.setPointerPosition(e.clientX, e.clientY)
			},

			touchmoveHandler(e) {
				log('touchmoveHandler');
				const touch = e.touches[0]
				this.setPointerPosition(touch.clientX, touch.clientY)
			},

			touchstartHandler(e) {
				log('touchstartHandler');
				const touch = e.touches[0]
				this.setPointerPosition(touch.clientX, touch.clientY)
			},

			setPointerPosition(x, y) {
				this.$store.commit('SET_POINTER_X', x)
				this.$store.commit('SET_POINTER_Y', y)
			}
		},
		watch: {
			$route(to, from) {
				this.current = this.getCurrent(to.path)
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
