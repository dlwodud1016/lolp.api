import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Champion } from "./champion";

@Entity("champion_stats", { schema: "lolp" })
export class ChampionStats {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("double", { name: "hp", precision: 22, default: () => "'0'" })
  hp: number;

  @Column("double", { name: "hpperlevel", precision: 22, default: () => "'0'" })
  hpperlevel: number;

  @Column("double", { name: "mp", precision: 22, default: () => "'0'" })
  mp: number;

  @Column("double", { name: "mpperlevel", precision: 22, default: () => "'0'" })
  mpperlevel: number;

  @Column("double", { name: "movespeed", precision: 22, default: () => "'0'" })
  movespeed: number;

  @Column("double", { name: "armor", precision: 22, default: () => "'0'" })
  armor: number;

  @Column("double", {
    name: "armorperlevel",
    precision: 22,
    default: () => "'0'",
  })
  armorperlevel: number;

  @Column("double", { name: "spellblock", precision: 22, default: () => "'0'" })
  spellblock: number;

  @Column("double", {
    name: "spellblockperlevel",
    precision: 22,
    default: () => "'0'",
  })
  spellblockperlevel: number;

  @Column("double", {
    name: "attackrange",
    precision: 22,
    default: () => "'0'",
  })
  attackrange: number;

  @Column("double", { name: "hpregen", precision: 22, default: () => "'0'" })
  hpregen: number;

  @Column("double", {
    name: "hpregenperlevel",
    precision: 22,
    default: () => "'0'",
  })
  hpregenperlevel: number;

  @Column("double", { name: "mpregen", precision: 22, default: () => "'0'" })
  mpregen: number;

  @Column("double", {
    name: "mpregenperlevel",
    precision: 22,
    default: () => "'0'",
  })
  mpregenperlevel: number;

  @Column("double", { name: "crit", precision: 22, default: () => "'0'" })
  crit: number;

  @Column("double", {
    name: "critperlevel",
    precision: 22,
    default: () => "'0'",
  })
  critperlevel: number;

  @Column("double", {
    name: "attackdamage",
    precision: 22,
    default: () => "'0'",
  })
  attackdamage: number;

  @Column("double", {
    name: "attackdamageperlevel",
    precision: 22,
    default: () => "'0'",
  })
  attackdamageperlevel: number;

  @Column("double", {
    name: "attackspeedperlevel",
    precision: 22,
    default: () => "'0'",
  })
  attackspeedperlevel: number;

  @Column("double", {
    name: "attackspeed",
    precision: 22,
    default: () => "'0'",
  })
  attackspeed: number;

  @OneToMany(() => Champion, (champion) => champion.statsSeq2)
  champions: Champion[];
}
