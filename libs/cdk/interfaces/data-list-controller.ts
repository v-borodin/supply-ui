export interface SupDataListController<T> {
  handleOption(option: any): void;

  checkOption?(option: T): void;
}
