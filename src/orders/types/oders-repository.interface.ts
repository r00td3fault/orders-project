import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../models/order.model';

export interface OrdersRepositoryInterface {
  findOneById(id: string): Promise<Order | null>;
  findAll(limit: number, offset: number): Promise<Order[]>;
  create(createOrderDto: CreateOrderDto): Promise<Order | null>;
  updateState(id: string, state: string): Promise<void>;
  // update(id: string, user: Partial<User>): Promise<[number, User[]]>;
  delete(id: string): Promise<void>;
  deleteCron(threshold: Date): Promise<number>;
}
