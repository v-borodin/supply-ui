import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { AccordionItemComponent } from '@supply/uikit/components';
import { filter, mapTo, merge } from 'rxjs';

@Component({
  selector: 'sup-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(AccordionItemComponent)
  readonly items = new QueryList<AccordionItemComponent>();

  @Input()
  multiple = false;

  ngAfterContentInit() {
    const { items, multiple } = this;
    if (!multiple) {
      const itemCollapse$ = merge(
        ...items.map(item =>
          item.collapseChange.pipe(
            filter(isCollapsed => isCollapsed),
            mapTo(item)
          )
        )
      );
      itemCollapse$.subscribe(current => {
        this.items.forEach(item => {
          if (item !== current && item.collapse) {
            item.close();
          }
        });
      });
    }
  }
}
