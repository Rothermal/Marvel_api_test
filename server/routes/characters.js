/**
 * Created by JFCS on 3/2/16.
 */
var express = require('express');
var path = require('path');
//var request = require('request');
var md5 = require('md5');
var needle = require('needle');
var dotenv = require('dotenv').config();
var router = express.Router();
var timeStamp = Date.now();
var apiKey = process.env.publicKey;
var apiPrivateKey = process.env.privateKey;
var apiTs = timeStamp;
var md5Hash = md5(timeStamp + apiPrivateKey + apiKey);
var apiHash = md5Hash;
var url ="http://gateway.marvel.com:80/v1/public/characters/1009220?";

router.get('/',function(request,res){
res.send(needle.request('get',url,{
    "apikey": apiKey,
    "ts": apiTs,
    "hash": apiHash
},function(error,response) {
    console.log(response.headers);
    console.log(response.body.data);

}));

});

module.exports = router;