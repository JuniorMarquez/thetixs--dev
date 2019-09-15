import { Component, OnInit ,Inject} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import { CardInterface } from '../../models/card-interface'; 

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {

  constructor(
  	private dataApi: DataApiService
  	) { }

  ngOnInit() {
  }

}
