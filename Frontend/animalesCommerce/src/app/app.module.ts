import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { RefugiosComponent } from './pages/refugios/refugios.component';
import { VeterinariosComponent } from './pages/veterinarios/veterinarios.component';
import { LoguearseComponent } from './auth/loguearse/loguearse.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { ReportarComponent } from './pages/reportar/reportar.component';
import { RegistrarseComponent } from './auth/registrarse/registrarse.component';
import { FinalizarAdopcionComponent } from './pages/finalizar-adopcion/finalizar-adopcion.component';
import { ListaAdopcionComponent } from './pages/lista-adopcion/lista-adopcion.component';
import { CartComponent } from './pages/cart/cart.component';
/* import { ProductDetailsComponent} from './pages/product-details/product-details.component'; */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MiCuentaComponent } from './auth/mi-cuenta/mi-cuenta.component';
import { AgregarAnimalComponent } from './pages/agregar-animal/agregar-animal.component';
import { AuthGuard } from './services/auth/auth.guard';
import { Interceptor } from './services/auth/interceptor';
import { ErrorInterceptor } from './services/auth/error.interceptor';
import { AuthService } from './services/auth/auth.service';
import { ModificarAnimalComponent } from './pages/modificar-animal/modificar-animal.component';
import { AnimalGuard } from './services/animal.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'refugios', component: RefugiosComponent },
  { path: 'veterinarios', component: VeterinariosComponent },
  { path: 'login', component: LoguearseComponent },
  { path: 'donaciones', component: DonacionesComponent },
  { path: 'reportar', component: ReportarComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'registrarse', component: RegistrarseComponent },
  { path: 'finalizarAdopcion', component: FinalizarAdopcionComponent },
  { path: 'listaAdopcion', component: ListaAdopcionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'miCuenta', canActivate:[AuthGuard], component: MiCuentaComponent },
  { path: 'agregarAnimal', canActivate:[AnimalGuard], component: AgregarAnimalComponent },
  { path: 'modificarAnimal/:id', canActivate:[AnimalGuard], component: ModificarAnimalComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NosotrosComponent,
    ContactoComponent,
    HomeComponent,
    RefugiosComponent,
    VeterinariosComponent,
    LoguearseComponent,
    DonacionesComponent,
    ReportarComponent,
    RegistrarseComponent,
    FinalizarAdopcionComponent,
    ListaAdopcionComponent,
    CartComponent,
    MiCuentaComponent,
    AgregarAnimalComponent,
    ModificarAnimalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthService,
    {provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
