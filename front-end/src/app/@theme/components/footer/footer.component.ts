import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <b>InterPackage</b> Guatemala - 2022
    </span>
    <div class="socials">
      <a href="https://github.com/LouisGonzalez/Packages-AyD2" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
