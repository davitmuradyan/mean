import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  finalMean = null
  finalVariance = null
  sorted = null
  kos = null
  finalMedian = null
  finalMode = null

  constructor() { }

  ngOnInit() {
  }

  calculateMean(dataset, from = false) {
      let sum = 0
      dataset.map( item => {
        sum += +item
      })
      if (from) {
        const mean = sum/dataset.length
        return mean
      }
      this.finalMean = sum/dataset.length
      return this.finalMean
  }

  calculateVariance(dataset) {
    let localMean = this.calculateMean(dataset, true)
    let sum = 0
    dataset.map( item => {
      sum += (+item - localMean)**2
    })
    this.finalVariance = sum/dataset.length
    return this.finalVariance
  }

  sortData(dataset: any, from = false) {
    dataset = dataset.map(Number)
    if (from) 
      return dataset.sort((a,b) => a - b)
    this.sorted = dataset.sort((a,b) => a - b)
    return this.sorted
  }

  kthOrderStatistics(dataset, stat) {
    const sorted = this.sortData(dataset, true)
    this.kos = sorted[+stat - 1]
    return this.kos
  }

  calculateMedian(dataset, from = false) {
    const sorted = this.sortData(dataset, true)
    const len = sorted.length
    if (len % 2 === 0) {
      console.log(sorted[(len / 2)])
      this.finalMedian = (sorted[(len / 2) - 1] + sorted[(len / 2)])/2
    } else {
      this.finalMedian = sorted[(len  + 1)/2 - 1]
    }
    return this.finalMedian
  }

  calculateMode(dataset) {
    let mf = 1;
    let m = 0;
    let item;
    for (let i=0; i<dataset.length; i++) {
      for (let j=i; j<dataset.length; j++) {
        if (dataset[i] == dataset[j])
          m++;
        if (mf<m) {
          mf=m; 
          item = dataset[i];
        }
      }
      m=0;
    }
    this.finalMode = item
    return this.finalMode
  }
  
}
