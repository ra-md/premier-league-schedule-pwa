import db from '../utils/db.js';

async function loadJadwalYangDisimpan() {
	const content = document.getElementById('jadwal-yang-disimpan');

	if(content) {
		const semuaJadwal = await db.getAll();
		
		if(semuaJadwal.length === 0) {
			content.innerHTML = '<h5 class="xy-center">Belum ada jadwal yang disimpan</h5>';
		} else {
			content.innerHTML = '';
			for(let jadwal of semuaJadwal) {
				content.innerHTML += jadwal.matchDenganBtnHapus;
			}
			hapusJadwal();
		};

	}
};

function hapusJadwal() {

	const btnHapus = document.querySelectorAll('.btn-hapus');

	btnHapus.forEach(btn => {
		btn.addEventListener('click', () => {

			db.deleteJadwal(btn.id)
			.then(res => {

				loadJadwalYangDisimpan();

				M.toast({html: res});
			});

		});
	});

};

export default loadJadwalYangDisimpan;