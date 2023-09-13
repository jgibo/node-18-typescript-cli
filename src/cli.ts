import { program } from 'commander';
import url from 'node:url';
import { fetchJokeOfTheDay } from "./api.ts";

export function cli(args?: string[]) {
	if (!args || args.length === 0) {
		args = process.argv.slice(2);
	} else {
		args = [process.argv[0], process.argv[1], ...args];
	}

	program
		.name('node-18-typescript-cli')
		.description('This cli is a demo of this cli template')
		.version('0.0.1')
	
	program.command('add')
		.description('add two numbers')
		.arguments('<a> <b>')
		.action((a, b) => {
			console.log(add(parseInt(a), parseInt(b)));
		});
	
	program.command('subtract')
		.description('aubtract two numbers')
		.arguments('<a> <b>')
		.action((a, b) => {
			console.log(subtract(parseInt(a), parseInt(b)));
		});
	
	program.command('joke')
		.description('joke of the day')
		.action(async () => {
			console.log(await jokeOfTheDay())
		});
	
	program.parse(args);
}

export function add(a: number, b: number) {
	return a + b;
}

export function subtract(a: number, b: number) {
	return a - b;
}

export async function jokeOfTheDay() {
	const data = await fetchJokeOfTheDay();
	return data.joke;
}

// if this is the entry point, run the cli
if (import.meta.url.startsWith('file:')) {
	const modulePath = url.fileURLToPath(import.meta.url);
	if (process.argv[1] === modulePath) {
		cli();
	}
}