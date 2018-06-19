var express = require('express');
var router = express.Router()
var bcrypt = require('bcrypt');
var User = require('../model/userModel');
var Picture = require('../model/pictures');
var Buyer = require('../model/buyers');
var Bids = require('../model/bids');
var Product = require('../model/product');
var Event = require('../model/event');
var Blogpost = require('../model/blogpost');
var Video = require('../model/videos');
var Audio = require('../model/audio');
var Newsletter = require('../model/newsletter');
var Contactform = require('../model/contactform');
var Contactartist = require('../model/contactartist');
var moment = require('moment')
var validator = require("express-validator")
var generator = require("generate-password")
var jwt = require('jsonwebtoken');
var formidable = require('formidable');
var fs = require("fs")
var cloudinary = require("cloudinary")
var data = require("../data")
var dotenv = require('dotenv')
dotenv.config();
cloudinary.config({
  cloud_name: 'afrikal',
  api_key: '345824351715158',
  api_secret: '55TwfraW6ST15TGvq6tjHSF9NfA'
})


//nodemailer

//user login route
router.post('/api/login', function (req, res, next) {
  var { email, password } = req.body;
  var error = {}
  if (email == "") error.email = "This field is required";
  if (password == "") error.password = "This field is required";
  if (error.password || error.email) {
    return res.json({ "error": error })
  }
  var data = {
    email: email
  }
  User.findOne({
    email: email
  }).then((user) => {
    console.log(user)
    
    if (user) {
      data.id = user._id
      data.firstName = user.firstName,
        data.lastName = user.lastName,
        data.dp = user.dpUrl,
        data.bgUrl = user.bgUrl,
        data.paid = user.paid,
        data.membership = user.membership,
        data.verified = user.verified,
        data.industry = user.selectedIndustry,
        // console.log(user)
        bcrypt.compare(password, user.password).then((valid) => {
          if (valid) {
              var token = jwt.sign(data, "h1a2b3e4e5b6").toString();
              res.header('x-auth', token).json({ "token": token });
          } else res.json({ "error": { "email": "Please enter a valid email/password", password: "incorrect password"  } })
        }).catch((error) => (console.log(error)));
    } else res.json({ "error": { "email": "Please enter a valid email/password", password: "incorrect password" } })
  })
})
  .post("/api/payout", (req, res, next) => {
    var sender_batch_id = Math.random().toString(36).substring(9);
    var create_payout_json = {
      "sender_batch_header": {
        "sender_batch_id": sender_batch_id,
        "email_subject": "You have a payment"
      },
      "items": [
        {
          "recipient_type": "EMAIL",
          "amount": {
            "value": 0.90,
            "currency": "USD"
          },
          "receiver": "shirt-supplier-three@mail.com",
          "note": "Thank you.",
          "sender_item_id": "item_3"
        }
      ]
    };

    var sync_mode = 'true';

    paypal.payout.create(create_payout_json, function (error, payout) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log("Create Single Payout Response");
        payout.batch_header.links.map((link) => {
          if (link.href) res.json({ paymentUrl: link.href })
        });
        console.log(payout);
      }
    });
  })
//user signup route
router.post('/api/register', function (req, res, next) {
  const {  selectIndustry, selectCategory, bio,
    style,
    studies,
    instrument,
    dob,
    token,exp,bop } = req.body;
  let time = new Date();
  let error = {}
  let newbio;
  let text = "This field is required";
  let selectedIndustry = data.industry[selectIndustry].title;
  if (selectCategory == "") error.selectCategory = text
  if (selectIndustry == "") error.selectIndustry = text
  bio !== "" ? newbio = bio : newbio = "Hi there, i am new to Bidders"
  if (error.selectCategory || error.selectIndustry) {
    return res.json({ error })
  }

  const verify = jwt.verify(token, "h1a2b3e4e5b6")
  if (verify) {
    const userData = jwt.decode(token)
    User.findOneAndUpdate({ email: userData.email }, {
      selectedIndustry, selectedCategory: selectCategory, industryKey: selectIndustry, bio: newbio, style,
      studies,
      instrument,
      registration:true,
      workExp:exp, bop}).then((user) => {
      console.log(req.body)
      if (user) {
        const data = {
          email: user.email
        }
        data.id = user._id
        data.firstName = user.firstName
        data.lastName = user.lastName
        data.dp = user.dpUrl
        data.bgUrl = user.bgUrl
        data.paid = user.paid
        data.membership = user.membership
        data.verified = user.verified
        data.industry = selectedIndustry;
        var token = jwt.sign(data, "h1a2b3e4e5b6").toString();
        res.header('x-auth', token).json({ "success": { "token": token, server: "Account updated successfully" } });

      }
    }).catch((err) => { console.log(err); res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })
  }
})
  .post("/api/membership_payment", (req, res, next) => {
    console.log("payment next")
    var create_payment_json = {
      "intent": "sale",
      "redirect_urls": {
        "return_url": "https://Biddersserver.herokuapp.com/login",
        "cancel_url": "https://Biddersserver.herokuapp.com/cancel"
      },
      "payer": {
        "payment_method": "paypal",
        "payer_info": {
          "tax_id_type": "BR_CPF",
          "tax_id": "Fh618775690",
        }
      },
      "transactions": [
        {
          "amount": {
            "total": "10.00",
            "currency": "USD"
          },
          "description": "This is the payment transaction description.",
          "custom": "EBAY_EMS_90048630024435",
          "invoice_number": "48787589677",
          "payment_options": {
            "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
          },
          "soft_descriptor": "ECHI5786786",
          "item_list": {
            "items": [
              {
                "name": "bowling",
                "description": "Bowling Team Shirt",
                "quantity": "1",
                "price": "10",
                "tax": "0",
                "sku": "1",
                "currency": "USD",
              }

            ],
            "shipping_address": {
              "recipient_name": "Betsy Buyer",
              "line1": "111 First Street",
              "city": "Saratoga",
              "country_code": "US",
              "postal_code": "95070",
              "state": "CA"
            }
          }
        }
      ]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      console.log(payment)
      if (error) {
        console.log(error.response.details)
      } else {
        payment.links.map((link) => {
          if (link.rel === "approval_url") res.json({ paymentUrl: link.href })
        });
        console.log(payment)
        console.log("Create Payment Response");
      }
    });
  })
  .get("/api/success", (req, res, next) => {
    // let {PayerID,token} = req.body;
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID
    console.log(req.query.paymentId)
    var execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": "10.00"
        }
      }]
    };

    // var paymentId = 'PAYMENT id created in previous step';

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
        console.log(error)
        // throw error;
      } else {
        console.log("Get Payment Response");
        console.log(JSON.stringify(payment));
      }
    });
  })
  .post("/api/payment_successful", (req, res, next) => {
    let time = new Date();
    const token = req.body.token;
    const userData = jwt.verify(req.body.token, "o1l2a3m4i5d6e")
    console.log(userData)
    
    if (userData) {
      const { username, password, firstName, lastName, email, dob, street,membership, country, city, state, company, phone } = userData.data
      // let userData = jwt.decode(req.body.token);
      bcrypt.hash(password, 10).then((hash) => {
        // var newUser = new User({
        //   paid: true,
        //   date: time,
        // });
        User.create({
          username, password: hash, firstName, lastName, email, dob, address:street, membership, country, city, state, company, phone,
          paid: true,
          date: time,
        })
        // newUser.save()
        .then((user) => {
          if (user) {

            const nodemailer = require('nodemailer');

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            // nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            // mail.Bidders.com
            let transporter = nodemailer.createTransport({
            //   tls: {
            //     rejectUnauthorized: false
            //   },
            //   host: 'mail.Bidders.com',
            //   port: 465,
            //   secure: true, // true for 465, false for other ports
            //   auth: {
            //     user: "info@Bidders.com", // generated ethereal user
            //     pass: "q#sui?ql)lsY@d_Tz%" // generated ethereal password
            //   }
            // });
              tls: {
                rejectUnauthorized: false
              },
              host: 'smtp.sendgrid.net',
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "apikey", // generated ethereal user
                pass: process.env.SENDGRID_API_KEY // generated ethereal password
              }
            });
            // setup email data with unicode symbols
            let mailOptions = {
              from: '"Bidders 👻" <info@Bidders.com>', // sender address
              to: `${email},habibmail31@gmail.com`, // list of receivers
              subject: 'Account Registration ✔', // Subject line
              text: 'Hello?', // plain text body
              headers: {
                "X-SMTPAPI": {
                  "category": [
                    "Orders"
                  ]
                }
              },
              html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>Bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Congratulations! your Bidders account has successfully been created</small></p><h2>Verify Your Email</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to verify your email.</small></p><p style="margin: 30px"> <a href="https://Bidders.com/verify/' + token + '" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Verify Email</a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto">Atavist | Brooklyn, New York, 11201 | Copyright © 2015 | All rights reserved</div></body>' // html body
            };
            let mailOptions2 = {
              from: '"Bidders 👻" <info@Bidders.com>', // sender address
              to: `habibmail31@gmail.com@gmail.com`, // list of receivers
              subject: 'Account Registration ✔', // Subject line
              text: `Hello, ${email} has just signup for the premium membership plan.`, // plain text body
              headers: {
                "X-SMTPAPI": {
                  "category": [
                    "Orders"
                  ]
                }
              },
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log(info);

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            transporter.sendMail(mailOptions2, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log(info);

              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
            // });
            res.json({ "success": { "server": "Account Created Successfully", token: token } })

          }
        }).catch((error) => { console.log(error); res.json({ error: { "server": "An error has occured" } }); })

      })
    }
  })
  .post("/api/signup", (req, res, next) => {
    let time = new Date();
    // const token = req.body.token;
    // const userData = jwt.verify(req.body.token, "o1l2a3m4i5d6e")

    // if (userData) {
      const { username, password, firstName, lastName, email, country, phone } = req.body
      // let userData = jwt.decode(req.body.token);
      bcrypt.hash(password, 10).then((hash) => {
        // var newUser = new User({
        //   paid: true,
        //   date: time,
        // });
        User.create({
          username, password: hash, firstName, lastName, email, country,phone,
          paid: false,
          date: time,
        })
          // newUser.save()
          .then((user) => {
            if (user) {
              console.log(user)
              const token = jwt.sign({...user},"o1l2a3m4i5d6e")
              const nodemailer = require('nodemailer');

              let transporter = nodemailer.createTransport({
            
                tls: {
                  rejectUnauthorized: false
                },
                host: 'smtp.sendgrid.net',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                  user: "apikey", // generated ethereal user
                  pass: process.env.SENDGRID_API_KEY // generated ethereal password
                }
              });
              // setup email data with unicode symbols
              let mailOptions = {
                from: '"Bidders 👻" <info@bidders.com>', // sender address
                to: `${email},habibmail31@gmail.com`, // list of receivers
                subject: 'Account Registration ✔', // Subject line
                text: 'Hello?', // plain text body
                headers: {
                  "X-SMTPAPI": {
                    "category": [
                      "Orders"
                    ]
                  }
                },
                html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>Bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Congratulations! your  account has successfully been Verified</small></p><h2>Logon to your dashboard</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to login to your dashboard.</small></p><p style="margin: 30px"> <a href="https://Biddersserver.herokuapp.com/login" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Login </a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto">Atavist | Brooklyn, New York, 11201 | Copyright © 2015 | All rights reserved</div></body>' // html body
              };
              let mailOptions2 = {
                from: '"Bidders 👻" <info@Bidders.com>', // sender address
                to: `habibmail31@gmail.com`, // list of receivers
                subject: 'Registration Alert', // Subject line
                text: `Hello, ${email} has just signup for the basic membership plan.`, // plain text body
                headers: {
                  "X-SMTPAPI": {
                    "category": [
                      "Orders"
                    ]
                  }
                },
              };
              // send mail with defined transport object
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log(info);

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              });
              // send mail with defined transport object
              transporter.sendMail(mailOptions2, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log(info);

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
              });
              // });
              res.json({ "success": { "server": "Account Created Successfully", token: token } })

            }
          }).catch((error) => { console.log(error); res.json({ error: { "server": "An error has occured" } }); })

      })
    // }
  })
  .post("/api/mpayment_successful", (req, res, next) => {
    let time = new Date();
    const token = req.body.token;
    const userData = jwt.verify(req.body.token, "o1l2a3m4i5d6e")
    // console.log(userData)
    
    if (userData) {
      const { firstName, lastName, email, bid, productTitle, productTime, organisation,productName,productID,  city, state, shipping, phone,price,product} = userData.data
      Bids.findOne({userID:userData.id}).then((user) => {
        if(user){
          res.json({error:"You have already place a bid for this item"})
        }else{
          Bids.create({ firstName, userID: userData.id, productTitle, lastName,bid, email, organisation, city, state, shipping, phone, price, date: time, productName, productID , imgUrl:product.imgUrl, description:product.description,startingat:product.price})
            // newUser.save()
            .then((user) => {
              if (user) {
                Product.update({ _id: productID }, { $inc: { stock: -1 } }).then((succ) => console.log(succ))

                const nodemailer = require('nodemailer');

                // Generate test SMTP service account from ethereal.email
                // Only needed if you don't have a real mail account for testing
                // nodemailer.createTestAccount((err, account) => {
                // create reusable transporter object using the default SMTP transport
                // mail.Bidders.com
                let transporter = nodemailer.createTransport({
                  tls: {
                    rejectUnauthorized: false
                  },
                  host: 'smtp.sendgrid.net',
                  port: 465,
                  secure: true, // true for 465, false for other ports
                  auth: {
                    user: "apikey", // generated ethereal user
                    pass: process.env.SENDGRID_API_KEY // generated ethereal password
                  }
                });

                // setup email data with unicode symbols
                let mailOptions = {
                  from: '"Bidders 👻" <info@Bidders.com>', // sender address
                  to: `${email},habibmail31@gmail.com`, // list of receivers
                  subject: 'Marketplace ✔', // Subject line
                  headers: {
                    "X-SMTPAPI": {
                      "category": [
                        "Orders"
                      ]
                    }
                  },
                  text: `Congratulations! you have purchase ${productName} at $${price}. your order will be deliver shortly. Thank you`, // plain text body
                  // html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>Bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Congratulations! your  account has successfully been Verified</small></p><h2>Logon to your dashboard</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to login to your dashboard.</small></p><p style="margin: 30px"> <a href="https://Biddersserver.herokuapp.com/login" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Login </a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto">Atavist | Brooklyn, New York, 11201 | Copyright © 2015 | All rights reserved</div></body>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    return console.log(error);
                  }
                  console.log('Message sent: %s', info.messageId);
                  // Preview only available when sending through an Ethereal account
                  console.log(info);

                  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });
                // });
                res.json({ "success": { "server": "Purchase was Successful", token: token, from: "mpayment" } })

              }
            }).catch((error) => { console.log(error); res.json({ error: { "server": "An error has occured" } }); })

        }
      })
 
    }
  })
  .post('/api/verify', (req, res, next) => {
    let verify = jwt.verify(req.body.token, "o1l2a3m4i5d6e");
    if (verify) {
      var userData = jwt.decode(req.body.token);
      
      if (userData.payment)
        User.findOneAndUpdate({ email: userData.data.email }, { paid: true, paymentId: userData.payment.paymentId, verified: true }).then((user) => {
      
          const nodemailer = require('nodemailer');

          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          // nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            tls: {
              rejectUnauthorized: false
            },
            host: 'smtp.sendgrid.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "apikey", // generated ethereal user
              pass: process.env.SENDGRID_API_KEY // generated ethereal password
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Bidders 👻" <info@Bidders.com>', // sender address
            to: `${userData.email}, habibmail31@gmail.com`, // list of receivers
            subject: 'Verification Successful ✔', // Subject line
            text: 'Hello world?', // plain text body
            headers: {
              "X-SMTPAPI": {
                "category": [
                  "verification"
                ]
              }
            },
            html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>Bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Congratulations! your  account has successfully been Verified</small></p><h2>Logon to your dashboard</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to login to your dashboard.</small></p><p style="margin: 30px"> <a href="https://Biddersserver.herokuapp.com/login" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Login </a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto">Atavist | Brooklyn, New York, 11201 | Copyright © 2015 | All rights reserved</div></body>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log(info);

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
          res.json({ success: "Verification successfully" })
        });
      else
        User.findOneAndUpdate({ email: userData.email }, { paid: true, verified: true }).then((res) => {
      
          const nodemailer = require('nodemailer');

          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          // nodemailer.createTestAccount((err, account) => {
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            tls: {
              rejectUnauthorized: false
            },
            host: 'mail.Bidders.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "info@Bidders.com", // generated ethereal user
              pass: "q#sui?ql)lsY@d_Tz%" // generated ethereal password
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Bidders 👻" <info@Bidders.com>', // sender address
            to: `${userData.email}, habibmail31@gmail.com`, // list of receivers
            subject: 'Verification Successful ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>Bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Congratulations! your  account has successfully been Verified</small></p><h2>Logon to your dashboard</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to login to your dashboard.</small></p><p style="margin: 30px"> <a href="https://Biddersserver.herokuapp.com/login" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Login </a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto">Atavist | Brooklyn, New York, 11201 | Copyright © 2015 | All rights reserved</div></body>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log(info);

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          });
          res.json({ suucess: "Verification successfully" })
        })
    }
  }
  )
router.post('/api/reset', (req, res) => {
  const { email } = req.body;
  let token;
  var date = new Date();
  User.findOne({ email }).then((user) => {
    if (user) {
      const password = generator.generate({
        length: 10,
        numbers: true
      });
      const hashedPassword = bcrypt.hashSync(password,10);
      token = jwt.sign({password:hashedPassword,email:email,date},"o1l2a3m4i5d6e")
      const nodemailer = require('nodemailer');
      let transporter = nodemailer.createTransport({
        tls: {
          rejectUnauthorized: false
        },
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "apikey", // generated ethereal user
          pass: process.env.SENDGRID_API_KEY // generated ethereal password
        }
      });
      // setup email data with unicode symbols
      const message = `<h4>Hi there</h4>
            <p>You have successfully reset your password. Here is your new password for future reference: ${password}.</p>
            <p>Thank you!</p>
          `;
      const mailOptions = {
        from: `support@Bidders.com`, // sender address
        to: `${email}`, // list of receivers
        subject: `Password Reset`, // Subject line
        // text: `${message}`, // plain text body
        html: ' <body style="background:#f7f7f7"><div style="width:90%; background:#fff; margin:10px auto 20px;font-family:Verdana, Geneva, Tahoma, sans-serif"><div style="background:#F4EEE2; padding:10px;color:rgb(248, 150, 166)"><center><h3>Bidders</h3></center></div><div style="padding:30px"><center><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>You have successfully reset your password. Here is your new password for future reference</small></p><h2>' + password + '</h2><p style="font-family:Verdana, Geneva, Tahoma, sans-serif"><small>Please click on this button below to change your password.</small></p><p style="margin: 30px"> <a href="https://Bidders.com/reset_password/' +token +'" style="font-size:0.9em;text-decoration:none;color:#000;border:1px solid #777;background:transparent;padding:10px 50px;font-family:Verdana"> Change your password</a></p></center></div><div style="background:#eee;height:2px;margin:10px 0px"></div><div style="padding:40px 20px;font-size:0.7em;color:#bbb"><center>Questions? Get your answers here: <a href="www.Bidders.com/faq" style="color:blue">Help Center</a></a>.</center></div></div><div style="font-size:0.7em;text-align:center;color:#bbb;width:35%;margin:auto"> All rights reserved</div></body>' // html body
        // html body

      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.json({ "error": "Please try again later." })
        } else {
          console.log(info)
          User.findOneAndUpdate({ email }, { password: hashedPassword }).then((pass) => {
            if (pass) {
              res.json({ "success": "Your password has been reset successfully. Please check your inbox" })
            }
          })
        }
        // Preview only available when sending through an Ethereal account

      })
    } else res.json({ error: "Please try again later" })
  }

  );
})
router.post('/api/resetpassword', (req, res) => {
  const { token,cpassword } = req.body;
  var userData = jwt.decode(token, "o1l2a3m4i5d6e")
  var date = new Date();
  var time1 = moment(date).add(5, "minutes")
  if (moment(userData.date).isBefore(date)) {
    if (jwt.verify(token, "o1l2a3m4i5d6e"));
    User.findOne({ email: userData.email, password: userData.password }).then((user) => {
      if (user) {
        const hashedPassword = bcrypt.hashSync(cpassword, 10);

        User.findOneAndUpdate({ email: userData.email }, { password: hashedPassword }).then((pass) => {
          if (pass) {
            res.json({ "success": "Your password has been reset successfully. You can now login" })
          }
        })

      } else res.json({ error: "You are not authorize to perform this action" })
    })
  }else res.json({error:"This link has expired"})
 
})
router.post('/api/subscribe', (req, res) => {
  const { email,firstName,lastName,country } = req.body;
  console.log(req.body)
  Newsletter.findOne({ email }).then((user) => {
    if (user) {
      res.json({ error: "You are already on a subscription" })
    } else{
      Newsletter.create({ email, firstName, lastName, country}).then((suc)=>{if(suc) res.json({success:"Your subscription was successful"});else res.json({error:"Please try again later"})})
    }
  }

  );
})
//check for available email
router.post('/api/checkEmail', (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.json({ "error": { "email": req.body.email + " is not available" } })
    } else res.json({ "success": { "email": "This email address is available" } })

  }).catch((err) => res.json({ "error": { "email": "an error has occured" } }))
})
router.post('/api/checkUsername', (req, res, next) => {
  console.log(req.body)
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.json({ "uerror": req.body.username + " is not available" })
    } else res.json({  "usuccess":"This username is available"  })

  }).catch((err) => res.json({ "uerror":  "an error has occured" }))
})
  //request from marketplace
  .get("/api/marketplace", (req, res, next) => {
    // Picture.find().then((s)=>console.log(s))
    Product.find({approved:true}).then((products) => {
      if (products) {
        res.json({ "products": products });

      } else res.json({ "error": "Marketplace is empty" })
    })
  })

  //request from dashboard
  .get("/api/dashboard", (req, res, next) => {
    // Picture.find().then((s)=>console.log(s))
    let userData = jwt.decode(req.query.token)

    User.findById(userData.id).then((user) => {
      var items = {};
      if (user) {
        Bids.find({ userID: userData.id }).sort({_id:-1}).then((bids) => {
          items.bids = bids;
          Buyer.find({ userID: userData.id }).sort({ _id: -1 }).then((purchased) => {
            items.purchased = purchased;
              Product.find({ userID: userData.id }).sort({ _id:-1}).then((product) => {
                items.product = product
                res.json({ "user": user, "items": items });
              })
          })
        });

      } else res.json({ "error": "User does not exist" })
    })
  }).post("/api/postDescription", (req, res, next) => {
    let userData = jwt.decode(req.body.token)
    let description = req.body.desc
    User.findOneAndUpdate({ _id: userData.id }, { desc: description }).then((user) => {
      if (user) res.json({ desc: req.body.desc }); else res.json({ error: "An error has occured" })
    })
  })
  .post("/api/postBio", (req, res, next) => {
    let userData = jwt.decode(req.body.token)
    let bio = req.body.bio
    User.findOneAndUpdate({ _id: userData.id }, { bio: bio }).then((user) => {
      if (user) res.json({ bio: req.body.bio }); else res.json({ error: "An error has occured" })
    })
  }).post("/api/postWorkExp", (req, res, next) => {
    let userData = jwt.decode(req.body.token)
    let workExp = req.body.workExp
    User.findOneAndUpdate({ _id: userData.id }, { workExp: workExp }).then((user) => {
      if (user) res.json({ workExp: req.body.workExp }); else res.json({ error: "An error has occured" })
    })
  })
  .post("/api/editevent", (req, res, next) => {
    let { description, title, location, startTime,stopTime,ticket, id, token,checkedDate,customDate } = req.body;
    let data = {}
    if (title) data.title = title
    // if (fields.link === "") errorFields.link = "This field is required";
    if (location) data.location = location
    if (description) data.description = description
    if (ticket) data.ticket = ticket
    if (startTime) data.startTime = startTime
    if (stopTime) data.stopTime = stopTime
    if (checkedDate) data.checkedDate = checkedDate
    if (checkedDate) data.customDate = moment(checkedDate).format("l")
    if (jwt.verify(token, "h1a2b3e4e5b6"))
      Event.findByIdAndUpdate(id, data).then((user) => {
        if (user) { 
          res.json({ "success":  "Updated Successfully" })
        }
      }).catch((err) => { res.json({ error: "An error has occured. Please try again later"  }); console.log(err) })

  })
  .get("/api/events", (req, res, next) => {
    // Picture.find().then((s)=>console.log(s))
    // let userData = jwt.decode(req.query.token)
    
    Event.find({ userID: req.query.id }).then((events) => {
      if (events) {
        console.log(events)
        res.json({ events: events });
      } else res.json({ "error": "THere are no events at the moment" })
    })
  })
    .get("/api/videos", (req, res, next) => {
    Video.find().sort({_id:-1}).then((videos) => {
      res.json({ "success": videos });
    })
  })
  .post("/api/deletevideo", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Video.findByIdAndRemove(req.body.id).then((vid) => {
        if (vid) {
          res.json({ success: vid })
        } else (res.json({ empty: "This video available" }))

      })
  })
    .post("/api/deletepicture", (req, res, next) => {
    if (jwt.verify(req.body.token, "h1a2b3e4e5b6"))
      Picture.findByIdAndRemove(req.body.id).then((vid) => {
        if (vid) {
          res.json({ success: vid })
        } else (res.json({ empty: "This picture available" }))

      })
  })
  .get("/api/getbestvideos", (req, res, next) => {
    Video.count().then((num) => {

    Video.find().sort({ views: -1 }).limit(10).skip(Math.random()*num).then((videos) => {
      res.json({ "success": videos });
    })
  })
  })
  .post("/api/youtubelink", (req, res, next) => {
    const {title,description,youtubelink} = req.body;
    let userData = jwt.decode(req.body.token)
    console.log(youtubelink)
    var date = new Date();
    Video.create({title,description,youtubelink,date,userID:userData.id,industry:userData.industry}).then((videos) => {
      console.log(videos)
     if(videos) res.json({ "success": videos });
    })
  })
  .get("/api/homevideos", (req, res, next) => {
    Video.count().then((num) => {
    Video.find().sort({_id:-1}).limit(50).skip(Math.random()*num).then((videos) => {
      res.json({ "success": videos });
    })
  })
  })
  .get("/api/eventsByDate", (req, res, next) => {
    const {day,month,year} = req.query
    var date = moment(`${month}/${day}/${year}`).format('l')
    console.log(req.query, "yoo ",date)
    Event.find().then((suc)=>console.log(suc))
    Event.find({ customDate: date}).then((events) => {
      if (events) {
        res.json({ events: events });
      } else res.json({ "error": "THere are no events at the moment" })
    })
  })
  .get("/api/eventsById", (req, res, next) => {
    const { id } = req.query
    console.log(id)
    
    Event.findById(id).then((events) => {
      console.log(events)
      if (events) {
        Event.update({ _id: events._id }, { $inc: { views: +1 } }).then((succ) => console.log(succ))
        res.json({ event: events });
      } else res.json({ "error": "There are no events at the moment" })
    }).catch((err)=>res.json({"error":"This event is not available"}))
  })
  .get("/api/eventsById2", (req, res, next) => {
    let userData = jwt.decode(req.query.token)

    Event.findById(req.query.id).then((item) => {
      if (item.userID === userData.id)
        res.json({ event: item })
      else res.json({ error: "unauthorize access" })
    })
  })
  .post("/api/deleteevent", (req, res, next) => {
    let userData = jwt.decode(req.body.token)

   
      Event.findById(req.body.id).then((post) => {
        if (post.userID === userData.id){
          Event.remove({id:req.body.id}).then((event) => res.json({success:"deleted successfully"}))
        } else (res.json({ empty: "There are no post available" }))

      })
  })
  .post("/api/deleteitem", (req, res, next) => {
    let userData = jwt.decode(req.body.token)


    Product.findById(req.body.id).then((post) => {
      if (post.userID === userData.id) {
        console.log(post)
        Product.findByIdAndRemove( req.body.id ).then((event) =>{ if(event)res.json({ success: "deleted successfully" })})
      } else (res.json({ empty: "There are no post available" }))

    })
  })
  .get("/api/allevents", (req, res, next) => {
    // Picture.find().then((s)=>console.log(s))
    // let userData = jwt.decode(req.query.token)
    Event.count().then((num) => {

    Event.find().limit(14).sort({ _id: -1,views:-1 }).skip(Math.random()*num).then((events) => {
      if (events) {
        res.json({ events: events });
      } else res.json({ "error": "THere are no events at the moment" })
    })
  })
  })
  .get("/api/twoevents", (req, res, next) => {
    // Picture.find().then((s)=>console.log(s))
    // let userData = jwt.decode(req.query.token)
    Event.find().sort({ _id: -1 }).limit(2).then((events) => {
      if (events) {
        res.json({ events: events });
      } else res.json({ "error": "THere are no events at the moment" })
    })
  })
//contact form
router.post('/api/contactartist', function (req, res, next) {
  let { organisation, website, address, phone, email, id, token, message } = req.body;
  let time = new Date();
  let data = {}
  if (organisation !== "") data.organisation = organisation
  if (website !== "") data.website = website
  if (address !== "") data.address = address
  if (email !== "") data.email = email
  if (phone !== "") data.phone = phone
  if (message !== "") data.message = message
  data.receiverid = id;
  data.time = time;
  console.log(data)
  var newForm = new Contactartist(data);
  newForm.save().then((user) => {
    if (user) res.json({ "success": { "server": "Your request has been submitted successfully" } })
  }).catch((error) => { console.log(error); res.json({ error: { "server": "An error has occured" } }); })

})

router.post('/api/contactform2', function (req, res, next) {
  let { instrument,style,studies,exp,token,address,nationality,vatno,dob ,phone} = req.body;
  let time = new Date();
  let data = {}
  if (instrument) data.instrument = instrument
  if (style ) data.style = style
  if (studies ) data.studies = studies
  if (exp ) data.workExp = exp
  if (address ) data.address = address
  if (nationality ) data.nationality = nationality
  if (vatno) data.vatno = vatno
  if (dob) data.dob = dob
  if (phone ) data.phone = phone
  let userData = jwt.decode(token)
  data.userid = userData.id;
  data.time = time;
  console.log(data)
  User.findByIdAndUpdate(userData.id, data).then((user) => {
    if (user) {
      res.json({ "success": { "server": "Contact form modified Successfully" } })
    } 
  }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })


})
router.post('/api/contactform', function (req, res, next) {
  let { organisation, website, address, phone, email, token } = req.body;
  let time = new Date();
  let data = {}
  if (organisation !== "") data.organisation = organisation
  if (website !== "") data.website = website
  if (address !== "") data.address = address
  if (email !== "") data.email = email
  if (phone !== "") data.phone = phone
  let userData = jwt.decode(token)
  data.userid = userData.id;
  data.time = time;
  console.log(data)
  Contactform.findOneAndUpdate({ userid: userData.id }, data).then((user) => {
    if (user) {
      res.json({ "success": { "server": "Contact form modified Successfully" } })
    } else {
      var newForm = new Contactform(data);
      newForm.save().then((user) => {
        if (user) res.json({ "success": { "server": "Contact form Created Successfully" } })
      }).catch((error) => { console.log(error); res.json({ error: { "server": "An error has occured" } }); })
    }
  }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })


})
  .get("/api/contactform", (req, res, next) => {
    let userData = jwt.decode(req.query.token)
    User.findOne({ _id: userData.id }).then((form) => {
      if (form) res.json({ "success": form }); else res.json({ "error": "User does not exist" })
    })
  })
  .get("/api/contactform2", (req, res, next) => {
    User.findOne({ _id: req.query.id }).then((form) => {
      if (form) res.json({ "success": form }); else res.json({ "error": "User does not exist" })
    })

  })
  .get("/api/search", (req, res, next) => {
    if (req.query.name) {
      var searchText = `'${req.query.name}' '${req.query.location}' '${req.query.category}'`
      console.log(req.query)
      if (req.query.orderby === "viewed") {
        User.find({ $text: { $search: searchText }, registration: true}).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
      } else if (req.query.orderby === "newest") {
        User.find({ $text: { $search: searchText }, registration: true}).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else if (req.query.orderby === "oldest") {
        User.find({ $text: { $search: searchText }, registration: true }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else if (req.query.category) {
        User.find({ $text: { $search: searchText }, registration: true }).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else {
        User.find({ $text: { $search: searchText },registration:true }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).then((data) => { if (data) res.json({ search: data }) })
      }
    }
  })
  .get("/api/searchitems", (req, res, next) => {
    if (req.query.name) {
      var searchText = `'${req.query.name}' '${req.query.location}' '${req.query.category}'`
      console.log(req.query)
      if (req.query.orderby === "viewed") {
        Product.find({ $text: { $search: searchText },approved: true  }).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
      } else if (req.query.orderby === "newest") {
        Product.find({ $text: { $search: searchText }, approved: true  }).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else if (req.query.orderby === "oldest") {
        Product.find({ $text: { $search: searchText }, approved: true  }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else if (req.query.category) {
        Product.find({ $text: { $search: searchText }, approved: true  }).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else {
        Product.find({ $text: { $search: searchText }, approved: true  }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).then((data) => { if (data) res.json({ search: data }) })
      }
    }
  })
  .get("/api/filter", (req, res, next) => {
    if (req.query.orderby === "viewed" && req.query.category === "") {
      User.find({ registration: true }).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
    } else if (req.query.orderby === "newest" && req.query.category === "") {
      User.find({registration:true}).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.orderby === "" && req.query.category) {
      User.find({ selectedIndustry: req.query.category,registration:true }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.orderby === "oldest" && req.query.category === "") {
      User.find({ registration: true }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "viewed") {
      User.find({ selectedIndustry: req.query.category,registration:true }).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "newest") {
      User.find({ selectedIndustry: req.query.category ,registration:true}).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "oldest") {
      User.find({ selectedIndustry: req.query.category,registration:true }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else {
      User.find({ registration: true }).then((data) => { if (data) res.json({ search: data }) })
    }
  })
  .get("/api/filteritems", (req, res, next) => {
    if (req.query.orderby === "viewed" && req.query.category === "") {
      Product.find({ approved: true }).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
    } else if (req.query.orderby === "newest" && req.query.category === "") {
      Product.find({ approved: true }).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.orderby === "" && req.query.category) {
      Product.find({ industry: req.query.category, approved: true  }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.orderby === "oldest" && req.query.category === "") {
      Product.find({ approved: true }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "viewed") {
      Product.find({ industry: req.query.category, approved: true }).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "newest") {
      Product.find({ industry: req.query.category, approved: true  }).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "oldest") {
      Product.find({ industry: req.query.category, approved: true  }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else {
      Product.find({ approved: true }).then((data) => { if (data) res.json({ search: data }) })
    }
  })
  //request from artist.splice(0,4)
  .get("/api/getArtists", (req, res, next) => {
    req.query.search ?
      User.find({ selectedIndustry: req.query.search, registration:true }).then((users) => {
        console.log(users)
        if (users) {
          res.json({ success: users })
        } else (res.json({ empty: "There are no artist available" }))
      }) :
      User.find({ registration: true}).then((users) => {
        if (users) {
          res.json({ success: users, registration: true  })
        } else (res.json({ empty: "There are no artist available" }))
      })
  })
  .get("/api/searchEvents", (req, res, next) => {
    if (req.query.name) {
      var searchText = `'${req.query.name}' '${req.query.location}' '${req.query.category}'`
      console.log(req.query)
      if (req.query.orderby === "viewed") {
        Event.find({ $text: { $search: searchText }}).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
      } else if (req.query.orderby === "newest") {
        Event.find({ $text: { $search: searchText }}).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else if (req.query.orderby === "oldest") {
        Event.find({ $text: { $search: searchText }}).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else if (req.query.category) {
        Event.find({ $text: { $search: searchText }}).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
      }
      else {
        Event.find({ $text: { $search: searchText }}, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).then((data) => { if (data) res.json({ search: data }) })
      }
    }
  })
  .get("/api/filterEvents", (req, res, next) => {
    if (req.query.orderby === "viewed" && req.query.category === "") {
      Event.find().sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
    } else if (req.query.orderby === "newest" && req.query.category === "") {
      Event.find().sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.orderby === "" && req.query.category) {
      Event.find({ industry: req.query.category }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.orderby === "oldest" && req.query.category === "") {
      Event.find().sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "viewed") {
      Event.find({ industry: req.query.category }).sort({ views: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "newest") {
      Event.find({ industry: req.query.category }).sort({ _id: -1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else if (req.query.category && req.query.orderby === "oldest") {
      Event.find({ industry: req.query.category }).sort({ _id: 1 }).then((data) => { if (data) res.json({ search: data }) })
    }
    else {
      Event.find().then((data) => { if (data) res.json({ search: data }) })
    }
  })
   .get("/api/getEvents", (req, res, next) => {
    req.query.search ?
      Event.find({ industry: req.query.search }).sort({_id:-1}).then((event) => {
        
        if (event) {
          res.json({ success: event })
        } else (res.json({ empty: "There are no events available" }))
      }) :
      Event.find().sort({ _id: -1 }).then((event) => {
        if (event) {
          res.json({ success: event})
        } else (res.json({ empty: "There are no event available" }))
      })
  })
  .get("/api/getBestArtists", (req, res, next) => {
    User.count().then((num) => {

    User.find({ registration: true}).sort({ views: -1 }).limit(10).skip(Math.random()*num).then((users) => {
      if (users) {
        res.json({ success: users })
      } else (res.json({ empty: "There are no artist available" }))

    })
  })
  })
  .get("/api/twoBestArtists", (req, res, next) => {
    User.count().then((num) => {

    User.find({ registration: true}).sort({ views: -1 }).limit(4).skip(Math.random()*num).then((users) => {
      if (users) {
        res.json({ success: users })
      } else (res.json({ empty: "There are no artist available" }))

    })
  })
  })
  .get("/api/sixBestArtists", (req, res, next) => {
    var number;
    User.count().then((num) => {

      User.find({ registration: true }).sort({ _id: -1 }).limit(18).skip(Math.random() * num).then((users) => {
        if (users) {
          res.json({ success: users })
        } else (res.json({ empty: "There are no artist available" }))
      })
    })
    
  
  })
    .get("/api/sevenBestArtists", (req, res, next) => {
    User.find({ registration: true}).sort({ views: -1 }).limit(7).skip(Math.random()* 18).then((users) => {
      if (users) {
        res.json({ success: users })
      } else (res.json({ empty: "There are no artist available" }))
    })
  })
   .get("/api/eightPictures", (req, res, next) => {
    Picture.find().sort({ _id: -1 }).limit(8).then((picture) => {
      if (picture) {
        res.json({ success: picture })
      } else (res.json({ empty: "There are no artist available" }))
    })
  })
  .get("/api/getNewArtists", (req, res, next) => {
    User.find({ registration: true}).sort({ _id: -1 }).limit(4).then((users) => {
      if (users) {
        res.json({ success: users })
      } else (res.json({ empty: "There are no artist available" }))

    })
  })
  .get("/api/news", (req, res, next) => {
    Blogpost.find().sort({ _id: -1 }).then((news) => {
      if (news) {
        res.json({ success: news })
      } else (res.json({ empty: "There are no artist available" }))
    })
  })
  .get("/api/recentNews", (req, res, next) => {
    Blogpost.count().then((num) => {

    Blogpost.find().sort({ _id: -1 }).limit(12).skip(Math.random()*num).then((news) => {
      if (news) {
        res.json({ success: news })
      } else (res.json({ empty: "There are no artist available" }))
    })
  })
  })
  .get("/api/newsbyid", (req, res, next) => {
    Blogpost.update({ _id: req.query.id},{$inc : {views:+1} }).then((succ)=>console.log(succ))
    Blogpost.findOne({ _id: req.query.id }).then((news) => {
      if (news) {
        res.json({ success: news })
      } else (res.json({ empty: "There are no artist available" }))

    })
  })
  
  .get("/api/videoById", (req, res, next) => {
    Video.findOne({ _id: req.query.id }).then((video) => {
      if (video) {
        let views = video.views;
        Video.findByIdAndUpdate( { _id: video._id }, { views: views+1 },function(err,res){console.log(res)})
        // res.send(html(video,"video",video.discription,null,video.videoUrl,serialize))
        res.json({ success: video })
      } else (res.json({ empty: "There are no video available" }))

    })
  })
  .get("/api/getNewProduct", (req, res, next) => {

    Product.find({ approved: true }).sort({ _id: -1 }).limit(4).then((product) => {
      if (product) {
        res.json({ success: product })
      } else (res.json({ empty: "There are no new items in marketplace" }))

    })
  })
  .get("/api/getBestProduct", (req, res, next) => {
    Product.count().then((num) => {

    Product.find({ approved: true }).sort({ views: -1 }).limit(15).skip(Math.random()*num).then((product) => {
      if (product) {
        res.json({ success: product })
      } else (res.json({ empty: "There are no items in marketplace" }))

    })
  })
  })

  .get("/api/artist", (req, res, next) => {
    User.findById(req.query.id).then((artist) => {
      if (artist) {
        let views = artist.views + 1
        User.findByIdAndUpdate(req.query.id, { views: views }).then((user) => {

          var media = {};
          if (user) {
            Video.find({ userID: req.query.id }).sort({_id:-1}).then((videos) => {
              media.videos = videos;
              Picture.find({ userID: req.query.id }).sort({ _id: -1 }).then((pictures) => {
                media.pictures = pictures;
                Audio.find({ userID: req.query.id }).sort({ _id: -1 }).then((audios) => {
                  media.audios = audios
                  Product.find({ userID: req.query.id, approved: true }).sort({ _id: -1 }).then((product) => {
                    media.product = product
                    res.json({ "user": user, "media": media });
                  })
                })
              })
            });

          } else res.json({ "error": "User does not exist" })
        })
        // res.json({ success: artist });
      } else res.json({ empty: "artist does not exist" })
    }).catch((err)=>res.json({error:"User not found"}))
  })
  .get("/api/productbyid", (req, res, next) => {
    let userData = jwt.decode(req.query.token)
    
    Product.findById(req.query.id).then((item) => {
      if(item.userID === userData.id)
      res.json({ success: item})
      else res.json({error:"unauthorize access"})
    })
  })
  .get("/api/product", (req, res, next) => {
    Product.findById(req.query.id).then((item) => {
      if (item) {
        let views = item.views + 1
        Product.findByIdAndUpdate(item._id, { views: views }).then((product) => {
          if (product) {
            User.findById(product.userID).then((user) => {
              res.json({ "user": user, "product": product });
            })

          } else res.json({ "error": "This product does not exist" })
        });
        // res.json({ success: artist });
      } else res.json({ empty: "This product does not exist" })
    })
  })
  .post("/api/editproduct", (req, res, next) => {
    let { description, title, industry,stock, id, token, price, userID} = req.body;
    let data = {}
    if (description) data.description = description
    if (title) data.title = title
    if (price) data.price = price
    if (stock) data.stock = stock
    if (industry) data.category = industry
    
    data.approved = false, data.nprice= "",data.mprice = ""
    let userData = jwt.decode(token)
    
    if (userID === userData.id)
      Product.findByIdAndUpdate(id, data).then((user) => {
        if (user) {
          res.json({ "success": "Updated successfully" })
        }
      }).catch((err) => { res.json({ error: { "server": "An error has occured. Please try again later" } }); console.log(err) })
    else res.json({ error: "unauthorize access" })
  })
  .post('/api/uploadDp', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      cloudinary.uploader.upload(files.dp.path, function (result) {
        if (result.url) {
          let userData = jwt.decode(fields.token)
          var publicid = result.public_id+"."+result.format
          User.findByIdAndUpdate(userData.id, { dpUrl: result.url,dpID:publicid }).then((success) => { res.json({ dpUrl: result.url }); })
        } else {
          res.json({ error: "Error uploading to cloudinary" }); console.log("error uploading to cloudinary")
        }
      })
    })
  })
  .post('/api/uploadBgPic', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      cloudinary.uploader.upload(files.bgPic.path, function (result) {
        if (result.url) {
          let userData = jwt.decode(fields.token)
          var publicid = result.public_id + "." + result.format
          User.findByIdAndUpdate(userData.id, { bgUrl: result.url,bgID:publicid }).then((success) => { res.json({ dpUrl: result.url }) })
        } else {
          res.json({ error: "Error uploading to cloudinary" }); console.log("error uploading to cloudinary")
        }
      })
    })
  })
  .post('/api/uploadVideo', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
    
      let errorFields = {}
      if (fields.title === "") errorFields.title = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (errorFields.title || errorFields.description) res.json({ error: { title:errorFields.title,description:errorFields.description } });
      else if (files.video)
        cloudinary.v2.uploader.upload(files.video.path, { resource_type: "video" }, function (error, result) {
          if (result) {
           
            let userData = jwt.decode(fields.token)
            let time = new Date();
            let uploadedVideo = new Video({
              userID: userData.id,
              videoUrl: result.url,
              date: time,
              title: fields.title,
              dpUrl: userData.dpUrl,
              description: fields.description,
              industry: userData.industry
            });
            uploadedVideo.save().then().then((success) => { res.json({ url: result.url, success: "uploaded successfully" }) })
          } else {
            
            res.json({ error: { server: "Error uploading file" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })
  .post('/api/uploadAudio', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
     
      let errorFields = {}
      if (fields.name === "") errorFields.name = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (errorFields.name || errorFields.description) res.json({ error: { name:errorFields.name,description:errorFields.description } });
      else if (files.audio)
        cloudinary.v2.uploader.upload(files.audio.path, { resource_type: "video" }, function (error, result) {
          if (result) {
            let userData = jwt.decode(fields.token)
            let time = new Date();
            let uploadedAudio = new Audio({
              userID: userData.id,
              src: result.url,
              date: time,
              name: fields.name,
              img: userData.dpUrl,
              description: fields.description,
              industry: userData.industry
            });
            uploadedAudio.save().then().then((success) => { res.json({ url: result.url, success: "uploaded successfully" }) })
          } else {
            res.json({ error: { server: "Error uploading file" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })
  .post('/api/uploadProduct', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      console.log(fields)
      let errorFields = {}
      if (fields.title === "") errorFields.title = "This field is required";
      if (fields.price === "") errorFields.price = "This field is required";
      // if (fields.billing === "") errorFields.billing = "This field is required";
      if (fields.phone === "") errorFields.phone = "This field is required";
      if (fields.stock === "") errorFields.stock = "This field is required";
      if (fields.email === "") errorFields.email = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (errorFields.title || errorFields.price || errorFields.description) res.json({ error: { title:errorFields.title,price:errorFields.price,description:errorFields.description } });
      else if (files.product)
        cloudinary.uploader.upload(files.product.path, function (result) {
          if (result.url) {
            let userData = jwt.decode(fields.token)
            let time = new Date();
            var publicid = result.public_id + "." + result.format
            
            let uploadedProduct = new Product({
              userID: userData.id,
              imgUrl: result.url,
              imgID: publicid,
              date: time,
              title: fields.title,
              dpUrl: userData.dpUrl,
              price: fields.price,
              description: fields.description,
              // billing: fields.billing,
              phone: fields.phone,
              stock: fields.stock,
              email: fields.email,
              industry: userData.industry
            });
            uploadedProduct.save().then().then((success) => { res.json({ url: result.url, success: "uploaded successfully" }) })
          } else {
            res.json({ error: { server: "Error uploading file" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })
  .post('/api/uploadEvent', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      console.log(fields)
      let errorFields = {}
      if (fields.title === "") errorFields.title = "This field is required";
      // if (fields.link === "") errorFields.link = "This field is required";
      if (fields.location === "") errorFields.location = "This field is required";
      if (fields.description === "") errorFields.description = "This field is required";
      if (fields.startTime === "") errorFields.startTime = "This field is required";
      if (fields.stopTime === "") errorFields.stopTime = "This field is required";
      if (errorFields.title || errorFields.location || errorFields.description || errorFields.stopTime || errorFields.startTime) res.json({ error: { title:errorFields.title,location:errorFields.location,description:errorFields.description } });
      else if (files.event)
        cloudinary.uploader.upload(files.event.path, function (result) {
          if (result.url) {
            // let day = moment(fields.checkedDate).date(); let month = moment(fields.checkedDate).month() + 1;
            let customDate = moment(fields.checkedDate).format("l")
            let userData = jwt.decode(fields.token)
            let time = new Date();
            var publicid = result.public_id + "." + result.format
            
            let UploadEvent = new Event({
              userID: userData.id,
              date: time,
              title: fields.title,
              imgUrl: result.url,
              imgID: publicid,
              ticket: fields.link,
              location: fields.location,
              description: fields.description,
              address: fields.address,
              startTime: fields.startTime,
              stopTime: fields.stopTime,
              checkedDate: fields.checkedDate,
              customDate: customDate,
              industry: userData.industry
            });

            UploadEvent.save().then().then((success) => { res.json({ url: result.url, success: "Event created successfully" }) })
          } else {
            res.json({ error: { server: "Error creating an event" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose a file to upload" } });
    })
  })

  .post('/api/uploadPictures', (req, res, next) => {
    var newform = new formidable.IncomingForm();
    newform.keepExtensions = true;
    newform.parse(req, (err, fields, files) => {
      let errorFields = {}
      if (fields.caption === "") errorFields.caption = "This field is required";
      if (errorFields.caption) res.json({ error: { caption:errorFields.caption } });
      else if (files.picture)
        cloudinary.uploader.upload(files.picture.path, function (result) {
          if (result.url) {
            let userData = jwt.decode(fields.token)
            let time = new Date();
            var publicid = result.public_id + "." + result.format
            let uploadedPicture = new Picture({
              userID: userData.id,
              imgUrl: result.url,
              imgID: publicid,
              date: time,
              caption:fields.caption,
              description: fields.description
            });
            uploadedPicture.save().then().then((success) => { res.json({ url: result.url, success: "uploaded successfully" }) })
          } else {
            res.json({ error: { server: "Error uploading the image" } }); console.log("error uploading to cloudinary")
          }
          // Picture.update({ userID: userData.id, url: result.url })
        }); else res.json({ error: { server: "Please choose an image to upload" } });
    })
  })
module.exports = router;
