import './lib/idb.js';
import './nav.js';
import urlBase64ToUint8Array from './utils/urlBase64ToUint8Array.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../service-worker.js')
      .then(() => {
        console.log('Pendaftaran ServiceWorker berhasil');
      })
      .catch(() => {
        console.log('Pendaftaran ServiceWorker gagal');
      });
  });
} else {
  console.log('ServiceWorker belum didukung browser ini');
};

if ('Notification' in window) {
  Notification.requestPermission().then(result => {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    navigator.serviceWorker.getRegistration().then(registration => {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BPYpSwZ0L-N1vYicgdPpYAtg8L1Uwh1Sm1TgxTyVhCseWsT2Gr8ev_ULEHEthcvtkI2cq2IsbQF99bJcDwgil_Y')
        }).then(subscribe => {
            console.log('endpoint: ', subscribe.endpoint);
            console.log('p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(e => {
            console.error(e.message);
        });
    });
  });
}
