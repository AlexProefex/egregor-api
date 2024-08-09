import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BankValidationCreate {

    @ApiProperty()
    @IsOptional()
    bank_name:string;  

    @ApiProperty()
    @IsOptional()
    swift_code:string;  

    @ApiProperty()
    @IsOptional()
    bank_account:string;  

    @ApiProperty()
    @IsOptional()
    bank_address:string;  

}