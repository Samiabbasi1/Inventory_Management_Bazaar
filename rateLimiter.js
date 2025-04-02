const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests. Please try again later."
});
