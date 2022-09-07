import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AddressesUsers } from "./addresses_users.entity";
import { Users } from "./users.entity";

@Entity("addresses")

export class Addresses {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 2 })
    state: string

    @Column({ length: 45 })
    city: string

    @Column({ length: 8 })
    cep: string

    @Column({ length: 8 })
    number: string

    @Column({ length: 45 })
    street: string

    @Column({ length: 45 })
    district: string

    @Column({ length: 45, nullable: true })
    complement: string

    @OneToMany(() => AddressesUsers, addressesUsers => addressesUsers.addressId)
    user: Users

}