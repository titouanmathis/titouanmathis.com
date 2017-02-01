/* ================================
 * Mutations
 * ================================ */

import Vue from 'vue'



/**
 * Save the view width global variable
 * @param  {Object} state The store's state object
 * @param  {Number} value The width of the viewport
 * @return {void}
 */
export const SET_VIEW_WIDTH = (state, value) => {
	Vue.set(state, 'VIEW_WIDTH', value)
}


/**
 * Save the view height global variable
 * @param  {Object} state The store's state object
 * @param  {Number} value The height of the viewport
 * @return {void}
 */
export const SET_VIEW_HEIGHT = (state, value) => {
	Vue.set(state, 'VIEW_HEIGHT', value)
}


/**
 * Save the pointer X position
 * @param  {Object} state The store's state object
 * @param  {Number} value The current X pointer's position
 * @return {void}
 */
export const SET_POINTER_X = (state, value) => {
	Vue.set(state, 'POINTER_X', value)
}


/**
 * Save the pointer Y position
 * @param  {Object} state The store's state object
 * @param  {Number} value The current Y pointer's position
 * @return {void}
 */
export const SET_POINTER_Y = (state, value) => {
	Vue.set(state, 'POINTER_Y', value)
}
