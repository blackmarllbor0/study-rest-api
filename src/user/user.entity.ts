import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public login: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: false })
  public about: string;
}
