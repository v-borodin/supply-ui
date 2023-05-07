import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SupButtonComponent, SupIconComponent } from '@supply/uikit';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavComponent } from './sidebar/nav/nav.component';
import { NavItemComponent } from './sidebar/nav/item/nav-item.component';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { NavGroupComponent } from './sidebar/nav/group/nav-group.component';
import { NavDividerDirective } from './sidebar/nav/divider/nav-divider.directive';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { AsideComponent } from './aside/aside.component';
import { SectionListComponent } from './page/section-list/section-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainComponent,
    LayoutComponent,
    NavComponent,
    NavItemComponent,
    NavGroupComponent,
    NavDividerDirective,
    SectionComponent,
    PageComponent,
    AsideComponent,
    SectionListComponent,
  ],
  imports: [
    RouterOutlet,
    SupButtonComponent,
    NgForOf,
    SupIconComponent,
    RouterLink,
    NgxContentOutlet,
    NgTemplateOutlet,
    NgIf,
    RouterLinkActive,
  ],
  exports: [SectionComponent, PageComponent, SectionListComponent],
})
export class LayoutModule {}
