import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Store from './Store';
@Entity('images')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id:number;
   
    @Column()
    path:string;

    @ManyToOne(() => Store, store => store.images)
    @JoinColumn({name : 'store_id'})
    store: Store;
}