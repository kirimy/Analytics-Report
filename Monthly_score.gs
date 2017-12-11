  var sheet = SpreadsheetApp.getActiveSpreadsheet();


  /* Title のヨテイ*/

　　　/* Analytics */
  
  var tableId  = 'ga:132378190';


/* ga:organicSearches */
function monthly(){
  
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var new_sheet = an_sheet.getSheetByName('新規作成シート');
  var cellNum = new_sheet.getLastRow();
  var url_amount = 450; //取得数

  var mag_ids = new_sheet.getRange(67, 1, cellNum).getValues(); //67初期値
  
  Logger.log(mag_ids);
  
  var Filters = [];
  for (var i=0; i<url_amount; i++){                   
   Filters[i] = 'ga:pagePath=~/mag/' + mag_ids[i][0];
   Filters[i] = Filters[i].toString().trim();
  }
  
  
  var ss = sheet.getSheetByName('December');
  ss.activate();

 
  /* Analytics */
  var metric = 'ga:organicSearches';
  
 for (var i=0; i<mag_ids.length; i++){
  var options = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 30
  };
   
   try{
  var data = Analytics.Data.Ga.get(tableId, '2017-12-01', '2017-12-31', metric, options);  //Monthly date
  var getdata = JSON.parse(data);
  var rows = getdata["rows"];   
   } catch (e){
    // Logger.log(e);
   }
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+3,rows.length-j+4).setValue(rows[j][1]);
   }
    ss.getRange(i+3,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i]); //URL
 }
  //days
  for(var i=0; i<rows.length; i++){
    ss.getRange(2, ss.getLastColumn()-i).setValue(rows[i][0]);
  } 
  
}


function monthly_2(){
 
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var url_amount = cellNum - 600; //取得数

  //書き起こし//  
  var kakiokoshi = an_sheet.getSheetByName('書き起こし');
  var mag_ids =  kakiokoshi.getRange(3, 1, kakiokoshi.getLastRow()).getValues();
  
//  Logger.log(mag_ids);

  var Filters = [];
  for (var i=0; i<url_amount; i++){                   
   Filters[i] = 'ga:pagePath=~/mag/' + mag_ids[i];
   Filters[i] = Filters[i].toString().trim();
  }
  
  Logger.log(Filters);
  
  var ss = sheet.getSheetByName('November_score2');
  ss.activate();

  /* Analytics */
  var metric = 'ga:organicSearches';
  
  for (var i=0; i<mag_ids.length; i++){
  var options = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 30
  };
   
   try{
  var data = Analytics.Data.Ga.get(tableId, '2017-11-01', '2017-11-30', metric, options);  //Monthly date
  var getdata = JSON.parse(data);
  var rows = getdata["rows"];   
   } catch (e){
    // Logger.log(e);
   }
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+3,rows.length-j+4).setValue(rows[j][1]);
   }
    ss.getRange(i+3,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i]); //URL
 }
  //days
  for(var i=0;i<rows.length;i++){
    ss.getRange(2, ss.getLastColumn()-i).setValue(rows[i][0]);
  } 
}

