import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';
import { User, UserModel } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async create({ email, account }: { email: string; account: string }) {
    const user = this.userModel.build({
      email,
      creationDate: new Date().toISOString(),
      createdAt: Date.now(),
      createdAccount: account,
    });
    try {
      return await user.save();
    } catch (e) {
      console.log(e);
    }
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  getUserById(id: string) {
    return this.userModel.get(id);
  }
}
