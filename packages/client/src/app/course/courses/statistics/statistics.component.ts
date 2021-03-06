import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StatService } from '../../../shared/services/stat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  finalMean = null;
  finalVariance = null;
  sorted = null;
  kos = null;
  finalMedian = null;
  finalMode = null;
  finalTrimmedMean = null;
  hidden = false;
  canSaveDataset = false;
  canUpdateDataset = false;
  datasets = [];
  message = '';
  dataSetToSave;

  createSub$: Subscription;
  updateSub$: Subscription;
  removeSub$: Subscription;
  fetchSub$: Subscription;
  @ViewChild('newData') newDatasetRef: ElementRef;

  constructor(private statService: StatService) { }

  ngOnInit(): void {
    this.fetch();
  }

  calculateMean(dataset, from = false): number {
      const sum = dataset.reduce((acc, cur) => +acc + +cur);
      if (from) {
        return sum / dataset.length;
      }
      this.finalMean = sum / dataset.length;
      return this.finalMean;
  }

  calculateTrimmedMean(dataset, trim = 1): number {
    dataset = this.sortData(dataset, true);
    dataset.splice(0, trim);
    dataset.splice(dataset.length - trim, trim);
    this.finalTrimmedMean = this.calculateMean(dataset, true);
    return this.finalTrimmedMean;
  }

  calculateVariance(dataset): number {
    const localMean = this.calculateMean(dataset, true);
    let sum = 0;
    dataset.map( item => {
      sum += (+item - localMean) ** 2;
    });
    this.finalVariance = sum / dataset.length;
    return this.finalVariance;
  }

  sortData(dataset: any, from = false): [] {
    dataset = dataset.map(Number);
    if (from) {
      return dataset.sort((a, b) => a - b);
    }
    this.sorted = dataset.sort((a, b) => a - b);
    return this.sorted;
  }

  kthOrderStatistics(dataset, stat): number {
    const sorted = this.sortData(dataset, true);
    this.kos = sorted[+stat - 1];
    return this.kos;
  }

  calculateMedian(dataset) {
    const sorted = this.sortData(dataset, true);
    const len = sorted.length;
    if (len % 2 === 0) {
      this.finalMedian = (sorted[(len / 2) - 1] + sorted[(len / 2)]) / 2;
    } else {
      this.finalMedian = sorted[(len  + 1) / 2 - 1];
    }
    return this.finalMedian;
  }

  calculateMode(dataset): number {
    let mf = 1;
    let m = 0;
    let item;
    for (let i = 0; i < dataset.length; i++) {
      for (let j = i; j < dataset.length; j++) {
        if (dataset[i] === dataset[j]) {
          m++;
        }
        if (mf < m) {
          mf = m;
          item = dataset[i];
        }
      }
      m = 0;
    }
    this.finalMode = item;
    return this.finalMode;
  }

  remove(id): void {
    this.removeSub$ = this.statService.remove(id)
      .subscribe(() => {
        this.fetch();
      }, error => {
        console.log(error);
      });
  }

  edit(dataset) {
    dataset.editMode = !dataset.editMode;
  }

  update(dataset): void {
    const newDataset = this.newDatasetRef.nativeElement.value.split(',').map(Number);
    this.updateSub$ = this.statService.update(dataset._id, newDataset)
      .subscribe((data) => {
        this.fetch();
        this.message = '';
      }, (error) => {
        this.message = error.error.message;
        console.log(error);
      });
  }

  fetch(): void {
    this.datasets = [];
    this.fetchSub$ = this.statService.fetch()
      .subscribe((data) => {
        data.map(set => {
          set.editMode = false;
          this.datasets.push(set);
        });
      }, error => {
        console.log(error);
      });
  }

  save(): void {
    const dataset = this.dataSetToSave.split(',').map(Number);
    this.createSub$ = this.statService.create(dataset)
      .subscribe(data => {
       this.fetch();
       this.dataSetToSave = null;
       this.message = '';
      }, error => {
        this.message = error.error.message;
        console.log(error);
      });
  }

  showHide(): void {
    this.hidden = !this.hidden;
  }

  onKeyUp(event: Event): void {
    const commaSeparatedRegExp = /^\w+(,\w+)*$/;
    this.canSaveDataset = commaSeparatedRegExp.test(this.dataSetToSave);
    if (this.newDatasetRef) {
      this.canUpdateDataset = commaSeparatedRegExp.test(this.newDatasetRef.nativeElement.value);
    }
  }

  ngOnDestroy(): void {
    if (this.createSub$) { this.createSub$.unsubscribe(); }
    if (this.updateSub$) { this.updateSub$.unsubscribe(); }
    if (this.removeSub$) { this.removeSub$.unsubscribe(); }
    if (this.fetchSub$) { this.fetchSub$.unsubscribe(); }
  }
}
