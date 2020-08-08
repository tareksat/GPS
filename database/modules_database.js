let modules = require("./dataFile");

GPS_modules = modules.GPS_modules;
//////////////////////// insert new GPS module ///////////////////////
function insert(obj) {
  GPS_modules.push(obj);
}

////////////////////////// remove /////////////////////////////////
function removeModule(imei) {
  return new Promise((resolve) => {
    GPS_modules = GPS_modules.filter((gps) => gps.imei !== imei);
    resolve();
  });
}

///////////////////////// update  //////////////////////////////
function update(data) {
  return new Promise((resolve) => {
    GPS_modules.map((gps, i) => {
      if (gps.imei === data.imei) {
        GPS_modules[i] = data;
      }
    });
    resolve(data);
  });
}

////////////////////// find by imei////////////////////////////
function findByImei(imei, callback) {
  GPS_modules.map((gps) => {
    if (gps.imei === imei) {
      callback("Found");
    }
  });
}

module.exports.insert = insert;
module.exports.update = update;
module.exports.removeModule = removeModule;
module.exports.findByImei = findByImei;
