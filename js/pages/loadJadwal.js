import api from '../api/api.js';
import loading from '../utils/loading.js';
import db from '../utils/db.js';

let matches;
let start = 0;
let end = 9;

async function renderMatches() {
	if (end < matches.length) {
		for(let i = start; i < end; i++) {
			const match = matches[i];

			const convertToLocal = new Date(match.utcDate);
			const date = convertToLocal.toString().split(' ').splice(0,5).join(' ');

			const apakahSudahAdaDiIndexedDB = await db.getById(match.id.toString());

			document.getElementById('jadwal-list').innerHTML += `
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
		}

		saveMatch();
	}

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

function loadMore() {
	const loadMoreBtn = document.getElementById('load-more-btn');

	loadMoreBtn.addEventListener('click', () => {
		if (end < matches.length) {
			start += 10;
			end += 10;
			renderMatches();

			if (end === matches.length - 1) {
				loadMoreBtn.setAttribute('disabled', '');
			}
		}
	})
};

async function loadJadwal() {
	const jadwalContainer = document.getElementById('jadwal-container');

	start = 0;
	end = 9;

	if(jadwalContainer) {
		loading(jadwalContainer);

		matches = await api.getSchedule();

		loading(jadwalContainer, `
			<div class="row" id="jadwal-list"></div>
		  <button id="load-more-btn" class="waves-effect waves-light btn m-2 x-center">Load more</button>
		`);

		if(matches.length !== 0) {
			renderMatches();
			loadMore();
		} else {
			jadwalContainer.innerHTML = '<h5 class="center-align">Musim 2018/2019 telah berakhir.</h5>';
		}		
	};
};

export default loadJadwal;