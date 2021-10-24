import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from '../entities/league';
import { Summoner } from '../entities/summoner';
import { LoLModule } from '../external/lol/lol.moduler';
import { SummonerController } from "./summoner.controller";
import { SummonerService } from './summoner.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Summoner, League]),
        LoLModule
    ],
    providers: [ SummonerService],
    controllers: [SummonerController],
    exports: []
  })
  
  export class SummonerModule {}