export default interface Response {
  status: number;
  statusText: string;
  headers: object;
  config: object;
  data: object;
}
