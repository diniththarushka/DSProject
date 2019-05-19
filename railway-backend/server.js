const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const userAppRoutes = express.Router();
const trainAppRoutes = express.Router();
const ticketAppRoutes = express.Router();
const discountAppRoutes = express.Router();
const smtpTransport = require('nodemailer-smtp-transport');

let RegUser = require('./railway.models/registed.user.model');
let train = require('./railway.models/train.model');
let ticket = require('./railway.models/ticket.model');
let special = require('./railway.models/specialdiscount.model');
let nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/railwayDB', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");

    //Hardcoded values are here (Defaults)
    mongoose.connection.db.collection('specials').countDocuments(function(err, count) {
        if (err){
            console.log(err);
        }
        if( count === 0) {
            let DiscountIns = new special({'Discount':0.2});
            DiscountIns.save();
        }
    });
    mongoose.connection.db.collection('regusers').countDocuments(function(err, count) {
        if (err){
            console.log(err);
        }
        if( count === 0) {
            let adminDefault = new RegUser(
                {'Type':'Admin',
                 'Email':'admin@admin.com',
                 'Password':'92668751'});
            adminDefault.save();
        }
    });
});

//==============================================User App Routes=================================================

userAppRoutes.route('/login').post(function(req,res){

    RegUser.find(req.body,function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});

userAppRoutes.route('/update/:id').post(function(req,res){
    let id = req.params.id;
    RegUser.findOneAndUpdate({_id:id},req.body,{new:true},function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});

userAppRoutes.route('/').get(function(req, res) {
    RegUser.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


userAppRoutes.route('/:id').delete(function (req,res) {
    let id = req.params.id;
    RegUser.findById(id, function(err,users){
       res.json(users);
       users.remove();
    });
});


userAppRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;                                 //id gets from here
    RegUser.findById(id, function(err, users) {
        res.json(users);
    });
});

userAppRoutes.route('/update/:id').post(function(req, res) {
    RegUser.findById(req.params.id, function(err, users) {
        if (!users)
            res.status(404).send("data is not found");
        else
            users.Name = req.body.Name;
        users.NIC = req.body.NIC;
        users.Phone = req.body.Phone;
        users.Email = req.body.Email;
        users.Password = req.body.Password;

        users.save().then(user => {
            res.json('User Updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

userAppRoutes.route('/add').post(function(req, res) {

    let email=req.body.Email;

    RegUser.find({"Email":email},function(err,user){
        if(err){
            console.log(err);
        }else{
            if(user.length){
                res.status(200).json({'userStatus': 'unsuccessful'});
            }else{
                let user = new RegUser(req.body);
                user.Type = "Domestic";
                user.save()
                    .then(user => {
                        res.status(200).json({'userStatus': 'successful'});
                    })
                    .catch(err => {
                        res.status(400).send('adding new user failed');
                    });
            }
        }
    });


});
//==============================================User App Routes=================================================
//==============================================Train App Routes=================================================
trainAppRoutes.route('/').get(function(req,res){
    train.find(function (err,trains) {
        if(err){
            console.log(err);
        }else{
            res.json(trains);
        }
    });
});

trainAppRoutes.route('/add').post(function(req,res){
    let trainIns = new train(req.body);
    trainIns.save()
        .then(train => {
            res.status(200).json(train);
        })
        .catch(err => {
            res.status(400).send('adding new train failed');
        });
});

trainAppRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;                                 //id gets from here
    train.findById(id, function(err, trains) {
        res.json(trains);
    });
});

trainAppRoutes.route('/:id').delete(function (req,res) {
    let id = req.params.id;
    train.findById(id, function(err,trains){
        if(err){
            console.log(err);
        }else{
            trains.remove();
            res.json(trains);
        }

    });
});

trainAppRoutes.route('/update/seats/:id').post(function(req, res) {
    train.findById(req.params.id, function(err, trains) {
        if (!trains)
            res.status(404).send("data is not found");
        else{
            trains.Class1.Seats = req.body.Class1.Seats;
            trains.Class2.Seats = req.body.Class2.Seats;
            trains.Class3.Seats = req.body.Class3.Seats;

            trains.save().then(trains => {
                res.json('Train Updated!');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

trainAppRoutes.route('/update/:id').post(function(req, res) {
    train.findById(req.params.id, function(err, trains) {
        if (!trains)
            res.status(404).send("data is not found");
        else
            trains.Name = req.body.Name;
        trains.ArrTime = req.body.ArrTime;
        trains.ArrStation = req.body.ArrStation;
        trains.DeptTime = req.body.DeptTime;
        trains.DeptStation = req.body.DeptStation;
        trains.Class1 = req.body.Class1;
        trains.Class2 = req.body.Class2;
        trains.Class3 = req.body.Class3;

        trains.save().then(trains => {
            res.json('Train Updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

//==============================================Train App Routes=================================================
//==============================================Ticket App Routes=================================================
ticketAppRoutes.route('/').get(function(req,res){
    ticket.find(function (err,tickets) {
        if(err){
            console.log(err);
        }else{
            res.json(tickets);
        }
    });
});

ticketAppRoutes.route('/byName/:Name').get(function(req,res){
    let name=req.params.Name;
    ticket.find({"UserName":name},function(err,ticket){
        if(err){
            res.send(err);
        }else
            res.json(ticket);
    });

});

ticketAppRoutes.route('/add').post(function(req,res){
    let TicketIns = new ticket(req.body);
    TicketIns.save()
        .then(ticket => {
            let receipt='<br/>';
            if(req.body.Payment.PaymentMethod === 'Card'){
                let border = '========================================';
                let UserName = (req.body.UserName);
                let UserID = req.body.UserID;
                let TrainID = req.body.TrainID;
                let Total = req.body.Total;
                let PType = req.body.Payment.PaymentMethod;
                let CardNum = req.body.Payment.PaymentNumber;
                let C1Seats = req.body.Seats.Class1;
                let C2Seats = req.body.Seats.Class2;
                let C3Seats = req.body.Seats.Class3;
                let PDate = req.body.Seats.PaymentDate;

                if(CardNum.length === 16)
                    CardNum = 'xxxx xxxx xxxx '+CardNum.substr(12,16)+'\n';
                else if(CardNum.length === 19)
                    CardNum = 'xxxx xxxx xxxx xxx'+CardNum.substr(15,19)+'\n';


                 receipt=(
                  border
                  +'<br/>Paid By : '+UserName+' <br/>'
                  +'User ID : '+UserID+'<br/>'
                  +'Train ID : '+TrainID+'<br/><br/>'
                  +'Class 1 Seats : '+C1Seats+'<br/>'
                  +'Class 2 Seats : '+C2Seats+'<br/>'
                  +'Class 3 Seats : '+C3Seats+'<br/><br/>'
                  +'Total : '+Total+'<br/><br/>'
                  +'Payment Type : '+PType+'<br/>'
                  +'Card Number : '+CardNum+'<br/>'
                  +'Payment Date : '+PDate+'<br/><br/>'
                  +border
                );


            }else if(req.body.Payment.PaymentMethod === 'Dialog'){
                let border = '========================================';
                let UserName = (req.body.UserName);
                let UserID = req.body.UserID;
                let TrainID = req.body.TrainID;
                let Total = req.body.Total;
                let PType = req.body.Payment.PaymentMethod;
                let Phone = req.body.Payment.PaymentNumber;
                let C1Seats = req.body.Seats.Class1;
                let C2Seats = req.body.Seats.Class2;
                let C3Seats = req.body.Seats.Class3;
                let PDate = req.body.Seats.PaymentDate;

                receipt=(
                    border
                    +'<br/>Paid By : '+UserName+' <br/>'
                    +'User ID : '+UserID+'<br/>'
                    +'Train ID : '+TrainID+'<br/><br/>'
                    +'Class 1 Seats : '+C1Seats+'<br/>'
                    +'Class 2 Seats : '+C2Seats+'<br/>'
                    +'Class 3 Seats : '+C3Seats+'<br/><br/>'
                    +'Total : '+Total+'<br/><br/>'
                    +'Payment Type : '+PType+'<br/>'
                    +'Phone Number : '+Phone+'<br/>'
                    +'Payment Date : '+PDate+'<br/><br/>'
                    +border
                );
            }
            //console.log(receipt);
            //=======================================================================================================

            let transporter = nodemailer.createTransport(smtpTransport({
                service: 'Gmail',
                auth: {
                    user: 'railwaysonlinesys@gmail.com', // Gmail user
                    pass: 'Railways@1234' // Gmail password
                },
            tls:{
                    rejectUnauthorized:false
            }}));
                let mailOptions={
                   from:'"Online Railway System" <railwaysonlinesys@gmail.com>',
                   to:req.body.Email,
                   subject:'Payment Confirmation | Railway System',
                   text:"",
                   html:"<p>" +
                       "Dear Sir/Madam,<br/> We have received your payment. This is your Receipt<br/><br/>"+receipt+"</p>"
                };

                transporter.sendMail(mailOptions,(err,info)=>{
                    if(err){
                        console.log(err);
                    }else
                    console.log('Email sent to : '+req.body.Email);
                });
            //=======================================================================================================
            res.status(200).json(ticket);
        })
        .catch(err => {
            res.status(400).send('adding new ticket failed');
        });
});

ticketAppRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;                                 //id gets from here
    ticket.findById(id, function(err, tickets) {
        res.json(tickets);
    });
});

ticketAppRoutes.route('/:id').delete(function (req,res) {
    let id = req.params.id;
    ticket.findById(id, function(err,tickets){
        if(err){
            console.log(err);
        }else{
            tickets.remove();
            res.json(tickets);
        }
    });
});
//==============================================Ticket App Routes=================================================
//==============================================Discount App Routes=================================================
discountAppRoutes.route('/').get(function(req, res) {
    special.find(function(err, specials) {
        if (err) {
            console.log(err);
        } else {
            res.json(specials);
        }
    });
});

discountAppRoutes.route('/add').post(function(req,res){

    let DiscountIns = new special(req.body);
    DiscountIns.save()
        .then(ticket => {
            res.status(200).json(ticket);
        })
        .catch(err => {
            res.status(400).send('adding new discount failed');
        });
});

discountAppRoutes.route('/update/:id').post(function(req,res){
    let id = req.params.id;
    special.findOneAndUpdate({_id:id},req.body,{new:true},function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});

discountAppRoutes.route('/:id').delete(function (req,res) {
    let id = req.params.id;
    special.findById(id, function(err,special){
        if(err){
            console.log(err);
        }else{
            special.remove();
            res.json(special);
        }

    });
});

//==============================================Discount App Routes=================================================

app.use('/users', userAppRoutes);
app.use('/trains', trainAppRoutes);
app.use('/tickets', ticketAppRoutes);
app.use('/discounts', discountAppRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});