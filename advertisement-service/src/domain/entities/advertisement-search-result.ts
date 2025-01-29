import { Advertisement } from './advertisement';

interface AdvertisementSearchResultProps {
  total: number;
  advertisements: Advertisement[];
}

export class AdvertisementSearchResult {
  private props: AdvertisementSearchResultProps;

  constructor(props: AdvertisementSearchResultProps) {
    this.props = props;
  }

  public get total() {
    return this.props.total;
  }

  public set total(total: number) {
    this.props.total = total;
  }

  public get advertisements() {
    return this.props.advertisements;
  }

  public set advertisements(advertisements: Advertisement[]) {
    this.props.advertisements = advertisements;
  }
}
