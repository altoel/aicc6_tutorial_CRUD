import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  postTitle: string;

  @Column()
  postContent: string;

  toJSON() {
    return {
      id: this.id,
      postTitle: this.postTitle,
      postContent: this.postContent,
    };
  }
}
