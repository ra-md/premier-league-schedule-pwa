import '../uuidv4.min.js';

const dbPromised = idb.open('info-pl', 1, upgradeDb => {
  const matchesStore = upgradeDb.createObjectStore('matches', { keyPath: 'id' });
  matchesStore.createIndex('id', 'id', { unique: false });
});

async function matchesStore(type) {
	const db = await dbPromised;
	const tx = db.transaction('matches', type);
	const store = tx.objectStore('matches');

	return store;
}

async function save(match) {

	const id = uuidv4();

	const matchDenganBtnHapus = match.replace(
		`<h6 class="right mx-2 btn-simpan">Simpan</h6>`, 
		`<h6 id="${id}" class="right mx-2 btn-hapus">Hapus</h6>`
	);
		
	const obj = {
		id,
		matchDenganBtnHapus
	};

	return new Promise(async resolve => {
		const store = await matchesStore('readwrite');

		store.add(obj);

		resolve('Berhasil disimpan');
	});

};

function getAll() {
  return new Promise(async resolve => {
    const store = await matchesStore('readonly');

    const allData = await store.getAll();

    resolve(allData);
  });
};

function deleteJadwal(id) {
	return new Promise(async resolve => {
	  const store = await matchesStore('readwrite');

    store.delete(id);

    resolve('Berhasil dihapus');
	})
};

export default { save, getAll, deleteJadwal };
