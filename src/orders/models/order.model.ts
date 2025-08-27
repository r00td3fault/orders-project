import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItem } from './order-item.model';
import { User } from 'src/users/models/user.model';

@Table({
  timestamps: true,
  modelName: 'order',
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

  @HasMany(() => OrderItem, { as: 'items' })
  declare items: OrderItem[];

  @DeletedAt
  declare deletionDate: Date;

  @Column({ defaultValue: true })
  declare isActive: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;
}
