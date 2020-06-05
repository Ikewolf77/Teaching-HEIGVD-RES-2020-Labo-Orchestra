var args = process.argv.slice(2);

console.log("Bonjour ", args);

if(args.length > 1 || args.length < 1){
    
    console.log("Must provide 1 argument");

} else {

    var sound;
    switch(args[0]){
        case "piano":
            sound = "ti-ta-ti"; break;
        case "trumpet":
            sound = "pouet"; break;
        case "flute":
            sound = "trulu"; break;
        case "violin":
            sound = "gzi-gzi"; break;
        case "drum":
            sound = "boum-boum"; break;
        default:
            console.log("Invalid instrument choice"); return;   
    }
    console.log(sound);
}