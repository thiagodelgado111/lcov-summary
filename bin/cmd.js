#!/usr/bin/env node
var summary = require('../');
var concat = require('concat-stream');
var fs = require('fs');
var file = process.argv[2];

var mode = process.argv[3];
var input = file && file !== '-'
        ? fs.createReadStream(process.argv[2])
        : process.stdin
    ;
input.pipe(concat(function (buf) {
    summary(buf.toString('utf8'), mode, function (error, output) {
        if (error) {
            return console.error(error);
        }
        console.log(output);
    })
}));
