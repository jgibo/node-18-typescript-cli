import ky from "ky";

type JokeResponse = {
	id: string;
	joke: string;
	status: number;
};

export async function fetchJokeOfTheDay() {
	const data = await ky.get(process.env.JOKE_URL!).json() as JokeResponse;
	return data;
}
