const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Train = new Schema({
    Name: {
        type: String
    },
    ArrTime: {
        type: String
    },
    ArrStation: {
        type: String
    },
    DeptTime: {
        type: String
    },
    DeptStation: {
        type: String
    },
    Class1:{
        TicketPrice:{
          type: Number
        },
        Seats : {
            type : Number
        }
    },
    Class2:{
        TicketPrice:{
            type: Number
        },
        Seats: {
            type: Number
        }
    },
    Class3: {
        TicketPrice:{
            type: Number
        },
        Seats: {
            type: Number
        }
    }
});

module.exports = mongoose.model('train', Train);