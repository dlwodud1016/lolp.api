import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Champion } from "./champion";

@Entity("champion_info", { schema: "lolp" })
export class ChampionInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("int", { name: "attack", default: () => "'0'" })
  attack: number;

  @Column("int", { name: "defense", default: () => "'0'" })
  defense: number;

  @Column("int", { name: "magic", default: () => "'0'" })
  magic: number;

  @Column("int", { name: "difficulty", default: () => "'0'" })
  difficulty: number;

  @OneToMany(() => Champion, (champion) => champion.infoSeq2)
  champions: Champion[];
}
