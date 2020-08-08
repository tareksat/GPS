let udp = require("dgram");
let { update, findByImei } = require("./database/modules_database");
const { tk303GetImei } = require("./adapters/tk303");
const { route } = require("./adapters/adapter_interface");

var server;

function createUdpServer(portNum) {
  server = udp.createSocket("udp4");

  server.on("error", function (error) {
    console.log("Error: " + error);
    server.close();
  });

  server.on("message", function (msg, info) {
    try {
      submitGpsData(msg.toString(), info.address, info.port);
    } catch (error) {
      console.log(error.message);
    }
  });

  server.on("listening", function () {
    console.log("Server is listening at port " + portNum);
  });

  server.on("close", function () {
    console.log("Socket is closed !");
  });

  server.bind(portNum);
}

function sendToGPS(data, ip, port) {
  server.send(data, port, ip, function (error) {
    if (error) {
      client.close();
    } else {
    }
  });
}

//////////////////  interface /////////////////////////////////

///////////////////////////////   interface functions //////////////////////////////
/*
   1. Get gps module data from udp server and do the follwoing :
    a. authenticate device : 
      1). If OK update ip, port, data, and status to online.
      2). Call GPS adpater according to GPS Type.

  2. respond to incomming command from express API and send codes to corresponding GPS module

  

*/

async function submitGpsData(data, ip, port) {
  route(data, ip, port, function (res) {
    if (res) {
      sendToGPS(res, ip, port);
    } else {
      console.log("Not Authinticated Module...");
    }
  });
}

///////////////////////////////////////////////////////////////

module.exports.createUdpServer = createUdpServer;
