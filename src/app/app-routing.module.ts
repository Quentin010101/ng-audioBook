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
import { LibrarySingleComponent } from './dashboard/library/library-single/library-single.component';
import { LibraryCategorySingleComponent } from './dashboard/library/library-category-single/library-category-single.component';

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
      data: { icon: 'home', text: 'Home', admin:false  }
    },
    {
      path:'library',
      component: LibraryComponent,
      data: { icon: 'library_books', text: 'Library', admin:false  }
    },
    {
      path:'library/category/:category',
      component: LibraryCategorySingleComponent,
      data: { icon: 'library_books', admin:false, nav:false  }
    },
    {
      path:'library/single/:id',
      component: LibrarySingleComponent,
      data: { icon: 'library_books', text: 'Library', admin:false, nav:false  }
    },
    {
      path:'addBook',
      component: AddAudioComponent,
      data: { icon: 'queue_music', text: 'Manage audio-book', admin:true },
      canActivate: [AdminGuard]
    },
    {
      path:'addCategory',
      component: AddCategoryComponent,
      data: { icon: 'insert_chart', text: 'Manage category', admin:true  },
      canActivate: [AdminGuard]
    },
    {
      path:'addUsers',
      component: UserComponent,
      data: { icon: 'supervisor_account', text: 'Manage users', admin:true  },
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
