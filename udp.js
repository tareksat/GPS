var udp = require('dgram');

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  try{
    console.log(messageDecoding(msg.toString()));
  }
  catch(error){
    console.log(error.message);
  }
  
  //console.log('Data received from client : ' + msg.toString());
 // console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

//sending msg
server.send(msg,info.port,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }

});

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

////////////////////////// Decoding Received Data /////////////////////////

messageDecoding = (message) => {
  let id, keyword, phone, time, latitude, longitude, speed, ac_state, door_state, fuel_leve, temp;
  y = message.split(':')[1].split(',');
  id = y[0];
  keyword = y[1];
  time = y[2];
  phone = y[3];
  latitude = y[7];
  longitude = y[9];
  speed = y[11];
  ac_state = y[14];
  door_state = y[15];
  fuel_level = y[16];
  temp = y[18];
  
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
      temp
  }
  return(data);

}

//////////////////////////////////////////////////////////////////////////

server.bind(3001);

