const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BPYpSwZ0L-N1vYicgdPpYAtg8L1Uwh1Sm1TgxTyVhCseWsT2Gr8ev_ULEHEthcvtkI2cq2IsbQF99bJcDwgil_Y',
  privateKey: 'OJCDJDL8R4Ts-hm83iy2gjG4oUoLaOes2ID4nqzdHts'
};
  
webPush.setVapidDetails(
  'mailto:rraa7000@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/f_OmoR9soCo:APA91bEu5lZDvpyxT1dlEYTAH8KTm39xB4MoVTnNw1r-PcTcKC2uUyXXolGftAKnD2arxy61_P-jPBI6RP2ikY7MpF1OotcH5AJ6cT7UCM-eRoSVNVy5QPk2wMWaA49Nlrxo2JtXhinG',
  keys: {
    p256dh: 'BENhN9WtQInfA95PLs8DZ17hCb0AAAR+QgWx6mrSlMggb07QcHHRgp0NVZYdSuDj/MTko+cfRMjtAL7pbzd0b10=',
    auth: 'Ft1rp8lSMyfMlWdGjCFDuQ=='
  }
};

const payload = 'push notifikasi menggunakan payload!';
 
const options = {
  gcmAPIKey: '119700375605',
  TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);