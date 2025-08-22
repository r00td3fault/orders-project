import {
  Column,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItem } from './order-item.model';

@Table({
  timestamps: true,
  modelName: 'Order',
})
export class Order extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column
  declare clientName: string;

  @Column
  declare state: string;

  @HasMany(() => OrderItem)
  declare items: OrderItem[];

  @DeletedAt
  declare deletionDate: Date;

  @Column({ defaultValue: true })
  declare isActive: boolean;
}
