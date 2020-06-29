import api from '../api/api.js';
import loading from '../utils/loading.js';
import db from '../utils/db.js';

const API_URL = 'https://api.football-data.org/v2';

function loadJadwal() {
	const content = document.getElementById('jadwal');

	if(content) {
		loading(content);

		// if('caches' in window) {
		// 	caches.match(API_URL).then(res => {
		// 		if(res) {
		// 			res.json()
		// 				.then(json => {
		// 					json.matches.forEach(match => {
		// 						const convertToLocal = new Date(match.utcDate);
		// 						const date = convertToLocal.toString().split(' ').splice(0,5).join(' ');
								
		// 						content.innerHTML += `
		// 							<div class="col s6 responsive">
		// 								<div class="card">
		// 									<h6 class="left mx-2">${date}</h6>
		// 									<h6 class="right mx-2 btn-simpan">Simpan</h6>
		// 							    <div class="card-content">
		// 							    	<h5 class="center-align">${match.homeTeam.name}</h5>
		// 					    			<h6 class="center-align">vs</h6>
		// 							    	<h5 class="center-align">${match.awayTeam.name}</h5>
		// 							    </div>
		// 							  </div>
		// 							</div>`;
		// 					})

		// 				})
		// 		}
		// 	})
		// }

		api.getSchedule()
			.then(matches => {

				loading(content, '');

				for(let match of matches) {
					const convertToLocal = new Date(match.utcDate);
					const date = convertToLocal.toString().split(' ').splice(0,5).join(' ');

					content.innerHTML += `
						<div class="col s6 responsive">
							<div class="card">
								<h6 class="left mx-2">${date}</h6>
								<h6 class="right mx-2 btn-simpan">Simpan</h6>
						    <div class="card-content">
						    	<h5 class="center-align">${match.homeTeam.name}</h5>
				    			<h6 class="center-align">vs</h6>
						    	<h5 class="center-align">${match.awayTeam.name}</h5>
						    </div>
						  </div>
						</div>`;
				};

				saveMatch(matches);

			})

	};
};

function saveMatch() {
	const buttons = document.querySelectorAll('.btn-simpan');

	buttons.forEach(btn => {
		btn.addEventListener('click', event => {

			db.save(event.path[1].outerHTML)
				.then(res => {
					M.toast({html: res});
				});

		});
	});
};

export default loadJadwal;