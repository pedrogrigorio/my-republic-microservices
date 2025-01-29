interface RuleProps {
  tag: string;
  value: string;
}

export class Rule {
  private _id: number;
  private props: RuleProps;

  constructor(props: RuleProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get tag() {
    return this.props.tag;
  }

  public set tag(tag: string) {
    this.props.tag = tag;
  }

  public get value() {
    return this.props.value;
  }

  public set value(value: string) {
    this.props.value = value;
  }
}
