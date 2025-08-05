import { OrderCreatedEvent, Publisher, Subjects } from '@cumidev/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
