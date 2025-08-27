import { OrderInterface, orderState } from 'src/orders/types';

export const ORDERS_SEED: OrderInterface[] = [
  {
    clientName: 'Ana López',
    items: [
      { description: 'Ceviche', quantity: 2, unitPrice: 50 },
      { description: 'Chicha morada', quantity: 1, unitPrice: 10 },
    ],
    state: orderState.initiated,
  },
  {
    clientName: 'Jose perez',
    items: [
      { description: 'Hamburguesa', quantity: 1, unitPrice: 10 },
      { description: 'Cocacola', quantity: 1, unitPrice: 6 },
    ],
    state: orderState.initiated,
  },
  {
    clientName: 'Carlos tejada',
    items: [
      { description: 'Lomo salteado', quantity: 2, unitPrice: 50 },
      { description: 'Jarra limonada', quantity: 1, unitPrice: 10 },
    ],
    state: orderState.initiated,
  },
];
