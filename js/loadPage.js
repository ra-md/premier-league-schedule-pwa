import loadJadwal from './pages/loadJadwal.js';
import loadKelasemen from './pages/loadKelasemen.js';
import loadJadwalYangDisimpan from './pages/loadJadwalYangDisimpan.js';

async function loadPage(page) {
	const content = document.getElementById('body-content');
	const response = await fetch(`pages/${page}.html`);

	if(response.status === 200) {
	  const responseText = await response.text();
	  content.innerHTML = responseText;
	} else if(response.status === 404) {
	  content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
	} else {
	  content.innerHTML = '<p>halaman tidak dapat diakses.</p>';
	};

	loadJadwal();
	loadKelasemen();
	loadJadwalYangDisimpan();

};

export default loadPage;