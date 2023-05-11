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
    return `${this.baseUrl}/${pointer}/${this.actualBranch}/${this.baseDirectory}/${projectName}`;
  }

  private get baseDirectory(): string {
    return this.repositoryConfiguration.baseDirectory;
  }

  private get actualBranch(): string {
    return this.repositoryConfiguration.actualBranch;
  }

  private get availableProjects(): readonly string[] {
    return this.repositoryConfiguration.projects;
  }

  private get baseUrl(): string {
    return this.repositoryConfiguration.baseUrl;
  }

  private get repositoryConfiguration(): AppConfigRepository {
    return this.config.get('repository');
  }
}
