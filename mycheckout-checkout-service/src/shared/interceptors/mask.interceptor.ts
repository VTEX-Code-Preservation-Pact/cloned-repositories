import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isArray } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard';
import { ProfilesService } from '../../app/users/profiles/profiles.service';

@Injectable()
export class MaskInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: ProfilesService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const authGuard = await new AuthGuard(
      this.jwtService,
      this.usersService,
    ).canActivate(context);
    const mask = !authGuard;
    return next.handle().pipe(
      map((result) => {
        if (mask) {
          try {
            if (isArray(result)) {
              return result.map((res) => {
                return res.mask();
              });
            } else return result.mask();
          } catch (e) {
            console.log('MASK ERROR', e, JSON.stringify(result));
          }
        }
        return result;
      }),
    );
  }
}
