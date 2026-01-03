import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./converter/converter.route')
                .then(m => m.currencyRoutes)
    }
];
