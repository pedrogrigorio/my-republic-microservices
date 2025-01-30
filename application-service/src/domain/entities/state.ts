interface StateProps {
  uf: string;
}

export class State {
  private _id: number;
  private props: StateProps;

  constructor(props: StateProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get uf() {
    return this.props.uf;
  }

  public set uf(uf: string) {
    this.props.uf = uf;
  }
}
