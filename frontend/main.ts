import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootComponentModule } from './root/root';
import { enableProdMode } from '@angular/core';

import 'zone.js/dist/zone';

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(RootComponentModule)
  .catch(err => console.error(err));
