import { Publisher, Subjects, TicketCreatedEvent } from '@cumidev/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
