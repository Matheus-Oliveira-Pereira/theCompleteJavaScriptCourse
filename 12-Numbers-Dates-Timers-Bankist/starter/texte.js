let data = new Date();
// Fri Nov 16 2018 18:36:40 GMT-0200 (Horário de Verão de Brasília)

let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
var dataBase = data2.toISOString().replace(/\.\d{3}Z$/, '');
