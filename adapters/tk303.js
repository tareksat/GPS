class TK303 {
  constructor() {
    let imei;
    let keyword;
    let phone;
    let time;
    let latitude;
    let longitude;
    let speed;
    let ac_state;
    let door_state;
    let fuel_leve;
    let temp;
  }

  // decode GPS module data
  // 1. returns object contains data
  // 2. return null if failed to decode data
  messageDecoding = (message) => {
    //try {
    message = message.trim().replace(";", "");
    let y = message.split(":")[1].split(","); // remove imei:

    return {
      imei: (this.imei = y[0]),
      keyword: (this.keyword = y[1]),
      time: (this.time = y[2]),
      phone: (this.phone = y[3]),
      latitude: (this.latitude = this.convert_coordinates(y[7])),
      longitude: (this.longitude = this.convert_coordinates(y[9])),
      speed: (this.speed = y[11]),
      acc_state: (this.ac_state = y[14]),
      door_state: (this.door_state = y[15]),
      fuel_level: (this.fuel_level = y[16]),
      temp: (this.temp = y[17]),
    };
    // } catch (err) {
    //   return null;
    // }
  };

  getImei = (data) => {
    const d = messageDecoding(data);
    if (d !== null) {
      return {
        imei: d.imei,
        type: "TK303",
      };
    }
    return null; // if not TK303
  };

  convert_coordinates = (str) => {
    if (str === "") {
      return "";
    }
    try {
      let lat = parseFloat(str);
      let deg = parseInt(lat / 100);
      let min = parseInt(lat - deg * 100);
      let sec = lat % 1;
      min = (min + sec).toFixed(4);
      const value = (deg + min / 60 + sec / 3600).toFixed(7);

      return `${deg} ${min}`;
    } catch (err) {
      return "";
    }
  };
}

module.exports.TK303 = TK303;
