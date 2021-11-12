import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { League } from "../entities/league";
import { Summoner } from "../entities/summoner";
import { REGION } from "../external/lol/constant/lol-region.constant";
import { TIER } from "../external/lol/constant/lol-tier.constant";
import { LolDeveloperApi } from "../external/lol/lol-developer.api";
import { SummonerDto } from "./dto/summoner.dto";


@Injectable()
export class SummonerService {
    

    private readonly logger = new Logger(SummonerService.name);
    
    constructor(
        private connection: Connection,
        
        @InjectRepository(Summoner)
        private summonerRepository: Repository<Summoner>,
    
        @InjectRepository(League)
        private leagueRepository: Repository<League>,

        private lolDeveloperApi: LolDeveloperApi,
      ) { }

    winRate(wins:number, losses:number){
        let total = wins + losses;

        if(total === 0 || wins === 0)
            return 0;

        return (wins / total) * 100;
    }

    async getBySummonerName(name: string, region: string = REGION.KR) {
        
        let summoner:Summoner = null;
        let tier:string = null;
        let wins:number = 0;
        let losses:number = 0;

        summoner = await this.summonerRepository.findOne({where: {name: name, region: region}});
        
        this.logger.log(`summoner : ${summoner}`);

        // Step 1. 소환사(name) DB에 있는가?
        if(summoner === undefined){
            let lolSummoner = await this.lolDeveloperApi.summoner(name, region);

            lolSummoner.forEach(element => {
                summoner = new Summoner();
                summoner.id = element['id'];
                summoner.accountId = element['accountId'];
                summoner.puuid = element['puuid'];
                summoner.name = element['name'];
                summoner.profileIconId = element['profileIconId'];
                summoner.revisionDate = element['revisionDate'];
                summoner.summonerLevel = element['summonerLevel'];
                summoner.region = region;

                this.summonerRepository.save(summoner);
            });
        }

        // Step 1-1. 이후 MQ를 이용하여 소환사 상세정보를 취득하는게 효율적(나중에 하는걸로).
        let lolLeagueEntries = await this.lolDeveloperApi.leagueEntries(summoner.id, region);

        console.log("lolLeagueEntry : ", lolLeagueEntries);
      
        await this.connection.transaction(async manager => {
            lolLeagueEntries.forEach(async entry => {
                if (entry['queueType'] === TIER.RANKED_SOLO_5x5) {
                    tier = entry['tier'];
                }

                let league: League = new League();
                league.leagueId = entry['leagueId'];
                league.queueType = entry['queueType'];
                league.tier = entry['tier'];
                league.rank = entry['rank'];
                league.leaguePoints = entry['leaguePoints'];
                league.wins = wins = entry['wins'];
                league.losses = losses = entry['losses'];
                league.veteran = entry['veteran'];
                league.inactive = entry['inactive'];
                league.freshBlood = entry['freshBlood'];
                league.hotStreak = entry['hotStreak'];
                league.summonerId = entry['summonerId'];
                league.winRate = this.winRate(league.wins, league.losses);

                await manager.save(league);
            });
        });

        this.logger.log(`summoner name: ${summoner.name}, tier: ${tier}, winRate: ${this.winRate(wins, losses)}, profileIconId : ${summoner.profileIconId}`);

        // Step 2. 기본정보 응답(소환사명, 티어, 승률, 아이콘ID)
        return SummonerDto.toDto(summoner.id, summoner.name, tier, this.winRate(wins, losses), summoner.profileIconId);
    }

    getChampionRankingByName(name: string, region: string) {
        
    }
}