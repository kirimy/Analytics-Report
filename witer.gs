var sheet = SpreadsheetApp.getActiveSpreadsheet();
var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
var an_sheet = SpreadsheetApp.openById(id);

function writer_list() {
  var new_sheet = an_sheet.getSheetByName('新規作成シート');
  var cellNum = new_sheet.getLastRow();
  
  var w1 = new_sheet.getRange(67, 10, cellNum).getValues(); //67初期値
  var ss=  sheet.getSheetByName("December");
  for (var i=0; i<w1.length; i++){                  
   ss.getRange(3+i,2).setValue(w1[i][0]);
  }
  
  var org = sheet.getSheetByName("organicSearches");
   for (var i=0; i<w1.length; i++){                  
   ss.getRange(3+i,2).setValue(w1[i][0]);
  }
  
}

function days(){
  var new_sheet = an_sheet.getSheetByName('新規作成シート');
  var cellNum = new_sheet.getLastRow();
  
  var d1 = new_sheet.getRange(67, 16, cellNum).getValues(); //67初期値
  
  var ss=  sheet.getSheetByName("December");
  for (var i=0; i<d1.length; i++){                  
   ss.getRange(3+i,3).setValue(d1[i][0]);  
  }
}


function writer_kakiokoshi(){  
  var kakiokoshi = an_sheet.getSheetByName('書き起こし');
  var witers = kakiokoshi.getRange(3, 3, kakiokoshi.getLastRow()).getValues();
  
  var ss=  sheet.getSheetByName("November_score2");
  for (var i=0; i<witers.length; i++){                  
    ss.getRange(3+i,2).setValue(witers[i][0]);  
  }
}

function days_kakiokoshi(){
  
  var kakiokoshi = an_sheet.getSheetByName('書き起こし');
  var days = kakiokoshi.getRange(3, 4, kakiokoshi.getLastRow()).getValues();
 
  var ss=  sheet.getSheetByName("November_score2");
  for (var i=0; i<days.length; i++){                  
    ss.getRange(3+i,3).setValue(days[i][0]);  
  }
}

function findRow(sh,val){
  var lastRow=sh.getDataRange().getLastRow(); //対象となるシートの最終行を取得 
  for(var i=1;i<=lastRow;i++){
    if(sh.getRange(i,7).getValue() === val){
      return i;
    }
  }
  return 0;
}



function getLastRowNumber_Column(){
　var sh = sheet.getActiveSheet();
　var last_row = sh.getLastRow();

　for(var i = last_row; i >= 1; i--){
　　if(sh.getRange(i, 1).getValue() != ''){
　　　Browser.msgBox(i);
　　　break;
　　}
　}
}


