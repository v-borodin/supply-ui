export type SupModifierKey = 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey';

export function supHasModifierKey(event: KeyboardEvent, ...modifiers: SupModifierKey[]): boolean {
  if (modifiers.length) {
    return modifiers.some(modifier => event[modifier]);
  }

  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
