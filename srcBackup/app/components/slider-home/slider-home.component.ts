import { Component, OnInit,Inject } from '@angular/core';
import {DataApiService} from '../../services/data-api.service';
import { TixInterface } from '../../models/tix-interface'; 

declare var $: any;

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.css']
})
export class SliderHomeComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  private tixs:TixInterface;
	ngOnInit(): void {
  this.getAllTixs();

   		//this.filter();
  		//$.getScript('assets/js/collage.js');
 	//	$.getScript('assets/js/custom.js');
		//this._ps.imagesG=[];
		//this.product=[]	;	
  	}

    getAllTixs(){
//      this.dataApi.getAllTixs().subscribe(tixs => console.log(tixs));
        this.dataApi
        .getAllTixs()
        .subscribe((tixs: TixInterface) => (this.tixs=tixs));
    }


}
