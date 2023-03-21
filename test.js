const apiKey = require('./src/models/apikey.model');
const shop = require('./src/models/shop.model');
require('./src/dbs/init.mongoose');

// const testKey = apiKey.create({
//     key: 'test',
//     status: true,
//     permissions: ['0000']
// });

// console.log(testKey.then((data) => {
//     console.log(data);
// }));

console.log(shop.find({}).lean());