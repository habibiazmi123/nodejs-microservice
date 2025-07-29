import express, { Request, Response } from 'express';
import { TicketModel } from '../models/tickets';
import { NotFoundError } from '@cumidev/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await TicketModel.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
