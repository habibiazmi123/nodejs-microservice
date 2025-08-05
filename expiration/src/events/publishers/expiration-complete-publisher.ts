import { Publisher, ExpirationCompleteEvent, Subjects } from "@cumidev/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}