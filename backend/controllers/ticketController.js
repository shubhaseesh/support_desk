const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");

// get all tickets
const getTickets = asyncHandler(async (req, res, next) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json(tickets);
  } catch (error) {
    return next(error.message);
  }
});

// get a ticket
const getTicket = asyncHandler(async (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findOne({ user: req.params.id });
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }
  res.status(200).json(ticket);
});

// create a ticket
const createTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new Error("User does not exists.");
  }
  const { product, description } = req.body;
  if (!product || !description) {
    throw new Error("please add product and description.");
  }
  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
  });
  res.status(201).json(ticket);
});

// update a ticket
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

// delete a ticket
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }
  await ticket.remove();
  res.status(200).json({ success: true });
});

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
