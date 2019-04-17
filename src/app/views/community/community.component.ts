import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service.client';
import {SharedService} from '../../services/shared.service.client';
import {UserService} from '../../services/user.service.client';
import {Router} from '@angular/router';
import {MapService} from '../../services/map.service.client';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  userId;
  user = {firstName: '', lastName: '', address: '', state: '', country: '', type: 'user'};
  lat = '';
  lng = '';

  constructor(public header: HeaderService, private sharedService: SharedService, private userService: UserService, private router: Router, private mapService: MapService) { }

  ngOnInit() {
    this.header.show();
    if (this.sharedService.user) {
      this.user = this.sharedService.user;
      this.userId = this.sharedService.user._id;
    }
    this.mapService.getLocation().subscribe((data) => {
      // console.log(data);
      this.lat = data.lat;
      this.lng = data.lng;
      this.user.state = data.region;
      this.user.country = data.country;
    })
  }

  onSubmit() {
    this.user.type = 'membership';
    this.userService.updateUser(this.userId, this.user)
      .subscribe((user) => {
        this.user = user;
        this.sharedService.user = user;
      });
    this.router.navigate(['/home']);
  }

}
