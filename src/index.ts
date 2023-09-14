#!/usr/bin/env node
import fs from 'node:fs/promises';
import dedent from "dedent-js";
import { fetchJokeOfTheDay } from "./api.js"
import yargs from "yargs/yargs";
import dotenv from "dotenv";

export async function cli() {
	dotenv.config();

	const cli = yargs()
		.scriptName('node-18-typescript-cli')
		.usage(dedent`
			Demo of a Node 18 TypeScript CLI
		`);
	
	cli.command('add [a] [b]', 'add two numbers', (yargs) => {
		yargs.positional('a', {
			type: 'number'
		})
		yargs.positional('b', {
			type: 'number'
		})
	}, (argv) => {
		const result = add(parseInt(argv.a as any), parseInt(argv.b as any));
		console.log(result);
	});
	
	cli.command('subtract [a] [b]', 'subtract two numbers', (yargs) => {
			yargs.positional('a', {
				type: 'number'
			})
			yargs.positional('b', {
				type: 'number'
			})
		}, (argv) => {
			const result = subtract(parseInt(argv.a as any), parseInt(argv.b as any));
			console.log(result);
		});
	
	cli.command('joke', 'joke of the day', (yargs) => {
		// no args
	}, async (argv) => {
		const joke = await jokeOfTheDay();
		console.log(joke);
	});
	
	await cli.parseAsync(process.argv.slice(2));
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

if (process.env.NODE_ENV !== 'test') {
	cli();
}
