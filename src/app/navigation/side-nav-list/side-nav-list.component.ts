import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.scss']
})
export class SideNavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

}
