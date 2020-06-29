const API_TOKEN = '326e766c25414180b4cd22c1e4b187b4';
const API_URL = 'https://api.football-data.org/v2';

const headers = {
	'X-Auth-Token': API_TOKEN
};

function getSchedule() {
	return new Promise(resolve => {

		if('caches' in window) {
			caches.match(API_URL)
			.then(res => {
				if(res) {
					res.json()
					.then((json) => {
						console.log(json)
						resolve(json.matches)
					})
				}
			})
		}

		fetch(`${API_URL}/competitions/2021/matches?status=SCHEDULED`, { headers })
			.then(res => res.json())
			.then(async json => {
				const { matches } = await json;
				resolve(matches);
			})
	});
};

function getStandings() {
	return new Promise(resolve => {
		fetch(`${API_URL}/competitions/2021/standings`, {headers})
			.then(res => res.json())
			.then(json => {
				const { standings } = json;
				resolve(standings[0].table);
			})
	});
}

export default { getSchedule, getStandings };