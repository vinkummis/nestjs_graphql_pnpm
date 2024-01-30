export class CustomResponse<T> {
  constructor(
    public data: T,
    public status: number,
    public message: string,
  ) {}

  static of<T>(data: T, status: number, message: string): CustomResponse<T> {
    return new CustomResponse(data, status, message);
  }
}
