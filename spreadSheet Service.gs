var SPRINT_DEPLOYMENT_SHEET_NAME = 'Sprint-Deployment';
var HOTFIX_PATCH_DEPLOYMENT_SHEET_NAME = 'HotfixAndPatchDeployment';
var METADATA_SHEET = 'MetaData';

function clearSprintDeploymentSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SPRINT_DEPLOYMENT_SHEET_NAME);
  var rows = sheet.getLastRow();
  var cols = sheet.getLastColumn();
  var range = sheet.getRange(2, 1, rows, cols);
  range.clearContent();  
}

function clearHotfixAndPatchDeploymentSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(HOTFIX_PATCH_DEPLOYMENT_SHEET_NAME);
  var rows = sheet.getLastRow();
  var cols = sheet.getLastColumn();
  var range = sheet.getRange(2, 1, rows, cols);
  range.clearContent();  
}

function readMetaData() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(METADATA_SHEET);
  var range = sheet.getRange(1,2);
  var sprintFixVersion = range.getValue();
  var range = sheet.getRange(2,2);
  var hotfixAndPatchVersion = range.getValue(); 
  var range = sheet.getRange(3,2);
  var sprint = range.getValue();
  
  Logger.log(sprintFixVersion);
  Logger.log(hotfixAndPatchVersion);
  
  return {
    "sprintFixVersion":sprintFixVersion,
    "hotfixAndPatchVersion": hotfixAndPatchVersion,
    "sprint":sprint
  };
}
