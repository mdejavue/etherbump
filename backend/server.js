var Web3 = require('web3'),
    web3 = new Web3(),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port);
console.log('Restful server started at port: ' + port);

console.log(web3);
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
var coinbase = web3.eth.coinbase;
var balance = web3.eth.getBalance(coinbase);
console.log(balance);