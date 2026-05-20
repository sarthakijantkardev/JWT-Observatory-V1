const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({

    userId: mongoose.Schema.Types.ObjectId,

    username: String,
    email: String,

    token: String,

    ip: String,
    device: String,
    language: String,
    encoding: String,
    method: String,
    url: String,
    hostname: String,
    protocol: String,
    isSecure: Boolean,
    authHeader: String,
    cookies: Object,
    query: Object,
    params: Object,
    body: Object,
    referrer: String,
    origin: String,
    contentType: String,
    connection: String,
    httpVersion: String,
    rawHeaders: Array,
    clientPort: String,
    timestamp: Date,
    host: String,
    forwarded: String,
    realIP: String,
    cacheControl: String,
    contentLength: String,
    accept: String,

    replayAttack: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model("session", sessionSchema);