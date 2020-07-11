import api from '../api/api.js';
import loading from '../utils/loading.js';
import db from '../utils/db.js';

const API_URL = 'https://api.football-data.org/v2';

function loadJadwal() {
	const content = document.getElementById('jadwal');

	if(content) {
		loading(content);

		api.getSchedule()
			.then(async matches => {

				loading(content, '');

				for(let match of matches) {
					const convertToLocal = new Date(match.utcDate);
					const date = convertToLocal.toString().split(' ').splice(0,5).join(' ');

					const apakahSudahAdaDiIndexedDB = await db.getById(match.id.toString());

					content.innerHTML += `
						<div class="col s6 responsive">
							<div class="card">
								<h6 class="left m-2">${date}</h6>
								<button ${apakahSudahAdaDiIndexedDB ? 'disabled':''} id="${match.id}" class="right m-2 btn-simpan">Simpan</button>
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
		btn.addEventListener('click', async event => {
			const matchDenganBtnHapus = event.path[1].outerHTML.replace(/simpan/gi, 'hapus');

			const obj = {
				id: btn.id,
				match: matchDenganBtnHapus
			}

			db.save(obj)
				.then(res => {
					M.toast({html: res});
				});

			btn.setAttribute('disabled', '');
		});
	});
};

export default loadJadwal;