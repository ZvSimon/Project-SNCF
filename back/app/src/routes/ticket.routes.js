const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const ticketController = require('../controllers/ticket.controller')
const auth = require('../middlewares/auth.middleware')

// parse requests
router.use(bodyParser.json());

// routes
router.post('/', auth, ticketController.addTicket);
router.delete('/:id', auth, ticketController.deleteTicket);
router.get('/', auth, ticketController.getAllTicket);

module.exports = router;
