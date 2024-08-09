import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('direction')
export class DirectionEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: true})
    street:string;

    @Column({ nullable: true})
    ext_number:string;
    
    @Column({ nullable: true })
    int_number:string;

    @Column({ nullable: true })
    neighborhood:string;

    @Column({ nullable: true })
    country:string;

    @Column({ nullable: true })
    state:string;

    @Column({ nullable: true })
    postal_code:string;
}
