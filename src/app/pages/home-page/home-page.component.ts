import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AuthLogicService} from '@core/service/auth-logic.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()

  constructor(
    public AuthLogicService: AuthLogicService
  ) { }

  ngOnInit(): void {
  }

  userLogOut() {
    this.AuthLogicService.userLogOut();
    this.isLogout.emit();
  }

}
