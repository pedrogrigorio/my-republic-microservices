import { State } from './state';
import { City } from './city';

interface AdvertisementProps {
  title: string;
  price: number;
  imgSrc: string;
  isActive: boolean;
  state: State;
  city: City;
}

export class Advertisement {
  private _id: number;
  private props: AdvertisementProps;

  constructor(props: AdvertisementProps, id?: number) {
    this._id = id;
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get price() {
    return this.props.price;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get imgSrc() {
    return this.props.imgSrc;
  }

  public set imgSrc(imgSrc: string) {
    this.props.imgSrc = imgSrc;
  }

  public get isActive() {
    return this.props.isActive;
  }

  public set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }

  public get city() {
    return this.props.city;
  }

  public set city(city: City) {
    this.props.city = city;
  }

  public get state() {
    return this.props.state;
  }

  public set state(state: State) {
    this.props.state = state;
  }
}
