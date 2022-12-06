import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardTrail } from 'src/app/model/card-trail.interface';
import { updateEnvironmentTableByTracelines } from 'src/app/utils/update-environment-table';

@Component({
  selector: 'app-tracetable-modal',
  templateUrl: './tracetable-modal.component.html',
  styleUrls: ['./tracetable-modal.component.scss'],
})
export class TracetableModalComponent implements OnInit {
  trail?: CardTrail = undefined;
  code: string = "";

  foo: string = "";
  bar: string = "";
  x: string = "";
  y: string = "";
  z: string = "";

  constructor(private modalCtrl: ModalController) { 
  }

  ngOnInit() {
    if (!this.trail) {
      return
    }
    this.code = this.trail?.environmentCard.declarationsSnippet + this.trail?.codeCards.map(c => c.snippet).join("\n")
  }

  confirm() {
    updateEnvironmentTableByTracelines(this.trail as CardTrail);
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  addLine() {
    if (!this.trail) {
      return
    }
    this.trail.tracetable.push({
      foo: this.foo,
      bar: this.bar,
      x: this.x,
      y: this.y,
      z: this.z
    });
    this.foo = "";
    this.bar = "";
    this.x = "";
    this.y = "";
    this.z = "";
  }

}
