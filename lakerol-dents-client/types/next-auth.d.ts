import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    error: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
