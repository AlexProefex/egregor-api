import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export type jwtAny = any;

@Injectable()
export class token {

    constructor(private readonly jwtService: JwtService) {}

    decode(auth: string): any{
        const jwt = auth.replace('Bearer ', '');
        const payload = this.jwtService.decode(jwt, { json: true });
    console.log(payload);
       return payload;
       
    }
}