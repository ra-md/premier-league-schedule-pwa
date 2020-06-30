const API_TOKEN = '326e766c25414180b4cd22c1e4b187b4';
const API_URL = 'https://api.football-data.org/v2';

const headers = {
	'X-Auth-Token': API_TOKEN
};

function getSchedule() {
	return new Promise(resolve => {

		const url = `${API_URL}/competitions/2021/matches?status=SCHEDULED`;

		if('caches' in window) {
			caches.match(url)
			.then(res => {
				if(res) {
					res.json()
					.then((json) => {
						resolve(json.matches)
					})
				}
			})
		}

		fetch(url, { headers })
			.then(res => res.json())
			.then(async json => {
				const { matches } = await json;
				resolve(matches);
			})
	});
};

function getStandings() {
	const url = `${API_URL}/competitions/2021/standings`;

	return new Promise(resolve => {
		if('caches' in window) {
			caches.match(url)
			.then(res => {
				if(res) {
					res.json()
					.then((json) => {
						resolve(json.standings[0].table)
					})
				}
			})
		}

		fetch(url, {headers})
			.then(res => res.json())
			.then(json => {
				const { standings } = json;
				resolve(standings[0].table);
			})
	});
}

export default { getSchedule, getStandings };