import test from 'ava';
import esmock from 'esmock'
import { add, subtract } from './cli.ts';

test('add', t => {
	t.is(add(1, 2), 3)
});

test('subtract', async t => {
	t.is(subtract(1, 2), -1)
});

test('joke', async t => {
	const fakeJoke = {id: "1", joke: "knock knock...", status: 200}
	const mod = await esmock('./cli.ts', {
		// mock the import of ./fetcher that ./cli does
		'./api.ts': {
			fetchJokeOfTheDay: () => Promise.resolve(fakeJoke)
		} as typeof import('./api.ts')
	}) as typeof import('./cli.ts');

	const joke = await mod.jokeOfTheDay();
	t.is(joke, fakeJoke.joke);
});