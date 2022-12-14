import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { AddressesUsers } from "./addresses_users.entity";
import { Schedules } from "./schedules.entity";
import { UsersFeedbacks } from "./users_feedbacks.entity";
import { v4 as uuid } from "uuid";
import { ServicesFeedbacks } from "./services_feedbacks.entity";

import { Exclude } from "class-transformer";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AddressesUsers, (addressesUsers) => addressesUsers.user)
  addresses: Addresses[];

  @OneToMany(() => Schedules, (schedules) => schedules.user, { eager: true })
  schedules: Schedules[];

  @OneToMany(() => UsersFeedbacks, (usersFeedbacks) => usersFeedbacks.user, {
    eager: true,
  })
  feedbacks: UsersFeedbacks[];

  @OneToMany(
    () => ServicesFeedbacks,
    (serviceFeedbacks) => serviceFeedbacks.user
  )
  givedfeedbacks: ServicesFeedbacks[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
