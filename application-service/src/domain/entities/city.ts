interface CityProps {
  name: string;
}

export class City {
  private _id: number;
  private props: CityProps;

  constructor(props: CityProps, id?: number) {
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
}
