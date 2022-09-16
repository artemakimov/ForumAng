import { Component,OnInit} from '@angular/core';
import { AuthModuleService } from 'src/app/core/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    public AuthModuleService: AuthModuleService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.AuthModuleService.signOut();
  }

}
