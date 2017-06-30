function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Jira');
  menu.addSeparator();  
  menu.addItem('Fetch Sprint Tickets', 'fetchSprintTickets');
  menu.addItem('Fetch Hotfix And Patch Tickets', 'fetchHotfixAndPatchTickets');
  menu.addItem('Clear All Data', 'clearAllData')
  menu.addToUi()             
}

function clearAllData() {
  clearSprintDeploymentSheetData();
  clearHotfixAndPatchDeploymentSheetData();
}

function fetchHotfixAndPatchTickets() {

}

function fetchSprintTickets() {
  clearSprintDeploymentSheet();
  updateSprintSheetData();
  emailDeployedIssueSummary();
}