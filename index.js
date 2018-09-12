const SerialPort = require('serialport');
const notifier = require('node-notifier');
const conf = require("./atring.conf");
var tty = new SerialPort(conf.ttyToPhone, {
    baudRate: 4600
});
tty.write('AT', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
      process.exitCode=-1;
      process.exit();
    }
    tty.on('data', function (data) {
        if(data == data.toString()){
            if(data.toString() !== "AT"){
            notifier.notify({
                title: "Who's calling you!",
                message: data.toString(),
                icon: "./ring.jpg"
              });
            }
        }
      });
       
});
   