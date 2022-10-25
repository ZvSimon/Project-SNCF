const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
require('dotenv').config()

// database model
const TicketSchema = mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    data: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
}, {
    versionKey: false,
    timestamps: true
});
TicketSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Ticket', TicketSchema);
