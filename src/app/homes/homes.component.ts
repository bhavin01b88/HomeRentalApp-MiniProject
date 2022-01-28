import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  homeTypeDropdownOpen = false;

  homes$ : any = this.dataService.homes$;

  constructor(private dataService : DataService, private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const homeTypeFilters = params['home-type'] || [];
      this.dataService.loadHomes(homeTypeFilters);
    })
  }

  homeTypeFilterApplied($event : any){
    this.homeTypeDropdownOpen = false;
    this.router.navigate(['homes'], {queryParams : {'home-type' : $event}});
    console.log($event);
  }

}
