var args = process.argv.slice(2);
var musicians = new Map();
var moment = require('moment');

//protocol
const protocol = {
    multicast_address: "239.255.22.5",
    multicast_port: "9907"
}

//TCP
const Net = require('net');
const server = new Net.Server();
const TCPport = 2205;

server.listen(TCPport, function() {
    console.log(`Server listening for connection requests on socket localhost:${TCPport}`);
});

server.on('connection', function(socket) {
    console.log('A new connection has been established. Sending data...');

    //Send JSON
    socket.write(Buffer.from(JSON.stringify(generateMusicians())));
    console.log('Finished sending');
    socket.end();

    //Errors
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});

function generateMusicians(){
    //Send JSON
    var musiciansTAB = [];
    const keys = Array.from(musicians.keys());
    for(var i = 0; i < keys.length; ++i){
        const values = musicians.get(keys[i]);
        musiciansTAB.push({
            uuid : keys[i],
            instrument : values[0],
            activeSince : values[1]
        });
    }
    return musiciansTAB;
}

//socket UDP
const dgram = require('dgram');
const s = dgram.createSocket('udp4');
s.bind(protocol.multicast_port, function() {
    console.log("Joining multicast group");
        s.addMembership(protocol.multicast_address);
    }
);

s.on('message', 
    function(msg, source) {
        console.log("Data has arrived: " + msg + ". Source IP: " + source.address + ". Sourceport: " + source.port);
        const musician = JSON.parse(msg.toString());
        var instrument;

        switch(musician.sound){
            case "ti-ta-ti":
                instrument = "piano"; break;
            case "pouet":
                instrument = "trumpet"; break;
            case "trulu":
                instrument = "flute"; break;
            case "gzi-gzi":
                instrument = "violin"; break;
            case "boum-boum":
                instrument = "drum"; break;
            default:
                console.log("Unknown instrument"); return;   
        }

        musicians.set(musician.uuid,[instrument,musician.timestamp]);       
    }
);

//check inactive musicians

function checkInactiveMusicians(){
    for(const [key, value] of musicians.entries()){
        if(moment().diff(value[1], 'seconds') > 5){
            musicians.delete(key);
        }
    }
}

setInterval(checkInactiveMusicians, 1000);

