import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";

export class GlobalEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn() 
  deleted_at: Date;

}