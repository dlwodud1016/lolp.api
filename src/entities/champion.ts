import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ChampionInfo } from "./championInfo";
import { ChampionStats } from "./championStats";
import { ChampionToTags } from "./championToTags";

@Index("FK_champion_stats_TO_champion", ["statsSeq"], {})
@Index("FK_champion_info_TO_champion", ["infoSeq"], {})
@Entity("champion", { schema: "lolp" })
export class Champion {
  @Column("varchar", {
    primary: true,
    name: "id",
    comment: "챔피언 ID",
    length: 60,
  })
  id: string;

  @Column("varchar", { name: "version", comment: "버전", length: 32 })
  version: string;

  @Column("varchar", { name: "champion_key", comment: "챔피언 키", length: 24 })
  championKey: string;

  @Column("varchar", { name: "name", comment: "챔피언 이름", length: 60 })
  name: string;

  @Column("varchar", { name: "title", length: 256 })
  title: string;

  @Column("varchar", { name: "blurb", length: 1024 })
  blurb: string;

  @Column("varchar", { name: "partype", length: 60 })
  partype: string;

  @Column("int", { name: "stats_seq" })
  statsSeq: number;

  @Column("int", { name: "info_seq" })
  infoSeq: number;

  @ManyToOne(() => ChampionInfo, (championInfo) => championInfo.champions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "info_seq", referencedColumnName: "seq" }])
  infoSeq2: ChampionInfo;

  @ManyToOne(() => ChampionStats, (championStats) => championStats.champions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "stats_seq", referencedColumnName: "seq" }])
  statsSeq2: ChampionStats;

  @OneToMany(() => ChampionToTags, (championToTags) => championToTags.champion)
  championToTags: ChampionToTags[];
}
