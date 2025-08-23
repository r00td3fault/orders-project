import { Column, DataType, Model } from 'sequelize-typescript';

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

  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
