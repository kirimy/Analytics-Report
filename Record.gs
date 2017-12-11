function everyday_record() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var ss = sheet.getSheetByName('November_record');
  ss.activate();
  var today = new Date();
  
  var score = ss.getRange("B2:H14");
  ss.getRange(ss.getLastRow()+2, 2).setValue(today);
  var recordRange = ss.getRange(ss.getLastRow()+1, 2);
  score.copyTo(recordRange);
}
