import { Order } from './models/order.model';

/**
 * Maps a Order with items entity
 * @param order
 * @returns
 */
export const orderMapper = (order: Order) => {
  return {
    id: order.id,
    clientName: order.clientName,
    state: order.state,
    items: order.items.map((orderItem) => ({
      description: orderItem.description,
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
    })),
  };
};
