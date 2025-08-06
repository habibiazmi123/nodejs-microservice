import { PaymentCreatedEvent, Publisher, Subjects } from '@cumidev/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
