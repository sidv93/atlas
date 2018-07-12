import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { DefectPredictionService } from '../../../services/defect-prediction.service';
import { DeployService } from '../deploy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-history',
  templateUrl: './file-history.component.html',
  styleUrls: ['./file-history.component.css']
})
export class FileHistoryComponent implements OnInit {

  public fileData;
  public defectPredictionData;
  public filteredData;
  public linesOfCode;
  public codeComplexity;
  public fileDataResponse;
  public fileName;
  public chartLOC;
  public chartCC;
  public pointBackgroundColors = [];
  constructor(private globalService: GlobalService, private defectPredictionService: DefectPredictionService,
    private deployService: DeployService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.deployService.fromDefect) {
      this.getFileHistory();
      this.getLinesOfCode();
    } else {
      this.router.navigate(['../defect-prediction'], { relativeTo: this.route });
    }

  }

  public getFileHistory() {
    this.fileData = this.deployService.getFileHistoryData();
    this.defectPredictionData = this.deployService.predictionData;
    this.filteredData = this.defectPredictionData.filter(item => item.file === this.fileData[0].file);
    this.filteredData.forEach(item => {
      const newDate = new Date(item.time);
      item.time = [];
      item.time[0] = newDate.toLocaleString('en-us', { month: 'long' }) + ' ' + newDate.getDate() + ', ' + newDate.getFullYear();
      item.time[1] = newDate.getHours() + ':' + newDate.getMinutes();
    });
  }

  public amOrPm(time: string) {
    const hour = time.split(':')[0];
    if ((+hour) === 0) {
      return 'am';
    } else if ((+hour) >= 12 && (+hour) <= 23) {
      return 'pm';
    }
    return 'am';
  }

  public getLinesOfCode() {
    this.fileData = this.deployService.getFileHistoryData();
    console.log(this.fileData);
    this.fileName = encodeURI(this.fileData[0].file);
    this.defectPredictionService.getFileHistoryData('pipeline', this.globalService.project.projectId, 'release', this.fileName).subscribe(
      data => {
        let fileHistory = [], dataSetLOC = [], dataSetCC = [], predictions = [];
        this.fileDataResponse = data.result.details;
        this.fileDataResponse.forEach(item => fileHistory.push({
          'commits': item.commitId,
          'loc': item.lineOfCode,
          'CodeComplex': item.codeComplexity,
          'prediction': item.prediction
        }));
        fileHistory = fileHistory.sort((a, b) => {
          const commitA = a.commits.toLowerCase(), commitB = b.commits.toLowerCase();
          if (commitA < commitB) {
            return -1;
          }
          if (commitA > commitB) {
            return 1;
          }
          return 0;
        });
        const labels = fileHistory.map(item => item.commits);
        const lineOfCode = fileHistory.map(item => item.loc);
        const CodeComplexityLabels = fileHistory.map(item => item.CodeComplex);
        const prediction = fileHistory.map(item => item.prediction);
        for (let k = 0; k < prediction.length; k++) {
          if (prediction[k] === 'clean') {
            this.pointBackgroundColors.push('green');
          } else {
            this.pointBackgroundColors.push('red');
          }
        }

        dataSetLOC = [{
          data: lineOfCode,
          borderColor: '#8ECFE8',
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: this.pointBackgroundColors,
          pointBorderColor: '#8ECFE8',
          pointBorderWidth: 1,
          pointRadius: 5
        }];

        dataSetCC = [{
          data: CodeComplexityLabels,
          borderColor: '#8ECFE8',
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: this.pointBackgroundColors,
          pointBorderColor: '#8ECFE8',
          pointBorderWidth: 1,
          pointRadius: 5
        }];

        this.chartLOC = this.globalService.makeLineGraph('linesOfCode', labels, dataSetLOC, 1000, prediction);
        this.chartCC = this.globalService.makeLineGraph('codeComplexity', labels, dataSetCC, 10, prediction);

      }, error => {
        console.log('Error :' + JSON.stringify(error));
      }
    );
  }
}
