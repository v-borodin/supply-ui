import { SupDialogBase } from '@supply/cdk/interfaces';
import { SupDialogRef } from '@supply/cdk/classes';

export type SupDialog<TOptions> = TOptions &
  SupDialogBase<TOptions> & {
    $implicit: SupDialogRef;
  };
