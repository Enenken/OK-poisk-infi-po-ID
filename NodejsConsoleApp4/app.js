var http = require('http');
var https = require('https');
var crypto = require('crypto');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: '',
	database: 'ok'
});
connection.connect();

var count = '100';
var name = '40805854';
var anchor = '';
var zaprosDliaHesha = "application_key=CBAJDNALEBABABABAfields=uid,first_name,last_name,gender,birthday,age,locale,location,registered_datemethod=users.getInfosession_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7uids="+name+"1d946ccbaa0facc5f3011d3cfeaab9d6";
var hash = crypto.createHash('md5').update(zaprosDliaHesha).digest("hex");
var vkapiToken = "https://api.ok.ru/fb.do?application_key=CBAJDNALEBABABABA&method=users.getInfo&session_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7&uids="+name+"&fields=uid%2Cfirst_name%2Clast_name%2Cgender%2Cbirthday%2Cage%2Clocale%2Clocation%2Cregistered_date&sig="+hash;
var kolvo = 0;
var text;

function vitaskivanieIzbazu(q, callback) {

	connection.query('SELECT id FROM userid WHERE nomer = ? ',[q], function (error, result) {
		
	    
		
		
		name = result[0].id
		console.log(q + "k     " + name + "     " + result[0].id);
		zaprosDliaHesha = "application_key=CBAJDNALEBABABABAfields=uid,first_name,last_name,gender,birthday,age,locale,location,registered_datemethod=users.getInfosession_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7uids=" + name + "1d946ccbaa0facc5f3011d3cfeaab9d6";
		hash = crypto.createHash('md5').update(zaprosDliaHesha).digest("hex");
		vkapiToken = "https://api.ok.ru/fb.do?application_key=CBAJDNALEBABABABA&method=users.getInfo&session_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7&uids=" + name + "&fields=uid%2Cfirst_name%2Clast_name%2Cgender%2Cbirthday%2Cage%2Clocale%2Clocation%2Cregistered_date&sig=" + hash;
					

		//function zapros(k, callback) {
			
		try {
			https.get(vkapiToken, function (res) {
				res.on('data', function (d) {
					//console.log(result[0].id);
					text = JSON.parse(d);
					
					if (!text[0]) {
						console.log("Не существует чувачак: " + name);
						connection.query('UPDATE userid SET userid_again= "НЕТ ТАКОГО АЙ ДИ" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
					
					} else {
						
						//var user = {
						//		id: text.members[i].userId,
						//	};
						
						//connection.query('UPDATE userid SET city=' + text[0].location.city + ' WHERE nomer='+q , function (error, result) {
						//	console.log(result);
						//});
						connection.query('UPDATE userid SET city= "' + text[0].location.city + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
						connection.query('UPDATE userid SET first_name= "' + text[0].first_name + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
						connection.query('UPDATE userid SET last_name= "' + text[0].last_name + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
						connection.query('UPDATE userid SET birthday= "' + text[0].birthday + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
						connection.query('UPDATE userid SET gender= "' + text[0].gender + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
						connection.query('UPDATE userid SET register_date= "' + text[0].registered_date + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						}); connection.query('UPDATE userid SET locale= "' + text[0].locale + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
						connection.query('UPDATE userid SET userid_again= "' + text[0].uid + '" WHERE nomer=' + q , function (error, result) {
					//console.log(result);
						});
					}
					callback(q + 1);
					//callback(k + 1);
				//callback(q + 1);	
				});
			//console.log(k);
				
			})
		} catch (error) { console.log(error); }
		//};
		//function zaprosCallBack(k) {
		//	if (k < 1) {
		//		zapros(k, zaprosCallBack);
		//	}
		//}
	
		//zaprosCallBack(0);


		//callback(q + 1);	
		
	});
	


}
function vitaskivanieIzbazuCalback(q){
	
	if (q<56000) {
		vitaskivanieIzbazu(q, vitaskivanieIzbazuCalback);
	}

}	
vitaskivanieIzbazuCalback(11589);

	
				
				
				
				
				
				
				
				
				
				
				
				
				
				//if (text.has_more) {
				//name = '41172790';
				
				
				
				////function zapisvbazu(i, callback) {
				//for (var i = 0; i < text.members.length; i++) {
				
				
				//	var user = {
				//		id: text.members[i].userId,
				//	};
				//console.log("k - " + k + "    i - " + i);
				
				//		connection.query('insert into userid set ?', user, function (err, result) {
				
				//			if (err) {
				//				console.error(err);
				//				return;
				//			} 
				
				////		callback(i + 1);
				////			//console.error(result);
				
				////		//if (i > (text.members.length-2)) return;
				////		//pizda(i + 1);
				
				//		});
				//console.log(text.members[i].userId);
				//	//}
				
				//}
				//function zapisvbazuCallBack(i) {
				//	if (i < text.members.length) { 
				//		zapisvbazu(i, zapisvbazuCallBack);
				
				//	}
				
				
				//}
				//zapisvbazuCallBack(0);
				
				//setTimeout(function () {
				//console.log(value);
				
				//}, Math.random() * 100 + 50);
			//}
			//callback(k + 1);
			//setTimeout(, Math.random() * 10000);
	
	




//getReq.end()
//getReq.on('error', function (err) {
//	console.log("Error: ", err);
//}); 
//r++;
//console.log("r=" + (r));





