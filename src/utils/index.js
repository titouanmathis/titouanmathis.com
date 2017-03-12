/* ================================
 * Utils
 * ================================ */

import store from '../store'



/**
 * Log sutff to the console only if global debug is true
 * @param  {Array} args The arguments to pass to the `console.log()` function
 * @return {void}
 */
export function log(args) {
	store.getters.DEBUG && console.log(...arguments)
}
