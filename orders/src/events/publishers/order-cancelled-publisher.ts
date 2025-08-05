import { OrderCancelledEvent, Publisher, Subjects } from '@cumidev/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
