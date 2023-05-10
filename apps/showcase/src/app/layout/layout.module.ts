import { NgModule } from '@angular/core';
import { NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxContentOutlet } from '@coreteq/ngx-projection';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './sidebar/nav/nav.component';
import { NavItemComponent } from './sidebar/nav/item/nav-item.component';
import { NavGroupComponent } from './sidebar/nav/group/nav-group.component';
import { NavDividerDirective } from './sidebar/nav/divider/nav-divider.directive';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { AsideComponent } from './aside/aside.component';
import { SectionWrapperComponent } from './section-wrapper/section-wrapper.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageDividerComponent } from './page-divider/page-divider.component';
import { SupButtonComponent, SupIconComponent } from '@supply/uikit';

const toExport = [PageComponent, PageHeaderComponent, PageDividerComponent, SectionComponent, SectionWrapperComponent];

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
    AsideComponent,
    ...toExport,
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
  exports: [...toExport],
})
export class LayoutModule {}
