import { requireAuth, validateRequest } from '@cumidev/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { TicketModel } from '../models/tickets';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {title, price} = req.body;

    const ticket = new TicketModel({ title, price, userId: req.currentUser?.id });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
