import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
// import { TrainingResultsService } from '../../../services/training-results.service';
import { GlobalService } from '../../../global.service';
import { Configuration } from '../../../app.constants';
import { PipelineService } from '../../../services/pipeline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluateService } from '../evaluate.service';
@Component({
  selector: 'app-training-results',
  templateUrl: './training-results.component.html',
  styleUrls: ['./training-results.component.css']
})
export class TrainingResultsComponent implements OnInit, AfterViewInit {
  @ViewChild('horizontalBar') horizontalBar: ElementRef;
  @ViewChild('bar') verticalBar: ElementRef;
  public accuracyChart = [];
  public experimentData;
  public confusionMatrix = [];
  public accuracy = [];
  public precision = [];
  public recall = [];
  public f1Score = [];
  public trainingRunFlow;

  constructor(private pipelineService: PipelineService, public configuration: Configuration, private globalService: GlobalService,
    private router: Router, private route: ActivatedRoute, private evaluateService: EvaluateService) {
    this.globalService.changeProduct$.subscribe(
      data => {
        this.evaluateService.router$.next(0);
        this.router.navigate(['../training-pipelines'], { relativeTo: this.route });
      }
    );
    this.globalService.productsFetched$.subscribe(
      data => {
        this.getExperimentData();
        this.getWorkFlowData();
      }
    );
  }

  ngOnInit() {
    if (this.globalService.productsLoaded) {
      this.getExperimentData();
      this.getWorkFlowData();
    }

  }
  ngAfterViewInit() {
    var lastNode = document.getElementsByTagName('circle:last-child');
    console.log(lastNode);
  }

  public getExperimentData() {
    this.pipelineService.getPipelineExperiments(this.globalService.product.productID).subscribe(
      data => {
        this.experimentData = data.experiment;
        const barCtx = this.verticalBar.nativeElement.getContext('2d');

        let accuracy = [], f1Score = [], precision = [], recall = [], pcaArray = [];
        let accuracyPca = [], f1ScorePca = [], precisionPca = [], recallPca = [];
        this.experimentData.nonPca.adasynAccuracy.forEach(item => accuracy.push({
          'algorithm': item.algorithm,
          'testAccuracy': item.testAccuracy, 'precision': item.precision, 'recall': item.recall, 'f1Score': item.f1Score
        }));
        this.experimentData.nonPca.imbalancedAccuracy.forEach(item => accuracy.push({
          'algorithm': item.algorithm,
          'testAccuracy': item.testAccuracy, 'precision': item.precision, 'recall': item.recall, 'f1Score': item.f1Score
        }));
        this.experimentData.nonPca.smoteAccuracy.forEach(item => accuracy.push({
          'algorithm': item.algorithm,
          'testAccuracy': item.testAccuracy, 'precision': item.precision, 'recall': item.recall, 'f1Score': item.f1Score
        }));


        precision = accuracy.sort((a, b) => parseFloat(b.precision) - parseFloat(a.precision)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);
        recall = accuracy.sort((a, b) => parseFloat(b.recall) - parseFloat(a.recall)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);
        f1Score = accuracy.sort((a, b) => parseFloat(b.f1Score) - parseFloat(a.f1Score)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);
        accuracy = accuracy.sort((a, b) => parseFloat(b.testAccuracy) - parseFloat(a.testAccuracy)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);


        this.experimentData.pca.adasynAccuracy.forEach(item => pcaArray.push({

          'algorithm': item.algorithm,
          'testAccuracy': item.testAccuracy, 'precision': item.precision, 'recall': item.recall, 'f1Score': item.f1Score
        }));
        this.experimentData.pca.imbalancedAccuracy.forEach(item => pcaArray.push({
          'algorithm': item.algorithm,
          'testAccuracy': item.testAccuracy, 'precision': item.precision, 'recall': item.recall, 'f1Score': item.f1Score
        }));
        this.experimentData.pca.smoteAccuracy.forEach(item => pcaArray.push({
          'algorithm': item.algorithm,
          'testAccuracy': item.testAccuracy, 'precision': item.precision, 'recall': item.recall, 'f1Score': item.f1Score
        }));

        precisionPca = pcaArray.sort((a, b) => parseFloat(b.precision) - parseFloat(a.precision)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);
        recallPca = pcaArray.sort((a, b) => parseFloat(b.recall) - parseFloat(a.recall)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);
        f1ScorePca = accuracy.sort((a, b) => parseFloat(b.f1Score) - parseFloat(a.f1Score)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);
        accuracyPca = pcaArray.sort((a, b) => parseFloat(b.testAccuracy) - parseFloat(a.testAccuracy)).filter(
          (item, index, self) => index === self.findIndex(t => t.algorithm === item.algorithm)).slice(0, 20);


        const algorithmLabels = accuracy.map(item => item.algorithm.split(' ').map(function (item) { return item[0] }).join(''));
        algorithmLabels.forEach((item, index) => { if (item === 'K') { algorithmLabels[index] = 'KNN'; }
          if (item === 'S') { algorithmLabels[index] = 'SVM'; }});
        // const testAccuracyData = accuracy.map(item => (Math.round(parseFloat(item.testAccuracy))  + 'e-2'));
        const testAccuracyData = accuracy.map(item => (+item.testAccuracy).toPrecision());
        const testAccuracyDataNonPca = accuracyPca.map(item => (+item.testAccuracy).toPrecision());

        const accuracyDataset = [
          {
            data: testAccuracyData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 1
          }, {
            data: testAccuracyDataNonPca,
            backgroundColor: '#bedcf0',
            hoverBackgroundColor: '#bedcf0',
            borderWidth: 1
          }
        ];
        this.accuracy = this.globalService.makeStackedBarChart('accuracyChartVertical', algorithmLabels, accuracyDataset,
          20, 100, '', '', '');

        const testf1scoreData = f1Score.map(item => (+item.f1Score).toPrecision(2));
        const testf1scoreDataNonPca = f1ScorePca.map(item => (+item.f1Score).toPrecision(2));

        const f1ScoreDataset = [
          {
            data: testf1scoreData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 1
          }, {
            data: testf1scoreDataNonPca,
            backgroundColor: '#bedcf0',
            hoverBackgroundColor: '#bedcf0',
            borderWidth: 1
          }
        ];
        this.f1Score = this.globalService.makeStackedBarChart('fscoreChartVertical', algorithmLabels, f1ScoreDataset, .20, 1, '', '', '');

        const precisionData = precision.map(item => (+item.precision).toPrecision(2));
        const nonPcaPrecisionData = precisionPca.map(item => (+item.precision).toPrecision(2));
        const precisionDataset = [
          {
            data: precisionData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 1
          },
          {
            data: nonPcaPrecisionData,
            backgroundColor: '#bedcf0',
            hoverBackgroundColor: '#bedcf0',
            borderWidth: 1
          }
        ];
        this.precision = this.globalService.makeStackedBarChart('precisionChartVertical', algorithmLabels,
          precisionDataset, .20, 1, '', '', '');

        // const recallData = recall.map(item => (Math.round(parseFloat(item.recall))  + 'e-2'));
        // const nonPcaRecallData = recallPca.map(item => (Math.round(parseFloat(item.recall))  + 'e-2'));
        const recallData = recall.map(item => (+item.recall).toPrecision(3));
        const nonPcaRecallData = recallPca.map(item => (+item.recall).toPrecision(3));
        const recallDataset = [
          {
            data: recallData,
            backgroundColor: '#74a9cd',
            hoverBackgroundColor: '#74a9cd',
            borderWidth: 1
          }, {
            data: nonPcaRecallData,
            backgroundColor: '#bedcf0',
            hoverBackgroundColor: '#bedcf0',
            borderWidth: 1
          }
        ];

        this.recall = this.globalService.makeStackedBarChart('recallChartVertical', algorithmLabels, recallDataset, .20, 1, '', '', '');


      },
      error => {
        console.log('error=' + JSON.stringify(error));
      });
  }
  public getWorkFlowData() {
    this.pipelineService.getWorkFlow('pipeline', 'project', 'release').subscribe(
      data => {
        this.trainingRunFlow = data.workflow;
        let node = [], link = [], graphNode = [];
        let i = -1, count = 0, xaxis = 0, yaxis = 0, index = 0, iteration = 1;

        //to be calculated based on the length once the API is ready
        let gapBetweenXNodes = 95, gapBetweenYNodes = 50;
        let oldLevel = this.trainingRunFlow.node[0].level;
        let source = 1, target = 2, oldsource = 0;

        let touched = false;
        console.log(data);
        console.log(this);
        console.log(this.trainingRunFlow.node);

        this.trainingRunFlow.node.forEach(function (item) {
          if (iteration == 1) {
            xaxis += gapBetweenXNodes;
            yaxis = gapBetweenYNodes;
            iteration++;
          } else {
            if (oldLevel == item.level) {
              yaxis += gapBetweenYNodes;

            }
            else {
              xaxis += gapBetweenXNodes;
              yaxis = gapBetweenYNodes;
            }
          }


          graphNode.push({
            'id': ++i,
            'name': item.name,
            'group': item.sortOrder,
            'x': xaxis,
            'y': yaxis,
            'fixed': true
          })
          oldLevel = item.level
          console.log(graphNode);
        });
        iteration = 1;


        let connectingSource;
        for (var j = 0; j < 10; j++) {
          if ((oldsource == parseInt(this.trainingRunFlow.node[j].level))) {
            if (!touched) {
              connectingSource = source;
            }
            source += 1;
            target += 1;
            touched = true;
          } else if ((oldsource != parseInt(this.trainingRunFlow.node[j].level)) && touched) {
            let element = link.pop();
            console.log(element);
            link.push({
              'id': element.id,
              'source': connectingSource,
              'target': element.target
            })
            source += 1;
            target += 1;
            // touched =false;
          } else {
            source = parseInt(this.trainingRunFlow.node[j].level) - 1;
            target = parseInt(this.trainingRunFlow.node[j].level);
          }

          console.log(j + ' ' + source + '  ' + target);
          link.push({
            'id': j,
            'source': source,
            'target': target
          })
          oldsource = parseInt(this.trainingRunFlow.node[j].level);
        }
        // link.push({
        //   'id':         j+1,
        //    'source':     source+1,
        //    'target':     target+1
        //  })

        console.log(JSON.stringify(link));

        let graph = {
          'nodes': graphNode,
          'links': link
        }
        console.log(graph);
        this.globalService.makeRunFlow('trainingFlowRun', graph);


      },
      error => {
        console.log('error' + JSON.stringify(error));
      });
  }

}
