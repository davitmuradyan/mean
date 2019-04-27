import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss']
})
export class NumericalComponent implements OnInit {

  form: FormGroup;

  absErr = null;
  relErr = null;

  ngOnInit(): void {
    this.form = new FormGroup({
      p: new FormControl(null, []),
      pStar: new FormControl(null, []),
      r: new FormControl(null, []),
      rStar: new FormControl(null, []),
    });
  }

  calculateAbsErr(): void {
    this.absErr = Math.abs(this.form.value.p - this.form.value.pStar);
  }

  calculateRelErr(): void {
    this.relErr = Math.abs(this.form.value.r - this.form.value.rStar) / Math.abs(this.form.value.r);
  }

}
