import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PrepaymentModalComponent } from '../../../components/vacation/dynamic-modal-content/prepayment-modal/prepayment-modal.component';
import { FCCModalComponent } from '../../../components/vacation/dynamic-modal-content/fcc-modal/fcc-modal.component';
import {ConfigModalComponent} from '../../../components/vacation/dynamic-modal-content/config-modal/config-modal.component';
import {BudgetItemModalComponent} from '../../../components/vacation/dynamic-modal-content/budget-item-modal-component/budget-item-modal-component.component';
import {PrepaymentSourceModalComponent} from '../../../pages/admin/manage/prepayment/source/manage-prepayment-source/prepaymentsourcemodal/prepaymentsourcemodal.component';
import PrepaymentSource from '@models/vacation-planner/prepayment_source.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) {}
  
  _getModalComponentDataItems(modalTarget:string, data:any):any{
  	  var resp:any = {
  	  	component:null,
  	  	dialogConfig:{
  	  		vacation_id: data.vacation_id,
  			data:data
  	  	}
  	  }
	  
  	  switch(modalTarget){
		case "prepaymentsource":
			resp.component = PrepaymentSourceModalComponent;
			if(!resp.dialogConfig.data.prepaymentSource){
				resp.dialogConfig.data.prepaymentSource = {
					id:"",
					active:"",
					name:"",
					cashback_rate:""
				}
			}
			break;
  	  	case "prepayment":
  	  		resp.component = PrepaymentModalComponent;
  			
  			if(!resp.dialogConfig.data.prepayment){
  				resp.dialogConfig.data.prepayment = {
  					"description":"",
  					"type":"",
  					"vendor":"",
  					"isRefundable":"",
  					"amount":"",
  					"paymentSource":""
  				}
  			}
  	  		break;
  		case "config":
  			resp.component = ConfigModalComponent;
  			
  			if(!resp.dialogConfig.data.config){
  				resp.dialogConfig.data.config = {
  					config_label:"",
  					id: "",
  					config_key:"",
  					config_value:"",
  					config_notes:""
  				}
  			}
  			break;
  	  	case "fcc":
  	  		resp.component = FCCModalComponent;

  			if(!resp.dialogConfig.data.fcc){
  				resp.dialogConfig.data.fcc = {
  					"fccTitle":"",
  					"fccAmount":0
  				}
  				
  				resp.dialogConfig.data.createNewFCC = true;
  			}
  	  		break;
  		case "bi":
  			resp.component = BudgetItemModalComponent;
  			
  			if(!resp.dialogConfig.data.budgetItem){
  				resp.dialogConfig.data.budgetItem = {
  					id:"",
  					item:"",
  					amount:"",
  					amountGoal:"",
  					cashRequirement:"",
  					notes:"",
  					order:""
  				}
  			}
  			break;
  	  }
  	  return resp;
    }
  
  generateModal(modalTarget:string, data:any): void{
    		const dialogConfig = new MatDialogConfig();
    		
    		var dialogConfigData = this._getModalComponentDataItems(modalTarget, data);
    		dialogConfig.data = dialogConfigData.dialogConfig;
    		
    		const dialog = this.dialog.open(dialogConfigData.component, dialogConfig);
	}
	
	generateAsyncModal(modalTarget:string, data:any): Promise<any>{
	    		const dialogConfig = new MatDialogConfig();
	    		
	    		var dialogConfigData = this._getModalComponentDataItems(modalTarget, data);
	    		dialogConfig.data = dialogConfigData.dialogConfig;
	    		
	    		const dialog = this.dialog.open(dialogConfigData.component, dialogConfig);
	    		
	    		
	    		/*dialog.afterClosed().subscribe(result=>{
					return new Promise(resolve => {
					      resolve(result);
					});
	    		})*/
				
				return new Promise(resolve => {
				      dialog.afterClosed().subscribe(result => {console.log(result);
				        resolve(result); // resolves ONLY when modal closes
					  });
				    
	    		});
		}
}
