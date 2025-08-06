import mongoose from 'mongoose';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCancelledListener } from '../order-cancelled-listener';
import { OrderCancelledEvent, OrderStatus } from '@cumidev/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';

const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    const order = Order.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Cancelled,
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString(),
        version: 0
    })
    await order.save()

    // Create the fake data event
    const data: OrderCancelledEvent['data'] = {
        id: order.id,
        version: 1,
        ticket: {
            id: new mongoose.Types.ObjectId().toHexString(),
        }
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, data, msg, order };
};

it('update the status of the order', async () => {
    const { listener, data, msg, order } = await setup();

    await listener.onMessage(data, msg)

    const updateOrder = await Order.findById(order.id);

    expect(updateOrder!.status).toEqual(OrderStatus.Cancelled)
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg)

    expect(msg.ack).toHaveBeenCalled()
});
