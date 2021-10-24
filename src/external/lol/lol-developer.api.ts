
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { lastValueFrom, map } from "rxjs";

@Injectable()
export class LolDeveloperApi{
    private readonly logger = new Logger(LolDeveloperApi.name);
    private readonly lolRootApi:string = "api.riotgames.com/lol";

    constructor(private httpService: HttpService) {}

    async summoner(name: string, region: string){
        let url = `https://${region.toLowerCase()}.${this.lolRootApi}/summoner/v4/summoners/by-name/${encodeURI(name)}`;

        return await lastValueFrom(await this.httpService.get(url)
        .pipe(
            map((response) => {return response.data}),
        ))
    }

    async leagueEntry(encryptedSummonerId: string, region: string){
      let url = `https://${region.toLowerCase()}.${this.lolRootApi}/league/v4/entries/by-summoner/${encryptedSummonerId}`;

      return await lastValueFrom(await this.httpService.get(url)
      .pipe(
          map((response) => {return response.data}),
      ))
    }



}