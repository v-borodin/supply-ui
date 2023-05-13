import { Inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { AppConfigRepository } from '../interfaces/config-descriptors';

enum GitObject {
  tree = 'tree',

  blob = 'blob',
}

@Injectable({
  providedIn: 'root',
})
export class GithubUrlService {
  constructor(@Inject(ConfigService) private readonly config: ConfigService) {}

  getProjectUrl(projectName: string, pointer = GitObject.tree): string {
    if (!this.availableProjects.includes(projectName)) {
      throw new Error(`Project with name [${projectName}] was not found`);
    }

    return this.constructRepositoryUrl(projectName, pointer);
  }

  private constructRepositoryUrl(projectName: string, pointer: GitObject): string {
    const { baseUrl, actualBranch, baseDirectory } = this.repositoryConfiguration;
    return `${baseUrl}/${pointer}/${actualBranch}/${baseDirectory}/${projectName}`;
  }

  private get availableProjects(): readonly string[] {
    return this.repositoryConfiguration.projects;
  }

  private get repositoryConfiguration(): AppConfigRepository {
    return this.config.get('repository');
  }
}
