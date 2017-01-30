<template>
	<main class="posa w100p	h100p">

		<div class="posa t1 l1">
			<h1>Titouan Mathis</h1>
			<p><a href="https://twitter.com/titouanmathis" target="_blank">twitter</a> — <a href="https://instagram.com/titouanmathis" target="_blank">instagram</a></p>
		</div>

		<dots class="posa t0 l0 w100p h100p"></dots>

		<div class="posa t1 r1 tar">
			<p>lead developer<br>at <a href="http://www.studiometa.fr" title="Agence Web Strasbourg" target="_blank">studio meta</a></p>
		</div>

		<div class="dn posa r1 b1 z1">
			<a>next</a> →
		</div>

		<div class="posa r1 b1 l1 tac">
			<strong>untitled #1</strong><br><span class="fw400">2016.01.29</span>
		</div>

		<div class="dn posa b1 l1 z1">
			← <a>prev</a>
		</div>
	</main>
</template>

<script>
	import Dots from 'components/Dots'

	export default {
		name: 'app',
		computed: {
			isMac() {
				return navigator.platform === 'MacIntel' || navigator.platform === 'MacPPC'
			}
		},
		components: {
			Dots
		},
		created() {
			this.isMac && document.body.classList.add('is-mac')
		}
	}
</script>

<style lang="scss">
	@import "./assets/scss/styles";

</style>
