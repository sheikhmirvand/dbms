import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DatabasesComponent } from './pages/databases/databases.component';
import { DatabaseComponent } from './pages/database/database.component';
import { TableComponent } from './pages/table/table.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'databases', component: DatabasesComponent },
  { path: 'database/:name', component: DatabaseComponent },
  { path: ':dbName/:tableName', component: TableComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
