import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './utils/not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserGuard } from './guard/user.guard';
import { HomeComponent } from './dashboard/home/home.component';
import { LibraryComponent } from './dashboard/library/library.component';
import { AddAudioComponent } from './dashboard/add-audio/add-audio.component';
import { AdminGuard } from './guard/admin.guard';
import { AddCategoryComponent } from './dashboard/add-category/add-category.component';
import { UserComponent } from './dashboard/user/user.component';

const routes: Routes = [
  { path:'', redirectTo: '/dashboard', pathMatch: 'full' },
  { path:'dashboard', 
  component: DashboardComponent, 
  canActivate: [UserGuard],
  children: [
    // {path:'', redirectTo: '/dashboard/home', pathMatch: 'full' },
    {
      path:'home',
      component: HomeComponent,
      data: { icon: 'home', text: 'Home' }
    },
    {
      path:'library',
      component: LibraryComponent,
      data: { icon: 'library_books', text: 'Library' }
    },
    {
      path:'addBook',
      component: AddAudioComponent,
      data: { icon: 'add_box', text: 'Manage audio-book' },
      canActivate: [AdminGuard]
    },
    {
      path:'addCategory',
      component: AddCategoryComponent,
      data: { icon: 'add_box', text: 'Manage category' },
      canActivate: [AdminGuard]
    },
    {
      path:'addUsers',
      component: UserComponent,
      data: { icon: 'add_box', text: 'Manage users' },
      canActivate: [AdminGuard]
    },
  ]

},
  { path:'login', component: LoginComponent },
  { path:'**', component: NotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
