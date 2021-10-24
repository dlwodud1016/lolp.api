import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Summoner } from "./summoner";

@Index("league_FK", ["summonerId"], {})
@Entity("league", { schema: "lolp" })
export class League {
  @Column("varchar", { primary: true, name: "leagueId", length: 62 })
  leagueId: string;

  @Column("varchar", { name: "queueType", length: 48 })
  queueType: string;

  @Column("varchar", { name: "tier", length: 24 })
  tier: string;

  @Column("varchar", { name: "rank", length: 12 })
  rank: string;

  @Column("int", { name: "leaguePoints" })
  leaguePoints: number;

  @Column("int", { name: "wins" })
  wins: number;

  @Column("int", { name: "losses" })
  losses: number;

  @Column("tinyint", { name: "veteran", width: 1, default: () => "'0'" })
  veteran: boolean;

  @Column("tinyint", { name: "inactive", width: 1, default: () => "'0'" })
  inactive: boolean;

  @Column("tinyint", { name: "freshBlood", width: 1, default: () => "'0'" })
  freshBlood: boolean;

  @Column("tinyint", { name: "hotStreak", width: 1, default: () => "'0'" })
  hotStreak: boolean;

  @Column("varchar", { name: "summonerId", length: 64 })
  summonerId: string;

  @Column("double", { name: "winRate", precision: 22, default: () => "'0'" })
  winRate: number;
  
  @ManyToOne(() => Summoner, (summoner) => summoner.leagues, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "summonerId", referencedColumnName: "id" }])
  summoner: Summoner;
}
