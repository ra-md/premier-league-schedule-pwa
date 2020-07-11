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
	return new Promise(async resolve => {
		const store = await matchesStore('readwrite');

		store.put(match);

		resolve('Berhasil disimpan');
	});
}

function getAll() {
  return new Promise(async resolve => {
    const store = await matchesStore('readonly');

    const allData = await store.getAll();

    resolve(allData);
  });
}

function getById(id) {
	return new Promise(async resolve => {
		const store = await matchesStore('readonly');
		resolve(store.get(id));
	});
}

function deleteJadwal(id) {
	return new Promise(async resolve => {
	  const store = await matchesStore('readwrite');

    store.delete(id);

    resolve('Berhasil dihapus');
	});
}

export default { save, getAll, deleteJadwal, getById };
