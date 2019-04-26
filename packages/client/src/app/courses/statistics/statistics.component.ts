import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StatService } from '../../shared/services/stat.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  finalMean = null;
  finalVariance = null;
  sorted = null;
  kos = null;
  finalMedian = null;
  finalMode = null;
  datasets = [];
  hidden = false;
  dataSetToSave;
  canSaveDataset = false;
  canUpdateDataset = false;
  message = '';
  finalTrimmedMean = null;

  @ViewChild('newData') newDatasetRef: ElementRef;

  constructor(private statService: StatService) { }

  ngOnInit() {
    this.fetch();
  }

  calculateMean(dataset, from = false) {
      let sum = 0;
      dataset.map( item => {
        sum += +item;
      });
      if (from) {
        const mean = sum / dataset.length;
        return mean;
      }
      this.finalMean = sum / dataset.length;
      return this.finalMean;
  }

  calculateTrimmedMean(dataset, trim = 1) {
    dataset = this.sortData(dataset, true);
    dataset.splice(0, trim);
    dataset.splice(dataset.length - trim, trim);
    this.finalTrimmedMean = this.calculateMean(dataset, true);
    return this.finalTrimmedMean;
  }

  calculateVariance(dataset) {
    const localMean = this.calculateMean(dataset, true);
    let sum = 0;
    dataset.map( item => {
      sum += (+item - localMean) ** 2;
    });
    this.finalVariance = sum / dataset.length;
    return this.finalVariance;
  }

  sortData(dataset: any, from = false) {
    dataset = dataset.map(Number);
    if (from) {
      return dataset.sort((a, b) => a - b);
    }
    this.sorted = dataset.sort((a, b) => a - b);
    return this.sorted;
  }

  kthOrderStatistics(dataset, stat) {
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

  calculateMode(dataset) {
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

  remove(id) {
    this.statService.remove(id)
      .subscribe(() => {
        this.fetch();
      }, error => {
        console.log(error);
      });
  }

  edit(dataset) {
    dataset.editMode = !dataset.editMode;
  }

  update(dataset) {
    const newDataset = this.newDatasetRef.nativeElement.value.split(',').map(Number);
    this.statService.update(dataset._id, newDataset)
      .subscribe((data) => {
        this.fetch();
        this.message = '';
      }, (error) => {
        this.message = error.error.message;
        console.log(error);
      });
  }

  fetch() {
    this.datasets = [];
    this.statService.fetch()
      .subscribe((data) => {
        data.map(set => {
          set.editMode = false;
          this.datasets.push(set);
        });
      }, error => {
        console.log(error);
      });
  }

  save() {
    const dataset = this.dataSetToSave.split(',').map(Number);
    this.statService.create(dataset)
      .subscribe(data => {
       this.fetch();
       this.dataSetToSave = null;
       this.message = '';
      }, error => {
        this.message = error.error.message;
        console.log(error);
      });
  }

  showHide() {
    this.hidden = !this.hidden;
  }

  onKeyUp(event: Event) {
    const commaSeparatedRegExp = /^\w+(,\w+)*$/;
    this.canSaveDataset = commaSeparatedRegExp.test(this.dataSetToSave);
    if (this.newDatasetRef) {
      this.canUpdateDataset = commaSeparatedRegExp.test(this.newDatasetRef.nativeElement.value);
    }
  }
}
