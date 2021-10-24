import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Champion } from '../entities/champion';
import { LoLModule } from '../external/lol/lol.moduler';
import { ChampionTaskService } from './champion-task.service';
import { ChampionService } from './champion.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Champion]),
        LoLModule
    ],
    providers: [ ChampionService, ChampionTaskService],
    controllers: [],
    exports: []
  })
  
  export class ChampionModule {}