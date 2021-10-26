import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Champion } from '../entities/champion';
import { ChampionInfo } from '../entities/championInfo';
import { ChampionStats } from '../entities/championStats';
import { LolDeveloperApi } from '../external/lol/lol-developer.api';

@Injectable()
export class ChampionTaskService {
  private readonly logger = new Logger(ChampionTaskService.name);

  constructor(
    private connection: Connection,
    @InjectRepository(Champion)
    private championRepository: Repository<Champion>,
   
    private lolDeveloperApi: LolDeveloperApi,
  ) { }


  private _championInfotoEntity(data): ChampionInfo{
    const entity:ChampionInfo = new ChampionInfo();

    entity.attack = data.attack;
    entity.magic = data.magic;
    entity.defense = data.defense;
    entity.difficulty = data.difficulty;

    return entity
  }

  private _championStatstoEntity(data): ChampionStats{
    const entity:ChampionStats = new ChampionStats();

    entity.hp = data.hp;
    entity.hpperlevel = data.hpperlevel;
    entity.mp = data.mp;
    entity.mpperlevel = data.mpperlevel;
    entity.movespeed = data.movespeed;
    entity.armor = data.armor;
    entity.armorperlevel = data.armorperlevel;
    entity.spellblock = data.spellblock;
    entity.spellblockperlevel = data.spellblockperlevel;
    entity.attackdamage = data.attackdamage;
    entity.hpregen = data.hpregen;
    entity.hpregenperlevel = data.hpregenperlevel;
    entity.mpregen = data.mpregen;
    entity.mpregenperlevel = data.mpregenperlevel;
    entity.crit = data.crit;
    entity.critperlevel = data.critperlevel;
    entity.attackdamage = data.attackdamage;
    entity.attackdamageperlevel = data.attackdamageperlevel;
    entity.attackspeedperlevel = data.attackspeedperlevel;
    entity.attackspeed = data.attackspeed;

    return entity
  }

  private _championtoEntities(data, infoSeq, statsSeq):Champion {
    const entity:Champion = new Champion();

    entity.id = data.id;
    entity.version = data.version;
    entity.championKey = data.key;
    entity.name = data.name;
    entity.title = data.title;
    entity.blurb = data.blurb;
    entity.partype = data.partype;
    entity.tags = data.tags.join(',');
    entity.infoSeq = infoSeq;
    entity.statsSeq = statsSeq;

    return entity;
  }

  @Cron('0 0 12 * * WED')
  //@Cron(CronExpression.EVERY_30_SECONDS) // 테스트
  async renewalChampion() {
    this.logger.debug('Called when the current second is 45');

    const champions = await this.lolDeveloperApi.champions();

    const keys = Object.keys(champions.data);

    keys.forEach(async key => {
      await this.connection.transaction(async manager => {
        const champion = champions.data[key];

        this.logger.debug("champion : ", champion);

        let infoEntity = this._championInfotoEntity(champion.info);
        let statsEntity = this._championStatstoEntity(champion.stats)

        infoEntity = await manager.save(infoEntity);
        statsEntity = await manager.save(statsEntity);

        const championEntity = this._championtoEntities(champion, infoEntity.seq, statsEntity.seq);

        await manager.save(championEntity);
        //await this.championRepository.save(championEntity);
      });
    })


    
  }
}