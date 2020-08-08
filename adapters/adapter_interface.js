const { TK303 } = require("./tk303");
const { findByImei, update } = require("../database/modules_database");

tk303 = new TK303();

/*
  a. Figure out the type
  b. auth module based on type
  c. if auth ok decode data and save in databse
  d. depending on type send string back to the device to keep sending data
*/

module.exports.route = function route(data, ip, port, callback) {
  const res = tk303.messageDecoding(data);

  if (res) {
    // module type is TK303
    findByImei(res.imei, (x) => {
      if (x === "Found") {
        update({
          imei: res.imei,
          phone: res.phone,
          type: "TK303",
          status: "online",
          ip: ip,
          port: port,
          last_data: data,
        });
        callback("ON");
      }
    });
  }

  return null;
};
