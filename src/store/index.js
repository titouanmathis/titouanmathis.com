import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		VIEW_WIDTH: window.innerWidth,
		VIEW_HEIGHT: window.innerHeight,
		POINTER_X: window.innerWidth / 2,
		POINTER_Y: window.innerHeight / 2
	},
	getters: {
		ENV(state, getters) {

			switch (window.location.hostname) {

				// Production
				case 'titouanmathis.com':
				case 'www.titouanmathis.com':
					return 'PROD'
				break;

				// Local
				default:
					return 'DEV'
			}
		},
		DEBUG(state, getters) {
			return getters.ENV !== 'PROD'
		}
	},
	mutations,
	actions
})
