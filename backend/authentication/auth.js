const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
  const {
    headers: {authorization},
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

//get user token from req headers
// getToken = function (headers) {
//   if (headers && headers.authorization) {
//     var parts = headers.authorization.split(' ');
//     if (parts.length === 2) {
//       return parts[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
