import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface IUserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Адрес электронной почты' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({ example: 'User', description: 'Имя', nullable: true })
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty({
    example: [
      { id: 1, value: 'USER', description: 'Пользователь' },
      { id: 2, value: 'ADMIN', description: 'Администратор' },
    ],
    description: 'Роли пользователя',
    isArray: true,
  })
  @BelongsToMany(() => Role, () => UserRoles)
  declare roles: Role[];
}
