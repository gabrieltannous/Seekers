import { Company } from './company';
import { User } from './user';
import { Job } from './job';

export class Interview {
  public $key: string;
  public companyId: string;
  public company: Company;
  public jobId: string;
  public job: Job;
  public userId: string;
  public user: User;
  public date: Date;
  public decision: string;
}
