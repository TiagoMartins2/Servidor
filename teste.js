var Kira = require('kira');
//Create new instance of Kira
var api = new Kira();

api.kill('localhost:8080/try', 200, 10000);