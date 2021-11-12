import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { REGION } from '../external/lol/constant/lol-region.constant';
import { ChampionTaskService } from './champion-task.service';
import { ChampionService } from './champion.service';

@Controller('champion')
@ApiTags('챔피언')
export class ChampionController {

    constructor(
        private championService: ChampionService,
        private championTaskService: ChampionTaskService
        ) { }

    @Get('patch')
    @ApiOperation({description: '챔피언 갱신'})
    @ApiQuery({name: 'region', description: '지역', example: "KR"})
    async patch(@Query('region') region: string = REGION.KR) {
        
        return await this.championTaskService.patchChampion(region);
    }
}
