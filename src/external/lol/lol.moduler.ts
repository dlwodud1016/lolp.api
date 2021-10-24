import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { LolDeveloperApi } from "./lol-developer.api";

console.log("Riot-Token : ", process.env.Riot_Token);
@Module({
    imports: [
        HttpModule.register({
            // timeout: 5000,
            // maxRedirects: 5,
            headers: {'X-Riot-Token': process.env.Riot_Token },
        }),
    ],
    providers: [LolDeveloperApi],
    controllers: [],
    exports: [LolDeveloperApi]
  })
  
  export class LoLModule {}