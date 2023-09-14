import test from 'ava';
import { add, subtract } from './index.js';
import * as td from "testdouble";

test.beforeEach(t => {
	td.reset();
});

test.serial('add', t => {
	t.is(add(1, 2), 3)
});

test.serial('subtract', async t => {
	t.is(subtract(1, 2), -1)
});

test.serial('joke', async t => {
	const fakeJoke = {id: "1", joke: "knock knock...", status: 200}
	const apiMod = await td.replaceEsm('./api.js');
	td.when(apiMod.fetchJokeOfTheDay()).thenResolve(fakeJoke);

	const { jokeOfTheDay } = await import('./index.js')
	const joke = await jokeOfTheDay();
	t.is(joke, fakeJoke.joke);
});
