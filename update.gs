var sheet = SpreadsheetApp.getActiveSpreadsheet();

var date = new Date();
  var id = "1Hl6Nt23HJzqOj7AUoUGsF_3ziAoYIVPmWYsO9E__1SM";
  var an_sheet = SpreadsheetApp.openById(id);
  var cellNum = an_sheet.getLastRow();
  var url_amount = cellNum-800; //取得数
  var mag_ids = an_sheet.getActiveSheet().getRange(67, 1, cellNum).getValues(); //67初期値
  var Filters = [];
  for (var i=0; i<url_amount; i++){                   
   Filters[i] = 'ga:pagePath=~/mag/' + mag_ids[i][0];
   Filters[i] = Filters[i].toString().trim();
  }

　　　/* Analytics */ 
  var tableId  = 'ga:132378190';

function onOpen() {
  var ui = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = ui.createMenu('アップデート');  // Uiクラスからメニューを作成する
  menu.addItem('organicSearch', 'organicSearchUpdate');
  menu.addToUi();                            // メニューをUiクラスに追加する
}


function organicSearchUpdate() {
  
  /* sessions */
  var ss = sheet.getSheetByName('period');
  ss.activate();
  
  ss.getRange(2,5,1000,50).clear();
  
  /* Analytics */ 
  var metric = 'ga:organicSearches';
  
  var start_date = ss.getRange('G1').getValue();
  var end_date = ss.getRange('I1').getValue();
    
  var startDate = Utilities.formatDate(start_date, 'Asia/Tokyo','yyyy-MM-dd');
  var endDate = Utilities.formatDate(end_date, 'Asia/Tokyo','yyyy-MM-dd');
  
 for (var i=0; i<url_amount; i++){
  var options = {
    'dimensions': 'ga:date',
    'filters': Filters[i],
    'max-results': 31
  };
   
     try{
       var data = Analytics.Data.Ga.get(tableId, startDate, endDate, metric, options);
  var getdata = JSON.parse(data);
  var rows = getdata["rows"];  
   Logger.log(rows);
     } catch (e){
       Logger.log(e); 
     }
  
  for(var j=0;j<rows.length;j++){
    ss.getRange(i+3,rows.length-j+4).setValue(rows[j][1]);
   }
    ss.getRange(i+3,4).setValue('https://www.cchan.tv/mag/'+mag_ids[i]); //URL
    ss.getRange(i+3,3).setValue(made[i][0]);
 }
  //days
  for(var i=0;i<rows.length;i++){
    ss.getRange(2, ss.getLastColumn()-i).setValue(rows[i][0]);
  } 
  Browser.msgBox('アップデートが完了しました。'); 
  
}