// Load Models
const User = require('../models/User');
const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
var config = require('../config/database');

// const mongoNotConnected = require('../utils/checkMongooseConnection');
// const path = require('path');
// const fs = require('fs');
// const slugify = require('../utils/slugify');
// const Msg = require('../utils/constant');

// module.exports.products_list = async (req, res) => {
//   let items = await Product.find()
//     .populate({
//       path: 'seller',
//       select: 'handle'
//     })
//     .exec()
//     .catch((err) => console.log(err));

//   res.json(items);
// };

module.exports.isUser = async (req, res) => {
    res.json({
      isUser: true,
      user: req.user
    });
}

module.exports.userAuthenticationFailure = async (req, res) => {
  res.json({
    isUser: false
  });
}

module.exports.signup_user = async (req, res) => {
  //validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array().map(value => {
      return value.msg
    });
    return res.json({
      success: false,
      msg: err_array
    });
  }

  //check admin email
  var admins = config.adminEmails;
  for (var i = 0; i < admins.length; i++) {
    if (admins[i] == req.body.email) {
      return res.json({
        success: false,
        msg: ["This email already exists"]
      });
    }
  }

  //check company email
  Company.findOne({
    email: req.body.email
  }, function (e, company) {
    if (e) throw e;

    if (company)
      return res.json({
        success: false,
        msg: ["This email already exists"]
      });

    //create a new document
    var newUser = new User({
      email: req.body.email,
      fullName: req.body.fullName
    });

    //encrypt password using bcrypt
    newUser.setPassword(req.body.password, function (error, isSuccess) {
      if (isSuccess && !error) {
        newUser.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              msg: ["This email already exists"]
            });
          }
          res.json({
            success: true,
            msg: ['Successfully created new user.']
          });
        });
      } else {
        res.json({
          success: false,
          msg: ["Hash problem"]
        });
      }
    });


  });
};

module.exports.signin_user = async (req, res) => {
  //validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array().map(value => {
      return value.msg
    });
    return res.json({
      success: false,
      msg: err_array
    });
  }
  // console.log(req.body.email);
  // console.log(req.body.password);
  User.findOne({
      email: req.body.email
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          msg: 'User not found.'
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            //create token for user  
            var token = jwt.sign(user.toJSON(), config.secretUser);
            res.json({
              success: true,
              token: config.passportScheme + " " + token
            });
          } else {
            res.json({
              success: false,
              msg: 'Wrong password.'
            });
          }
        });
      }
    });
};

// module.exports.product_search = async (req, res) => {
//   if (req.query.name) {
//     let name = req.query.name;
//     let items = await Product.find({
//       name: {
//         $regex: name,
//         $options: 'i',
//       },
//     }).catch((err) => console.log(err));
//     res.json(items);
//   } else {
//     res.json([]);
//   }
// };

// module.exports.product_info = async (req, res) => {
//   console.log(req.params);

//   let errors = {};
//   if (req.params.link) {
//     let link = req.params.link;
//     try {
//       let product = await Product.findOne({
//           link
//         })
//         .populate({
//           path: 'seller',
//           select: 'handle'
//         })
//         .exec();

//       if (product) {
//         res.status(200).json({
//           product
//         });
//       }
//     } catch (error) {
//       errors.message = Msg.UNKNOW_ERROR;
//     }
//   } else {
//     errors.message = Msg.NO_PRODUCT_LINK;
//     res.status(400).json({
//       errors
//     });
//   }

//   return res;
// };

// module.exports.product_new = async (req, res, next) => {
//   const {
//     errors,
//     isValid
//   } = validateProduct(req);
//   if (!isValid) {
//     fs.unlink(
//       path.join(__dirname, '../../uploads/', req.file.filename),
//       function (error) {
//         if (error) {
//           throw error;
//         }
//         console.log('Failed Validation, Deleted image!');
//       }
//     );
//     return res.status(400).json({
//       errors
//     });
//   }
//   console.log(req.file);
//   try {
//     // Check if mongo is connected
//     if (mongoNotConnected()) {
//       errors.message = Msg.DATABASE_DISCONNECT_ERROR;
//       return res.status(400).json({
//         errors
//       });
//     }

//     let token = req.headers.authorization;
//     if (!token) {
//       errors.auth = 'not valid';
//       res.status(401).json(errors);
//     }

//     let user = jwt.decode(token.split(' ')[1]);
//     if (user) {
//       const {
//         filename
//       } = req.file;
//       let seller = user.id;
//       let image = 'uploads/' + filename;
//       let name = req.body.name;
//       let category = req.body.category;
//       let price = req.body.price.replace(/[^\d.]/g, ''); // removing non-digit or dot characters
//       let description = req.body.description;
//       let qty = req.body.qty;
//       let link = slugify(req.body.name) + '-' + new Date().valueOf();

//       let product = new Product({
//         seller,
//         link,
//         name,
//         price,
//         category,
//         image,
//         description,
//         qty,
//         hasStock: qty > 0,
//       });

//       product.save().then((product) => {
//         console.log('Prod created');
//         res.json({
//           product
//         });
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports.product_list_seller = async (req, res) => {
//   // Respond with all products created by user
//   res.json([]);
// };

// module.exports.product_delete = async (req, res) => {
//   // Delete a particular product
//   res.json([]);
// };

// module.exports.product_update = async (req, res) => {
//   // Update a product
//   res.json([]);
// };

// /* const formatMoney = (
//     amount,
//     decimalCount = 2,
//     decimal = '.',
//     thousands = ','
// ) => {
//   try {
//     decimalCount = Math.abs(decimalCount);
//     decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

//     const negativeSign = amount < 0 ? '-' : '';

//     let i = parseInt(
//         (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
//     ).toString();
//     let j = i.length > 3 ? i.length % 3 : 0;

//     return (
//       negativeSign +
//       (j ? i.substr(0, j) + thousands : '') +
//       i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
//       (decimalCount
//         ? decimal +
//           Math.abs(amount - i)
//               .toFixed(decimalCount)
//               .slice(2)
//         : '')
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }; */
