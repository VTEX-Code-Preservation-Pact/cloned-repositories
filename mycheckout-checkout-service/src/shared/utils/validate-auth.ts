import { ProfilesService } from '../../app/users/profiles/profiles.service';
import { JwtService } from '@nestjs/jwt';

export async function ValidateAuth(
  request: any,
  jwtService: JwtService,
  profilesService: ProfilesService,
): Promise<any> {
  try {
    const email = request.params.email;
    const verifiedToken = await jwtService.verify(
      request.headers.authorization.replace('Bearer ', ''),
    );
    if (email && email !== verifiedToken.email) return false;

    request.user = await profilesService.getById(verifiedToken.id);
    request.user.email = verifiedToken.email;
    request.account = verifiedToken.account;
    return true;
  } catch (error) {
    return false;
  }
}
