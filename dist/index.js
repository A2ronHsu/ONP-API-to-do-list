"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var server = (0, express_1.default)();
server.get('./', function (req, res) {
    return res.write('hhihihihih');
}).listen(3000);
