import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in db, ofcourse

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      });

      delete user.hash;
      //return the saved user
      return user;
    } catch (error) {
      if (error in PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Email already exists");
        }
        throw error;
      }
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    });
    // is user does not exist throw error
    if (!user) {
      throw new ForbiddenException("Invalid email or password");
    }
    // check if the password is correct
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if not throw error
    if (!pwMatches) {
      throw new ForbiddenException("Invalid email or password");
    }
    // send back the user
    delete user.hash;
    return user;
  }
}
