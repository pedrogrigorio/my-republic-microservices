interface ApplicantProps {
  name: string;
  imgSrc: string;
}

export class Applicant {
  private _id: number;
  private props: ApplicantProps;

  constructor(props: ApplicantProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get imgSrc() {
    return this.props.imgSrc;
  }

  public set imgSrc(imgSrc: string) {
    this.props.imgSrc = imgSrc;
  }
}
