const express = require("express");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validationToken = asyncHandler((req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader || authHeader.startwith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decode.user;
      console.log(req.user.id);
      next();
    });

    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
  }
});
 
module.exports=validationToken;