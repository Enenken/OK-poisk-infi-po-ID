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

function poluchenieSpiskaId(q1, q2) {
	connection.query('SELECT id FROM userid WHERE nomer <=?&& nomer >=? ', [q2, q1], function (error, result) {
		for (var i = 0; i < result.length; i++) {
			vitaskivanieIzbazu(result[i].id, i)
		}
	});
	
};

poluchenieSpiskaId(1, 15);

function vitaskivanieIzbazu(nomer,i) {
		var name = nomer
		var zaprosDliaHesha = "application_key=CBAJDNALEBABABABAfields=uid,first_name,last_name,gender,birthday,age,locale,current_status,location,registered_date,last_onlinemethod=users.getInfosession_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7uids=" + name + "1d946ccbaa0facc5f3011d3cfeaab9d6";
		var hash = crypto.createHash('md5').update(zaprosDliaHesha).digest("hex");
		var vkapiToken = "https://api.ok.ru/fb.do?application_key=CBAJDNALEBABABABA&method=users.getInfo&session_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7&uids=" + name + "&fields=uid%2Cfirst_name%2Clast_name%2Cgender%2Cbirthday%2Cage%2Clocale%2Ccurrent_status%2Clocation%2Cregistered_date%2Clast_online&sig=" + hash;
		try {
			https.get(vkapiToken, function (res) {
				res.on('data', function (d) {
					var text = JSON.parse(d);
					//console.log(text[0].location.city + "    ")
					if (!text[0]) {
						console.log("Не существует чувачка: " + name);
						connection.query('UPDATE userid SET userid_again= "НЕТ ТАКОГО АЙ ДИ" WHERE nomer=' + (i+1) , function (error, result) {
						});
					} else {
						connection.query(
							'UPDATE userid SET city = "' + text[0].location.city +
							 '", status = "' + text[0].current_status + 
							 '", first_name= "' + text[0].first_name +
							 '", last_name= "' + text[0].last_name +
							 '", birthday= "' + text[0].birthday +
							 '", gender= "' + text[0].gender +
							 '", register_date= "' + text[0].registered_date +
							 '", locale= "' + text[0].locale +
							 '", userid_again= "' + text[0].uid +
							 '", last_online= "' + text[0].first_name +
							 '", id_gruppi= "' + "50582132228315" +
							 '", nazvanie_gruppi= "' + 'ОДНОКЛАССНИКИ ВСЁ ОК' +
							 '" WHERE nomer = ' + (i+1) , function (error, result) {
							});
					}
				});
			})
		} catch (error) { console.log(error); }
}



	
				
				
				
				
				
				
				
				
				
				
				
				
			




