const { TK303 } = require("./adapters/tk303");

tk303 = new TK303();

x = tk303.messageDecoding(
  "imei:353451044508750,001,0809231929,13554900601,F,055403.000,A,2233.1870,N,11354.3067,E,0.00,30.1,65.43,1,0,10.5%,0.0%,28;"
);

console.log(x);
