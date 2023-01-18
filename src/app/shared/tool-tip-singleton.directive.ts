import { Directive } from '@angular/core';
import { createSingleton } from 'tippy.js';

@Directive({
  selector: '[appToolTipSingleton]',
})
export class ToolTipSingletonDirective {
  constructor() {}
}
