// Import experiments
import One from '../experiments/001'
import Two from '../experiments/002'

export const experiments = [
	{
		path: '/001/',
		component: One
	},
	{
		path: '/002/',
		component: Two
	}
]

export default [
	{
		path: '/',
		redirect: '/001/'
	},
	...experiments
]
