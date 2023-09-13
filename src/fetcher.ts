export async function slowFetcher() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({data: "sorry for the wait!"})
		}, 5000)
	})
}
