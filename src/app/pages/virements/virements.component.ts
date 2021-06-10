import { Component,OnInit } from '@angular/core';
import { Virement} from 'app/interfaces/virement';
import { Compte} from 'app/interfaces/compte';
import { VirementService } from 'app/services/virement.service';


@Component({
    moduleId: module.id,
    selector: 'virements-cmp',
    templateUrl: 'virements.component.html'
})

export class VirementsComponent implements OnInit {

    comptes : Compte[];
    newVirement : Virement;

    constructor(private virementService: VirementService) {

  }

    ngOnInit() {
        this.getComptes();
        
    }

    public getVirementsEnv(compte,num){
        this.virementService.getVirementsEnvoyer(num).subscribe((response: Virement[])=>{compte.virementsEnvoyes=response});
    }
     
    public getVirementsRecu(compte,num){
        this.virementService.getVirementsRecu(num).subscribe((response: Virement[])=>{compte.virementsRecus=response;});
    }
    public onOpenModal(): void {
        console.log('clicked');
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#addCustomer');
        container.appendChild(button);
        button.click();
    }

    public addVirement(form,numC,numD){
        console.log("this is add virement method")
        this.newVirement = form.value;
        console.log(this.newVirement)
        this.virementService.addVirement(this.newVirement,numC,numD).subscribe((response : any) => {console.log(response); this.getComptes();});
        
    }

    public getComptes(){
        this.virementService.getComptes().subscribe((response: Compte[])=>{this.comptes=response;
         for(let compte of this.comptes){
          this.getVirementsRecu(compte, compte.numero);
          this.getVirementsEnv(compte, compte.numero);
         }
        });
        
    }
}
 