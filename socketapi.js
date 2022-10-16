const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var username = []; // "username" ki jagah "user" for commented code 
var userId = [];

// Add your socket.io logic here!
//io.on( "connection", function( socket ) {
////user++;
////console.log( `A user connected total: ${user}` );

////socket.on("disconnect", function(){
////////user--;
////////console.log(`A user disconnected total: ${user}`);
////})
//});
// end of socket.io logic

io.on("connection", function(socket){
    //console.log("connected !");
    io.emit("onlineusers", username);

    socket.on("typing", function(){
        socket.broadcast.emit("typing", {username: username[userId.indexOf(socket.id)]})
    })

    socket.on("msg",function(data){
        let userkanaam = username[userId.indexOf(socket.id)];
        io.emit("msg", {username: userkanaam, msg: data});
    })

    socket.on("disconnect", function(){
        let index =  userId.indexOf(socket.id);
        username.splice(index,1);
        userId.splice(index,1);
        console.log(username, userId);
    })

    socket.on("naammila",function(data){
        username.push(data);
        userId.push(socket.id);
        io.emit("onlineusers", username);
        console.log(username, userId);
    })
});

module.exports = socketapi;