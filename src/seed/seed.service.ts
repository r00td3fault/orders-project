import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { OrdersRepository } from '../orders/orders.repository';
import { USERS_SEED } from './data/users.seed';
import { User } from 'src/users/models/user.model';
import { ORDERS_SEED } from './data/orders.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}
  async runSeed() {
    await this.deleteTables();
    const user = await this.insertUsers();

    await this.insertOrders(user);
    return `Seed completed`;
  }

  private async deleteTables(): Promise<void> {
    await this.ordersRepository.deleteAll();
    await this.userRepository.deleteAll();
  }

  private async insertUsers(): Promise<User> {
    const users = await this.userRepository.createMany(USERS_SEED);
    return users[0];
  }

  private async insertOrders(user: User) {
    await this.ordersRepository.createMany(ORDERS_SEED, user);
  }
}
