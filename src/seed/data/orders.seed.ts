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
  {
    clientName: 'Usuario 1',
    items: [
      { description: 'Producto 1', quantity: 1, unitPrice: 5 },
      { description: 'Producto 2', quantity: 1, unitPrice: 11 },
    ],
    state: orderState.initiated,
  },
  {
    clientName: 'Usuario 2',
    items: [
      { description: 'Producto 2', quantity: 3, unitPrice: 13 },
      { description: 'Producto 3', quantity: 3, unitPrice: 8 },
    ],
    state: orderState.initiated,
  },
  {
    clientName: 'Usuario 3',
    items: [
      { description: 'Producto 3', quantity: 2, unitPrice: 25 },
      { description: 'Producto 4', quantity: 2, unitPrice: 17 },
    ],
    state: orderState.initiated,
  },
];
