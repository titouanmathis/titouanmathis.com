/* ================================
 * Mutations
 * ================================ */

import Vue from 'vue'

export const SET_VIEW_WIDTH = (state, value) => {
	console.log('SET_VIEW_WIDTH', value)
	Vue.set(state, 'VIEW_WIDTH', value)
}

export const SET_VIEW_HEIGHT = (state, value) => {
	console.log('SET_VIEW_HEIGHT', value)
	Vue.set(state, 'VIEW_HEIGHT', value)
}

export const SET_POINTER_X = (state, value) => {
	console.log('SET_POINTER_X', value)
	Vue.set(state, 'SET_POINTER_X', value)
}

export const SET_POINTER_Y = (state, value) => {
	console.log('SET_POINTER_Y', value)
	Vue.set(state, 'SET_POINTER_Y', value)
}
