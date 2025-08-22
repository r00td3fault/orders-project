export enum orderState {
  initiated = 'initiated ',
  sent = 'sent',
  delivered = 'delivered',
}

export interface OrderItemInterface {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderInterface {
  clientName: string;
  items: OrderItemInterface[];
  state?: string;
}
