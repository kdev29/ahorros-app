import { Component, OnInit } from '@angular/core';
import { sha256, sha224 } from 'js-sha256';
import { ActivatedRoute, Router } from '@angular/router';

const auth = '1342aee5f2251c21dfe96448c941ea4f4c0c4b0c157e4dc7c48263429380c5f4';
const KEY_ENTER = 13;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accessKey = '';
  encryptedKey = '';

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  login() {

    this.encryptedKey = sha256(this.accessKey);

    if (auth == this.encryptedKey)
    {
      sessionStorage.setItem('uuid', this.encryptedKey);
      this.router.navigate(['home']);
    }

  }

  isAuthenticated(): boolean{
    return sessionStorage.getItem('uuid') != undefined;
  }

  onKeyUp(e: KeyboardEvent, element){

    this.accessKey = element.value;

// tslint:disable-next-line: deprecation
    if (e.keyCode == KEY_ENTER) {
      this.login();
    }
  }



}
