import { InvalidGenderException } from '../exceptions/invalid-gender.exception';
import { InvalidEmailException } from '../exceptions/invalid-email.exception';
import { Gender } from '../enums/gender';

interface UserProps {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  imgSrc?: string;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: UserProps, id?: number) {
    this.validateGender(props.gender);
    this.validateEmail(props.email);

    this._id = id;
    this.props = props;
  }

  private validateGender(gender: Gender) {
    if (gender !== 'MALE' && gender !== 'FEMALE') {
      throw new InvalidGenderException('Invalid gender');
    }
  }

  private validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      throw new InvalidEmailException('Invalid email');
    }
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

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.validateEmail(email);
    this.props.email = email;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get imgSrc() {
    return this.props.imgSrc;
  }

  public set imgSrc(imgSrc: string) {
    this.props.imgSrc = imgSrc;
  }

  public get gender() {
    return this.props.gender;
  }

  public set gender(gender: Gender) {
    this.validateGender(gender);
    this.props.gender = gender;
  }
}
