import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from '../entities/league';
import { Summoner } from '../entities/summoner';
import { LoLModule } from '../external/lol/lol.moduler';
import { RenewalController } from './renewal.controller';
import { RenewalService } from './renewal.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Summoner, League]),
    LoLModule
  ],
  controllers: [RenewalController],
  providers: [RenewalService]
})
export class RenewalModule {

}
