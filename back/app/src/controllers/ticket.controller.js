const Ticket = require('../models/ticket.model');
require('dotenv').config();

exports.addTicket = async (req, res, next) => {
    try {
        const ticket = new Ticket(req.body);

        await ticket.save();
        return res.status(204).json();
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

exports.deleteTicket = async (req, res, next) => {
    try {
        const id = req.params.id;

        await Ticket.deleteOne({_id: id})
        return res.status(204).json();
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.getAllTicket = async (req, res, next) => {
    try {
        const tickets = await Ticket.find({user: req.user.id});
        return res.status(200).json({tickets});

    } catch (err) {
        return res.status(500).json(err);
    }
}
