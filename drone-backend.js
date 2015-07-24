var Cylon = require('cylon');
var ws = require('nodejs-websocket');
var bot;


// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
connection: "ardrone"
})
    .on("ready", fly);

function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();

    after(2*1000, function() {
        bot.drone.left(0.5);
    });

    after(4*1000, function() {
        bot.drone.hover();
    });

    after(8*1000, function() {
        bot.drone.forward(0.5);
    });

    after(10*1000, function() {
        bot.drone.land();
    });

    /*bot.drone.right (0.5);
    bot.drone.front(0.5);
    bot.drone.back (0.5);
    bot.drone.left (0.5);

    bot.drone.up (0.5);
    bot.drone.down (0.5);
    bot.drone.land();*/
}

Cylon.start();