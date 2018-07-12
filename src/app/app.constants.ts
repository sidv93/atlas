import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public defectPredictionUrl = '/rest/api/prediction/listing';
    public topMetricsUrl = '/rest/api/preprocessed/metrics';
    public preProcessedChartsUrl = '/rest/api/preprocessed/charts';
    // public preProcessedStatsUrl = '/rest/api/integration/test';
    public projectSummaryChartUrl = '/rest/api/analytics/predictions';
    public projectSummaryUrl = '/rest/api/system/projectsummary';
    public featureAnalysisUrl = '/rest/api/analytics/features';
    public pipelineUrl = '/rest/api/analytics/pipelines';
    public pipelineExperimentUrl = '/rest/api/pipelines/experiment';
    public overviewUrl = '/rest/api/checkin_history_record/overview';
    public productListUrl = '/rest/api/system/products';
    public projectListUrl = '/rest/api/system/projects';
    public regressionUrl = '/rest/api/tcp/overview/regression';
    public univariateUrl = '/rest/api/explore/univariate';
    public sprintFeatureUrl = '/rest/api/tcp/overview/sprint';
    public fileHistoryURL = '/rest/api/analytics/filehistory';
    public trainingPipelineUrl = '/rest/api/analytics/trainingpipelines';
    public trainingRunsUrl = '/rest/api/analytics/trainingruns';
    public executionResultsURL = '/rest/api/tcp/deploy/executionresult';
    public progressionUrl = '/rest/api/tcp/optimize/progression';
    public regressionOptimiseUrl = '/rest/api/tcp/optimize/regression';
    public noRecords = 'No records found';
}
