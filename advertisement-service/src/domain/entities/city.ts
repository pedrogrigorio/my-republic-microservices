import { State } from './state';

interface CityProps {
  name: string;
  state?: State;
  stateId: number;
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

  public get state() {
    return this.props.state;
  }

  public set state(state: State) {
    this.props.state = state;
  }

  public get stateId() {
    return this.props.stateId;
  }

  public set stateId(stateId: number) {
    this.props.stateId = stateId;
  }
}
