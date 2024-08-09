import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class DirectionValidationCreate{
    @ApiProperty()
    @IsOptional()
    street:string;   

    @ApiProperty()
    @IsOptional()
    ext_number:string;  

    @ApiProperty()
    @IsOptional()
    int_number:string;  

    @ApiProperty()
    @IsOptional()
    neighborhood:string;  

    @ApiProperty()
    @IsOptional()
    country:string;  

    @ApiProperty()
    @IsOptional()
    state:string;  

    @ApiProperty()
    @IsOptional()
    postal_code:string;  
} 