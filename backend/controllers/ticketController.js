const asyncHanler = require("express-async-handler");
const validator = require("../utils/helpers");
const ticketSchema = require("../utils/schema");
const Ticket = require("../models/ticketModel");

const getTickets = asyncHanler(async (req, res, next) => {
  res.status(201).send({ message: "getTickets" });
});

const createTicket = asyncHanler(async (req, res, next) => {
  const { product, description } = req.body;
  const ticket = await Ticket.create({
    product,
    description,
  });
  console.error("-----------", ticket);
  res.status(201);
});

module.exports = { createTicket, getTickets };
