// Import experiments
import One from '../experiments/001'
import Two from '../experiments/002'
import Three from '../experiments/003'

export const experiments = [
	{
		path: '/001/',
		component: One
	},
	{
		path: '/002/',
		component: Two
	},
	{
		path: '/003/',
		component: Three
	}
]

export default [
	{
		path: '/',
		redirect: '/001/'
	},
	...experiments
]
