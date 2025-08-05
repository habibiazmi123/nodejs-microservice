import { ExpirationCompleteEvent, OrderStatus, TicketCreatedEvent } from '@cumidev/common';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';

const setup = async () => {
    // create an instance of the listener
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 30
    })
    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'asdkdfj',
        expiresAt: new Date(),
        ticket
    })
    await order.save();

    // create a fake data event
    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    };

    // create a fake message object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, order, ticket, data, msg };
};

it('updates the order status to cancelled', async () => {
    const { listener, order, data, msg } = await setup();
    
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);

    const updateOrder = await Order.findById(order.id)

    expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
})

it('emit an OrderCancelled event', async () => {
    const { listener, order, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(eventData.id).toEqual(order.id);
})

it('ack the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
})