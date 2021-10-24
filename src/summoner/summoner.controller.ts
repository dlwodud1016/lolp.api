import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { REGION } from '../external/lol/constant/lol-region.constant';
import { SummonerService } from './summoner.service';

@Controller('summoner')
@ApiTags('소환사')
export class SummonerController {

    constructor(private service: SummonerService) { }

    @Get(':name')
    @ApiOperation({description: '소환사 조회'})
    @ApiParam({name: 'name', description: '소환사명', example: "쪼렙이다말로하자"})
    @ApiQuery({name: 'region', description: '지역', example: "KR"})
    async getDetail(@Param('name') name: string, @Query('region') region: string = REGION.KR) {
        
        return await this.service.getBySummonerName(name, region);
    }
}
