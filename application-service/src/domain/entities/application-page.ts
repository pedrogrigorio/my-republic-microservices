import { Application } from './application';

interface ApplicationPageProps {
  total: number;
  applications: Application[];
}

export class ApplicationPage {
  private props: ApplicationPageProps;

  constructor(props: ApplicationPageProps) {
    this.props = props;
  }

  public get total() {
    return this.props.total;
  }

  public set total(total: number) {
    this.props.total = total;
  }

  public get applications() {
    return this.props.applications;
  }

  public set applications(applications: Application[]) {
    this.props.applications = applications;
  }
}
