export interface AppConfigRepository {
  readonly baseUrl: string;

  readonly actualBranch: string;

  readonly baseDirectory: string;

  readonly projects: ReadonlyArray<string>;
}
