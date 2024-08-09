import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('bank')
export class BankEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    bank_name:string;

    @Column({ nullable: true})
    swift_code:string;
    
    @Column({ nullable: true })
    bank_account:string;

    @Column({ nullable: true })
    bank_address:string;
 
}