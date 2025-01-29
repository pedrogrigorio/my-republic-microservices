interface OwnerProps {
  name: string;
}

export class Owner {
  private _id: number;
  private props: OwnerProps;

  constructor(props: OwnerProps, id?: number) {
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
