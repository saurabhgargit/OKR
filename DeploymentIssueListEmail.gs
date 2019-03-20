function getDeployedIssueListData() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SPRINT_DEPLOYMENT_SHEET_NAME);
  var rows = sheet.getLastRow();
  var cols = sheet.getLastColumn();
    
  var deploymentData = sheet.getRange(1, 1, rows, cols).getValues();
  return deploymentData;

}


function emailDeployedIssueSummary() {
     
  var subject = readMetaData().sprint + " Deployed to production";
  var body = getDeploymentSummaryHTMLTable();
    
  GmailApp.sendEmail("saurabh.garg@jasgsaas.com", subject, "",{ htmlBody: body});
  
}


function getDeploymentSummaryHTMLTable() {
  
  return HtmlService.createTemplateFromFile('DeployedIssue').evaluate().getContent();
}
