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

messageDecoding = (message) => {
  message = message.trim().replace(";", "");
  let id,
    keyword,
    phone,
    time,
    latitude,
    longitude,
    speed,
    ac_state,
    door_state,
    fuel_leve,
    temp;
  y = message.split(":")[1].split(",");
  id = y[0];
  keyword = y[1];
  time = y[2];
  phone = y[3];
  latitude = convert_coordinates(y[7]);
  longitude = convert_coordinates(y[9]);
  speed = y[11];
  ac_state = y[14];
  door_state = y[15];
  fuel_level = y[16];
  temp = y[17];

  const data = {
    id,
    keyword,
    time,
    phone,
    latitude,
    longitude,
    speed,
    ac_state,
    door_state,
    fuel_level,
    temp,
  };
  return data;
};

module.exports = messageDecoding;
