const express = require('express');
const { randomBytes } = require('crypto');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());