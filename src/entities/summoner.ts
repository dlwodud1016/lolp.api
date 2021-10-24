import { Column, Entity, Index, OneToMany } from "typeorm";
import { League } from "./league";

@Index("summoner_name_UN", ["name"], { unique: true })
@Entity("summoner", { schema: "lolp" })
export class Summoner {
  @Column("varchar", {
    primary: true,
    name: "id",
    comment: "Encrypted summoner ID",
    length: 64,
  })
  id: string;

  @Column("varchar", {
    name: "accountId",
    comment: "Encrypted account ID",
    length: 60,
  })
  accountId: string;

  @Column("int", {
    name: "profileIconId",
    nullable: true,
    comment: "ID of the summoner icon associated with the summoner.",
  })
  profileIconId: number | null;

  @Column("bigint", { name: "revisionDate" })
  revisionDate: string;

  @Column("varchar", {
    name: "name",
    unique: true,
    comment: "Summoner name.",
    length: 256,
  })
  name: string;

  @Column("varchar", {
    name: "puuid",
    nullable: true,
    comment: "Encrypted PUUID",
    length: 79,
  })
  puuid: string | null;

  @Column("bigint", {
    name: "summonerLevel",
    nullable: true,
    comment: "\tSummoner level associated with the summoner.",
  })
  summonerLevel: string | null;

  @Column("varchar", {
    name: "region",
    comment: "summoner region",
    length: 8,
    default: () => "'KR'",
  })
  region: string;

  @OneToMany(() => League, (league) => league.summoner)
  leagues: League[];
}
