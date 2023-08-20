import { AccountLink, AccountLinkModel } from './schemas/account-link.schema';
import { ApiResponse } from '../../../shared/responses';
import { CreateAccountLinkDto } from './dtos/createAccountLink.dto';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-dynamoose';

@Injectable()
export class AccountsLinksService {
  constructor(
    @InjectModel(AccountLink.name)
    private accountsLinksModel: AccountLinkModel,
  ) {}

  async linkRequest(accountLinkDto: CreateAccountLinkDto) {
    if (accountLinkDto.accountRequester === accountLinkDto.accountApprover) {
      throw ApiResponse.error('errors.link_exist', {}, HttpStatus.BAD_REQUEST);
    }

    const query = async (query) => {
      return await this.accountsLinksModel
        .query(query)
        .where('status')
        .not()
        .eq('removed')
        .and()
        .where('status')
        .not()
        .eq('rejected')
        .exec();
    };

    const q1 = await query({
      accountRequester: accountLinkDto.accountApprover,
      accountApprover: accountLinkDto.accountRequester,
    });
    const q2 = await query({
      accountRequester: accountLinkDto.accountRequester,
      accountApprover: accountLinkDto.accountApprover,
    });

    const existLink = [...q1, ...q2];

    if (!existLink || (existLink && existLink.length > 0)) {
      throw ApiResponse.error('errors.link_exist', {}, HttpStatus.BAD_REQUEST);
    }

    const accountLink = this.accountsLinksModel.build({
      accountRequester: accountLinkDto.accountRequester,
      accountApprover: accountLinkDto.accountApprover,
      date: new Date(),
    });

    return accountLink.save();
  }

  async getLinkRequest(account: string) {
    const query = async (query) => {
      return await this.accountsLinksModel
        .query(query)
        .where('status')
        .not()
        .eq('removed')
        .exec();
    };
    const req = await query({ accountRequester: account });
    const appr = await query({ accountApprover: account });

    return [...req, ...appr];
  }

  async linkUpdate(id: string, status: string) {
    const accountLink = await this.accountsLinksModel.get(id);

    if (!accountLink) {
      throw ApiResponse.error('errors.not_found', {}, HttpStatus.BAD_REQUEST);
    }

    accountLink.set({ status });
    return accountLink.save();
  }

  async deleteLink(id: string) {
    const accountLink = await this.accountsLinksModel.get(id);

    if (!accountLink) {
      throw ApiResponse.error('errors.not_found', {}, HttpStatus.BAD_REQUEST);
    }

    accountLink.set({ status: 'removed' });
    accountLink.save();
    return {
      removed: 1,
    };
  }

  async getLinkedAccounts(account: string) {
    const query = (query) => {
      return this.accountsLinksModel
        .query({ ...query, status: 'approved' })
        .exec();
    };
    const q1 = query({
      accountRequester: account,
    });
    const q2 = query({
      accountApprover: account,
    });
    const links = await Promise.all([q1, q2]);
    return [...links[0], ...links[1]];
  }
}
