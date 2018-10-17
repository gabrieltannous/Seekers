import { Company } from './company';

export class Job {
  public $key: string;
  public id: string;
  public mode: string;
  public companyId: string;
  public company: Company;
  public title: string;
  public type: string;
  public salary: string;
}
