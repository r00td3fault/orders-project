import { Injectable } from '@nestjs/common';
import { ConnectedClients } from './types/ws-connectedClients.interface';
import { Socket } from 'socket.io';
import { UsersRepository } from 'src/users/users.repository';
import { User } from '../users/models/user.model';

@Injectable()
export class MessagesWsService {
  private connectedClients: ConnectedClients = {};

  constructor(private readonly userRepository: UsersRepository) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new Error('User not found');

    this.checkUserConnect(user);

    this.connectedClients[client.id] = {
      socket: client,
      user,
    };
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  getUserFullnameBySocketId(socketId: string): string {
    const user = this.connectedClients[socketId].user;

    return `${user.firstName} ${user.lastName}`;
  }

  private checkUserConnect(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient = this.connectedClients[clientId];

      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}
