var sheet = SpreadsheetApp.getActiveSpreadsheet();
var tableId  = 'ga:132378190';

function record(){
 
  var ss = sheet.getSheetByName("record");
  ss.activate();
  
  var mag_ids = ss.getRange(2, 2, ss.getLastRow()).getValues()
  
  var Filters = [];
  for (var i=0; i<mag_ids.length; i++){
    if(mag_ids[i][0]==''){break;}
   Filters[i] = 'ga:pagePath=~/mag' + mag_ids[i][0];
   Filters[i] = Filters[i].toString().trim();
  }
  Logger.log(Filters);
  
  Analytics(ss, mag_ids, Filters);
 
}


 /* Analytics */
function Analytics(ss, ids, Filters){
  
  var metric = 'ga:organicSearches';
  var options = [];
  var data = [];
  var getdata = [];
  var rows =[];
  
 for (var i=0; i<ids.length; i++){
  options[i] = {
    'dimensions': 'ga:date',
   // 'sort': '-ga:visits,ga:source',
    'filters': Filters[i],
    'max-results': 62
  };
   
   try{
   data[i] = Analytics.Data.Ga.get(tableId, '2017-12-01', '2017-12-31', metric, options[i]);  //Monthly date
   getdata[i] = JSON.parse(data);
   rows[i] = getdata[i]["rows"];   
   } catch (e){
    // Logger.log(e);
   }
  for(var j=0;j<rows.length;j++){
    //ss.getRange(i+3,rows.length-j+4).setValue(rows[j][1]);
    Logger.log(rows[i][j]);
   }
 }
  
  //days
  for(var i=0; i<rows.length; i++){
  //  ss.getRange(2, ss.getLastColumn()-i).setValue(rows[i][0]);
  } 
  
}
