import { ApiProperty } from "@nestjs/swagger";

export class SummonerDto {

    @ApiProperty({ description: 'Summorner Id'})
    id: string;

    @ApiProperty({ description: '소환사명'})
    name: string;

    @ApiProperty({ description: '티어'})
    tier: string;

    @ApiProperty({ description: '승률(반올림)'})
    winRate: number;

    @ApiProperty({ description: '프로필 ID'})
    profileIconId: number;

    public static toDto(id: string, name: string, tier:string , winRate: number, profileIconId: number): SummonerDto{
        let dto = new SummonerDto();

        dto.id = id;
        dto.name = name;
        dto.tier = tier;
        dto.winRate = Math.ceil(winRate);
        dto.profileIconId = profileIconId;

        return dto;
    }
}