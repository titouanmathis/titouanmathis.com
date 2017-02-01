import {} from 'gsap'
import Vue from 'vue'
import store from './store'
import App from './App'

TweenLite.defaultEase = Expo.easeOut

new Vue({
	el: '#app',
	template: '<App/>',
	components: { App },
	store
})
