import { InjectionToken } from '@angular/core';
import { LibProject } from '../enums/projects';

export const PROJECT_NAME = new InjectionToken<LibProject>('[PROJECT_NAME]');
