// import test from 'ava';
// import { TodoItem } from '../frontend/components/MainScreens/Today';

// // const test = require('ava');
// // const TodoItem = require('../frontend/components/MainScreens/Today/TodoItem');

// // test('foo', t => {
// // 	t.pass();
// // });

// // test('bar', async t => {
// // 	const bar = Promise.resolve('bar');
// // 	t.is(await bar, 'bar');
// // });
// test('TodoItem component renders correctly', (t) => {
//   const props = {
//     id: 1,
//     title: 'Test Title',
//     completed: false,
//     category: 'Test Category',
//     selectedStartTime: new Date(),
//     selectedEndTime: new Date(),
//     priority: 'High',
//   };
//   const component = <TodoItem {...props}/>
// 	const tree = render.create(component).toJSON();
//   t.snapshot(tree);
// });
