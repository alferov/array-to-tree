import arrayToTree from '../index';

const dataOne = [
	{
		id: 1,
		name: 'Portfolio',
		parent_id: undefined
	},
	{
		id: 2,
		name: 'Web Development',
		parent_id: 1
	},
	{
		id: 3,
		name: 'Recent Works',
		parent_id: 2
	},
	{
		id: 4,
		name: 'About Me',
		parent_id: undefined
	}
];

arrayToTree(dataOne);

/*
 * Output:
 *
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */

const dataTwo = [
	{
		_id: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c',
		name: 'Portfolio',
		parent: null
	},
	{
		_id: 'ec666030-7f8f-11e3-ae96-0123456789ab',
		name: 'Web Development',
		parent: 'ec654ec1-7f8f-11e3-ae96-b385f4bc450c'
	},
	{
		_id: 'ec66fc70-7f8f-11e3-ae96-000000000000',
		name: 'Recent Works',
		parent: 'ec666030-7f8f-11e3-ae96-0123456789ab'
	},
	{
		_id: '32a4fbed-676d-47f9-a321-cb2f267e2918',
		name: 'About Me',
		parent: null
	}
];

arrayToTree(dataTwo, {
	parentProperty: 'parent',
	customID: '_id'
});

/*
 * Output:
 *
 * Portfolio
 *   Web Development
 *     Recent Works
 * About Me
 */