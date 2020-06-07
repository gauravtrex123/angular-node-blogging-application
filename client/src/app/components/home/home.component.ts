import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotAuthGuard } from '../../guards/notAuth.guard';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messageClass;
  message;

  constructor(
    public authService:AuthService,
    private router:Router,
    private notAuthGuard:NotAuthGuard,
    private flashMessagesService: FlashMessagesService
  ) { }

  
  ngOnInit() {
    if(this.notAuthGuard.redirectUrl){
        this.flashMessagesService.show('you must be logged out to see the requested page', {cssClass:'alert-info'});
    }
  }

}
