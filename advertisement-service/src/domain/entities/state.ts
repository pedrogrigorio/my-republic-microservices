import { City } from './city';

interface StateProps {
  uf: string;
  name: string;
  cities?: City[];
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

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get cities() {
    return this.props.cities;
  }

  public set cities(cities: City[]) {
    this.props.cities = cities;
  }
}
