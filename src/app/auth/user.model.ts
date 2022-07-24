/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
export class User {

  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private tokenExpirationDate: Date,
    public firstName?: string,
    public lastName?: string
    ) {}

  get token() {
    if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }

    return this._token;
  }

  set firstN(firstName: string) {
    this.firstName = firstName;
  }

  set lastN(lastName: string) {
    this.lastName = lastName;
  }

}
