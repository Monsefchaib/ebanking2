import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Virement} from 'app/interfaces/virement';
import { Compte} from 'app/interfaces/compte';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VirementService {
private url: string;

  constructor(private http: HttpClient) { 
    this.url='http://localhost:8080/virement';
  }

  public addVirement(virement:Virement, numero1:string , numero2:string ){
    console.log('ajouter Virement');
    console.log(virement);
    console.log(numero1);
    console.log(numero2);
    return this.http.post<Virement>(`${this.url}/add/${numero1}/${numero2}`,virement);
  }

  public getComptes(){
    return this.http.get<Compte[]>(`http://localhost:8080/compte/getbyclient/client1`);
  }
  
  public getVirementsRecu(numero: string){
    return this.http.get<Virement[]>(`${this.url}/getvirrecu/${numero}`);
  }
  public getVirementsEnvoyer(numero: string){
    return this.http.get<Virement[]>(`${this.url}/getvirenv/${numero}`);
  }
}
