import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardTrail } from 'src/app/model/card-trail.interface';
import { updateEnvironmentTable } from 'src/app/utils/update-environment-table';

@Component({
  selector: 'app-tracetable-modal',
  templateUrl: './tracetable-modal.component.html',
  styleUrls: ['./tracetable-modal.component.scss'],
})
export class TracetableModalComponent implements OnInit {
  trail?: CardTrail = undefined;
  code: string = "";

  constructor(private modalCtrl: ModalController) { 
  }

  ngOnInit() {
    if (!this.trail) {
      return
    }
    this.code = this.trail?.environmentCard.declarationsSnippet + this.trail?.codeCards.map(c => c.snippet).join("\n")
  }

  confirm() {
    updateEnvironmentTable(this.trail as CardTrail);
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
