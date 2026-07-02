import { Injectable, signal } from '@angular/core';
import { WebApiService } from '../../../services/web-api/web-api.service';
import {Observable} from "rxjs";
import {HttpResponse, HttpErrorResponse} from "@angular/common/http";
import PrepaymentSource from '../../../models/vacation-planner/prepayment_source.model';

@Injectable({
  providedIn: 'root'
})
export class PrepaymentService {

  constructor(private http: WebApiService) { }
 
}
