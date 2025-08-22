import {
  Column,
  DataType,
  ForeignKey,
  Model,
  BelongsTo,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({
  timestamps: true,
  modelName: 'OrderItem',
})
export class OrderItem extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.SMALLINT)
  declare quantity: number;

  @Column(DataType.FLOAT)
  declare unitPrice: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
  })
  declare orderId: string;

  @BelongsTo(() => Order)
  declare order: Order;
}
