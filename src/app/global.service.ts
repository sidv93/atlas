import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Chart } from 'chart.js';
import * as CanvasJS from './canvasjs.min';
import * as d3 from 'd3';

@Injectable()
export class GlobalService {

  public baseUrl = 'http://ec2-34-205-159-192.compute-1.amazonaws.com:5000';
  // public baseUrl = 'http://localhost:5000';
  public rightPaneExpand$ = new Subject<any>();
  public expanded = false;
  public urlFlag = false;
  public tabSwitch$ = new Subject<any>();
  public secondLayerTabs$ = new Subject<any>();
  public changeProduct$ = new Subject<any>();
  public productsFetched$ = new Subject<any>();
  public productList = [];
  public product;
  public project;
  public productsLoaded = false;

  public makeBarGraph(elementId: string, labels: any, dataset: any, scales: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataSet) {
              return item.xLabel + ' : ' + item.yLabel;
            },
            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: gradientStroke,
                backgroundColor: '#2c82be'
              };
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        title: {
          display: false,
          // text: title
        },
        scales: scales
      }
    });
  }

  public filesModifiedGraph(elementId: string, labels: any, dataSet: any, fileNames: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataSet
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataset) {
              const spliced = fileNames.map(file => file.slice(0, 5));
              const indexOfFile = spliced.lastIndexOf(item.xLabel);
              console.log('indec-' + indexOfFile);
              const fileName = fileNames[indexOfFile];
              return fileName + ':' + item.yLabel;
            },
            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: gradientStroke,
                backgroundColor: '#2c82be'
              };
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        title: {
          display: false,
          // text: title
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Frequency'
            },
            gridLines: {
              drawOnChartArea: false
            }
          }
          ],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            barPercentage: 0.2,
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    });
  }

  public makeProgressionGraph(elementId: string, labels, dataSet: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataSet
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataset) {
              return item.xLabel + ':' + item.yLabel;
            },
            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: gradientStroke,
                backgroundColor: '#2c82be'
              };
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        title: {
          display: false,
          // text: title
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Score'
            },
            gridLines: {
              drawOnChartArea: false
            }
          }
          ],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            categoryPercentage: 0.9,
            barPercentage: 0.9,
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    });
  }

  public makeRoundedBarGraph(elementId: string, labels: any, dataSet: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataSet
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataset) {
              return item.xLabel + ' : ' + item.yLabel;
            },
            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: gradientStroke,
                backgroundColor: '#2c82be'
              };
            },
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        title: {
          display: false,
          // text: title
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'Frequency'
            },
            gridLines: {
              drawOnChartArea: false
            }
          }
          ],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false,
            },
            barPercentage: 0.2,
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    });
  }

  public makePieGraph(elementId: string, labels: any, dataSet: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'pie',
      data: {
        labels: labels,
        datasets: dataSet
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          arc: {
            borderWidth: 12
          }
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              drawOnChartArea: false
            }
          }],
          xAxes: [{
            display: false
          }]
        }
      }
    });
  }

  public makeDoughnutGraph(elementId: string, dataSet: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'doughnut',
      data: {
        labels: ['Clean', 'Buggy'],
        datasets: dataSet
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 90,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              drawOnChartArea: false
            }
          }],
          xAxes: [{
            display: false
          }]
        }
      }
    });
  }

  public makeLineGraph(elementId: string, labels: any, dataSet: any, stepsize: number, prediction: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'line',
      data: {
        labels: labels,
        datasets: dataSet,
        prediction: prediction
      },
      options: {
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataSets) {
              return (dataSets.prediction[item.index] === 'clean' ? 'Clean' : 'Buggy') + ' : ' + item.yLabel;
            },
            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: stackGradientStroke,
                backgroundColor: '#2099E3'
              };
            }

          }
        },
        // scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        spanGaps: false,
        // showLines: true,
        legend: {
          display: false,
          // position: 'bottom'
        },
        title: {
          display: false,
          // text: 'Title'
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                autoSkip: false,
                min: 0,
                stepSize: stepsize
              }
            }],
            xAxes: [{
              display: true,
              gridLines: {
                drawOnChartArea: false,
                display: false,
                lineWidth: 0
              }

            }]
          }
        }
      }
    });
  }

  public makeStackBarChart(elementId: string, labels: any, dataset: any, xAxes: string, yAxes: string, tooltips: any) {
    return new Chart(elementId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset
      },
      options: {
        tooltips: tooltips,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: false,
          // text: title
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false
            },
            scaleLabel: {
              display: true,
              labelString: yAxes
            },
            gridLines: {
              drawOnChartArea: false
            },
            stacked: true
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false
            },
            scaleLabel: {
              display: true,
              labelString: xAxes
            },
            barPercentage: 0.1,
            gridLines: {
              drawOnChartArea: false
            },
            stacked: true
          }]
        }
      }
    });
  }

  public makeHorizontalBarGraph(elementId: string, labels: any, dataSet: any) {
    return new Chart(document.getElementById(elementId), {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: dataSet
      },
      options: {
        // responsive: true,
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item) {
              return item.yLabel + ' : ' + item.xLabel;
            },
            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: hGradientStroke,
                backgroundColor: '#2c82be'
              };
            },
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        title: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false
            },
            barPercentage: 0.3,
            gridLines: {
              drawOnChartArea: false
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              autoSkip: false
            },
            barPercentage: 0.2,
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    });
  }

  public makeStackedBarChart(elementId: string, labels: any, dataset: any, stepsize: any, maxlength: any, percent: string,
    xAxes: string, yAxes: string) {
    return new Chart(elementId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset

      },
      options: {
        tooltips: {
          callbacks: {
            title: function (item) {
              return null;
            },
            label: function (item, dataSet) {
              return item.yLabel + '%';
            },

            labelColor: function (tooltipItem, chart) {
              return {
                // borderColor: stackGradientStroke,
                backgroundColor: (tooltipItem.datasetIndex === 0 ? '#74a9cd' : '#bedcf0')
              };
            },
          }
        },
        layout: {
          padding: 0
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: false,
          // text: title
        },
        scales: {
          yAxes: [{

            ticks: {
              beginAtZero: true,
              autoSkip: false,
              stepSize: stepsize,
              min: 0,
              max: maxlength,

              callback: function (value) {
                return value + percent;
              }

            },
            scaleLabel: {
              display: true,
              labelString: yAxes
            },
            gridLines: {
              drawOnChartArea: true
            }
          }],
          xAxes: [{

            ticks: {
              beginAtZero: true,
              autoSkip: false
            },
            scaleLabel: {
              display: true,
              labelString: xAxes
            },
            barPercentage: 1.5,

            categoryPercentage: 0.2,
            gridLines: {
              drawOnChartArea: false
            }
          }]
        }
      }
    });
  }

  public makeRunFlow(elementId: string, graph: any) {
    let r;
    let width = document.getElementById('trainingFlowRun').offsetWidth;
    let height = document.getElementById('trainingFlowRun').offsetHeight;
    var svg = d3.select('#trainingFlowRun').append('svg')
      .attr('width', width)
      .attr('height', height);

    var force = d3.layout.force()
      .size([width, height])
      .nodes(graph.nodes)
      .links(graph.links);

    force.linkDistance(10);

    var link = svg.selectAll('.link')
      .data(graph.links)
      .enter().append('line')
      .attr('class', 'link')
      .style('stroke', '#EDF3F7')
      .style('stroke-width', ' 3px');


    var node = svg.selectAll('.node')
      .data(graph.nodes)
      .enter().append('circle')
      .attr('class', 'node')
      .style('stroke-width', '6px')
      .style('stroke', '#EDF3F7')
      .style('fill', '#58A0C3')
      .text(function (d) { return '( ' + d.name + ' )'; });



    node.append('title')
      .text(function (d) { return d.name; });

    //   node.select('circle:last-child').style('fill','green!important');




    var text = svg.selectAll('text')
      .data(graph.nodes)
      .enter()
      .append('text');

    var textLabels = text
      .attr('x', function (d) { return d.x + 105; })
      .attr('y', function (d) { return d.y + 20; })
      .text(function (d) { return d.name; })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', 'black');



    force.on('end', function () {
      node.attr('r', function (d) {
        if (d.group == 16) {
          r = 0;
        } else {
          r = 7;
        }
        return r;
      })
        .attr('cx', function (d) { return d.x + 100; })
        .attr('cy', function (d) { return d.y; });



      link
        .attr('x1', function (d) { return d.source.x + 100; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x + 100; })
        .attr('y2', function (d) { return d.target.y; });
    });

    force.start();


    svg.selectAll('circle').select('circle:last-child')
      .style('fill', 'black!important');
  }

  public plotBoxPlot(elementId: string, datapoints: any) {
    return new CanvasJS.Chart('chartContainer', {
      title: {
        text: '',
        fontFamily: 'Avenir',
        fontSize: 22,
        horizontalAlign: 'left',
        verticalAlign: 'center'
      },
      dataPointWidth: 50,
      width: 250,
      height: 300,
      dataPointMinWidth: 40,
      axisX: {
        labelAngle: -90,
        gridThickness: 0
      },
      axisY2: {
        labelAngle: -90,
        gridThickness: 0
      },
      data: [
        {
          type: 'boxAndWhisker',
          upperBoxColor: '#FFC28D',
          lowerBoxColor: '#9ECCB8',
          whiskerThickness: 2,
          stemThickness: 2,
          markerBorderThickness: 0,
          axisYType: 'secondary',
          dataPoints: [
            { x: 0, label: 'box', y: datapoints },
          ]
        }
      ]
    });
  }

  public curvedChart() {
    Chart.helpers.drawRoundedTopRectangle = function (ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      // top right corner
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      // bottom right   corner
      ctx.lineTo(x + width, y + height);
      // bottom left corner
      ctx.lineTo(x, y + height);
      // top left
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    Chart.elements.RoundedTopRectangle = Chart.elements.Rectangle.extend({
      draw: function () {
        const ctx = this._chart.ctx;
        const vm = this._view;
        let left, right, top, bottom, signX, signY, borderSkipped;
        let borderWidth = vm.borderWidth;

        if (!vm.horizontal) {
          // bar
          left = vm.x - vm.width / 2;
          right = vm.x + vm.width / 2;
          top = vm.y;
          bottom = vm.base;
          signX = 1;
          signY = bottom > top ? 1 : -1;
          borderSkipped = vm.borderSkipped || 'bottom';
        } else {
          // horizontal bar
          left = vm.base;
          right = vm.x;
          top = vm.y - vm.height / 2;
          bottom = vm.y + vm.height / 2;
          signX = right > left ? 1 : -1;
          signY = 1;
          borderSkipped = vm.borderSkipped || 'left';
        }

        // Canvas doesn't allow us to stroke inside the width so we can
        // adjust the sizes to fit if we're setting a stroke on the line
        if (borderWidth) {
          // borderWidth shold be less than bar width and bar height.
          const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
          borderWidth = borderWidth > barSize ? barSize : borderWidth;
          const halfStroke = borderWidth / 2;
          // Adjust borderWidth when bar top position is near vm.base(zero).
          const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
          const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
          const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
          const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
          // not become a vertical line?
          if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
          }
          // not become a horizontal line?
          if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
          }
        }

        // calculate the bar width and roundess
        const barWidth = Math.abs(left - right);
        // const roundness = this._chart.config.options.barRoundness || 0.5;
        const roundness = 1.0;
        const radius = barWidth * roundness * 0.5;

        // keep track of the original top of the bar
        const prevTop = top;

        // move the top down so there is room to draw the rounded top
        top = prevTop + radius;
        const barRadius = top - prevTop;

        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;
        ctx.strokeStyle = vm.borderColor;
        ctx.lineWidth = borderWidth;

        // draw the rounded top rectangle
        Chart.helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius + 1), barWidth, bottom - prevTop, barRadius);

        ctx.fill();
        if (borderWidth) {
          ctx.stroke();
        }

        // restore the original top value so tooltips and scales still work
        top = prevTop;
      },
    });

    Chart.defaults.roundedBar = Chart.helpers.clone(Chart.defaults.bar);

    Chart.controllers.roundedBar = Chart.controllers.bar.extend({
      dataElementType: Chart.elements.RoundedTopRectangle
    });
  }
  constructor() {
    this.curvedChart();
  }

}
