import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Champion } from '../entities/champion';
import { ChampionInfo } from '../entities/championInfo';
import { ChampionStats } from '../entities/championStats';
import { LoLModule } from '../external/lol/lol.moduler';
import { ChampionTaskService } from './champion-task.service';
import { ChampionController } from './champion.controller';
import { ChampionService } from './champion.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Champion, ChampionInfo, ChampionStats]),
        LoLModule
    ],
    providers: [ ChampionService, ChampionTaskService],
    controllers: [ChampionController],
    exports: []
  })
  
  export class ChampionModule {}