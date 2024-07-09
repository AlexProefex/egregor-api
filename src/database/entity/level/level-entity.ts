
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import { UnitEntity } from '../unit/unit-entity';

@Entity('level')
export class LevelEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    color:string;
    
    /*@OneToMany(() => BlogCategoryDetailEntity, (blogDetail) => blogDetail.category)
    blogDetail: BlogCategoryDetailEntity[]
*/
    @OneToMany(() => UnitEntity, (unit) => unit.level)
    unit: UnitEntity[]


}
