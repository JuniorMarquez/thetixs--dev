import { Component, OnInit ,Inject} from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import { CardInterface } from '../../models/card-interface'; 

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css']
})
export class AffiliatesComponent implements OnInit {

   constructor(
  	private dataApi: DataApiService
  	) { }


	public cards:CardInterface;
 getActive(){
        this.dataApi
        .getActiveAffiliates()
        .subscribe((cards: CardInterface) => (this.cards=cards));
    }
 getPending(){
        this.dataApi
        .getPendingAffiliates()
        .subscribe((cards: CardInterface) => (this.cards=cards));
    }


 	ngOnInit(): void {
     this.getActive();
   		
  	}

}
