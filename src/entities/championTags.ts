import { Column, Entity, OneToMany } from "typeorm";
import { ChampionToTags } from "./championToTags";

@Entity("champion_tags", { schema: "lolp" })
export class ChampionTags {
  @Column("varchar", { primary: true, name: "tag", length: 24 })
  tag: string;

  @OneToMany(
    () => ChampionToTags,
    (championToTags) => championToTags.championTag2
  )
  championToTags: ChampionToTags[];
}
