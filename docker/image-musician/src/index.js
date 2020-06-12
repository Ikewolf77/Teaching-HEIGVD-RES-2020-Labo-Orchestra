var args = process.argv.slice(2);
var musician = new Object();

//depedencies
const { v4: uuidv4 } = require('uuid');
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

//generate UUID
musician.uuid = uuidv4();
console.log("UUID : ", musician.uuid);

//protocol
const protocol = {
    multicast_address: "239.255.22.5",
    multicast_port: "9907"
}

function emitUDP(protocol, socket, object){

    object.timestamp = Date.now();
    const payload = JSON.stringify(object);
    message = new Buffer(payload);

    socket.send(message, 0, message.length, protocol.multicast_port, protocol.multicast_address,
        function(err, bytes) {
            console.log("Sending payload: " + payload + " via port " + socket.address().port);
        }
    );
}

//Check args
if(args.length > 1 || args.length < 1){
    
    console.log("Must provide 1 argument");

} else {

    switch(args[0]){
        case "piano":
            musician.sound = "ti-ta-ti"; break;
        case "trumpet":
            musician.sound = "pouet"; break;
        case "flute":
            musician.sound = "trulu"; break;
        case "violin":
            musician.sound = "gzi-gzi"; break;
        case "drum":
            musician.sound = "boum-boum"; break;
        default:
            console.log("Invalid instrument choice"); return;   
    }
    console.log(musician.sound);
}

setInterval(emitUDP, 1000, protocol, socket, musician);