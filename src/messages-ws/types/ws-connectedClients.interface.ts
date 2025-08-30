import { Socket } from 'socket.io';
import { User } from 'src/users/models/user.model';

export interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}
