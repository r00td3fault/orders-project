import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/models/order.model';

@Table({
  timestamps: true,
  modelName: 'User',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column
  declare firstName: string;

  @Column
  declare lastName: string;

  @Column({ type: DataType.STRING, unique: true })
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: ['user'] })
  declare roles: string[];

  @HasMany(() => Order)
  declare orders: Order[];
}
