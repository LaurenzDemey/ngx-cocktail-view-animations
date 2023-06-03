import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VwtRouterOutletDirective } from '@ngx-cocktail-view-animations2/shared/transition';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  standalone: true,
  imports: [RouterModule,VwtRouterOutletDirective,HeaderComponent,FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
