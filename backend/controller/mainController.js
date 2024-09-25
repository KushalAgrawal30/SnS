const fs = require('fs');
const axios = require('axios');
const { getJson } = require("serpapi");
const { Product } = require('../model/model')
const { User } = require('../model/model')
const { Notify } = require('../model/model')


const IMGBB_API_KEY = "8a496163927b9d9e0480e2850c8f8047";
const GOOGLE_API_KEY = "e46eb16e06b86f316f7c4fcb0059c24f949e1cec889d9dcbdfc087f140452d40"


