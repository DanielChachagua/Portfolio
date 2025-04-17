import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { panelResolver } from './panel.resolver';

describe('panelResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => panelResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
