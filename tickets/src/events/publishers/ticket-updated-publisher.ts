import { Publisher, Subjects, TicketUpdatedEvent } from '@cumidev/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
