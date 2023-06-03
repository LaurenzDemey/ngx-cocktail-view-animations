import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VwtRouterOutletDirective } from '@ngx-cocktail-view-animations2/shared/transition';

@Component({
  standalone: true,
  imports: [RouterModule,VwtRouterOutletDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
