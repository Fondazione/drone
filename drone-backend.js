var Cylon = require('cylon');
var ws = require('nodejs-websocket');
var bot;

var timeline = 0;


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

function addToTimeline(timeDifference, flyFunc){
    timeline += timeDifference * 1000;
    after(timeline, flyFunc);
}

function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();

    var droneSpeed = 0.1;

    addToTimeline(1, function() {
        bot.drone.hover();
    });

    addToTimeline(1, function() {
        bot.drone.left(droneSpeed);
    });

    addToTimeline(1, function() {
        bot.drone.hover();
    });

    addToTimeline(1, function() {
        bot.drone.forward(droneSpeed);
    });

    addToTimeline(1, function() {
        bot.drone.land();
    });

    addToTimeline(5, function() {
        bot.drone.stop();
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