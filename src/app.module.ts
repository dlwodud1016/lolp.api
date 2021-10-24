import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummonerModule } from './summoner/summoner.module';
import configuration from './config/config.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ChampionModule } from './champion/champion.module';

@Module({
  imports: [
    ConfigModule.forRoot({   // configuration 설정을 coifg module 불러 올 때 로드한다
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mariadb",
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ["dist/entities/*.js"],
        synchronize: false,
        "logging": ["query", "error"]
      })
    }),
    ScheduleModule.forRoot(),

    // module
    SummonerModule, ChampionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
