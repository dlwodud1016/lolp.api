import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Champion } from "./champion";
import { ChampionTags } from "./championTags";

@Index("FK_champion_tags_TO_champion_to_tags", ["championTag"], {})
@Index("FK_champion_TO_champion_to_tags", ["championId"], {})
@Entity("champion_to_tags", { schema: "lolp" })
export class ChampionToTags {
  @PrimaryGeneratedColumn({ type: "int", name: "seq" })
  seq: number;

  @Column("varchar", { name: "champion_id", comment: "챔피언 ID", length: 60 })
  championId: string;

  @Column("varchar", { name: "champion_tag", length: 24 })
  championTag: string;

  @ManyToOne(() => Champion, (champion) => champion.championToTags, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "champion_id", referencedColumnName: "id" }])
  champion: Champion;

  @ManyToOne(
    () => ChampionTags,
    (championTags) => championTags.championToTags,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "champion_tag", referencedColumnName: "tag" }])
  championTag2: ChampionTags;
}
