import {
  Inject,
  Injectable,
  INJECTOR,
  Injector,
  Optional,
  SkipSelf,
  StaticProvider,
  Type,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  SUP_DATA_CONTEXT,
  SupAbstractDialogService,
  SupDialog,
  SupDialogOptions,
} from '@supply/cdk';
import { SUP_DIALOG_CONTAINER, SUP_DIALOG_OPTIONS } from './dialog.helpers';
import { Observable } from 'rxjs';
import { SupDialogRef } from '@supply/cdk/classes';

@Injectable({
  providedIn: 'root',
})
export class SupDialogService extends SupAbstractDialogService<SupDialogOptions> {
  private selfOpenDialogs: SupDialogRef[] = [];

  get openDialogs(): readonly SupDialogRef[] {
    return this.parentDialog ? this.parentDialog.openDialogs : this.selfOpenDialogs;
  }

  constructor(
    @Inject(SUP_DIALOG_CONTAINER) protected readonly container: Type<unknown>,
    @Inject(SUP_DIALOG_OPTIONS) protected readonly defaultOptions: SupDialogOptions,
    @Inject(INJECTOR) private readonly injector: Injector,
    @Optional()
    @SkipSelf()
    @Inject(SupDialogService)
    private readonly parentDialog: SupDialogService,
    @Inject(Overlay) private readonly overlay: Overlay
  ) {
    super();
  }

  protected create(dialog: SupDialog<SupDialogOptions<any>>): Observable<unknown> {
    const overlayRef = this.overlay.create(dialog.overlayConfig);
    const dialogRef = new SupDialogRef(overlayRef, dialog);
    this.attachContainer(dialog, overlayRef, dialogRef);

    return dialogRef.onCompleted;
  }

  private attachContainer(
    dialog: SupDialog<SupDialogOptions<any>>,
    overlayRef: OverlayRef,
    dialogRef: SupDialogRef
  ): void {
    const providers = this.getStaticProviders(overlayRef, dialog, dialogRef);

    const containerPortal = new ComponentPortal(
      this.container,
      null,
      Injector.create({ parent: dialog.injector || this.injector, providers })
    );

    overlayRef.attach(containerPortal);
  }

  private getStaticProviders(
    overlayRef: OverlayRef,
    dialogContext: SupDialog<SupDialogOptions<any>>,
    dialogRef: SupDialogRef
  ): StaticProvider[] {
    return [
      {
        provide: OverlayRef,
        useValue: overlayRef,
      },
      {
        provide: SUP_DATA_CONTEXT,
        useValue: {
          ...dialogContext,
          $implicit: dialogRef,
        },
      },
      {
        provide: SupDialogRef,
        useValue: dialogRef,
      },
    ];
  }
}
