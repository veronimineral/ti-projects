var request;
var objJSON;
var db;
var user = 0;
var username = {};
var requestDB = indexedDB.open("database");

requestDB.onupgradeneeded = function () {
    db = requestDB.result;
    var store = db.createObjectStore("rekordy", { keyPath: "id", autoIncrement: true });
    store.createIndex("date", "date");
    store.createIndex("time", "time");
    store.createIndex("place", "place");
		store.createIndex("pm10", "pm10");
    store.createIndex("pm25", "pm25");
    store.createIndex("pm25", "pm25");
};

requestDB.onsuccess = function () {
    db = requestDB.result;
};

function getRequestObject()      {
   if ( window.ActiveXObject)  {
      return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
   } else if (window.XMLHttpRequest)  {
      return (new XMLHttpRequest())  ;
   } else {
      return (null) ;
   }
}

function checkCookie(){
  var sessionID = getCookie();
  var data = {};
  data.sessionID = sessionID;
  resp = JSON.stringify(data);
  request = getRequestObject();
  request.onreadystatechange = function() {
      if (request.readyState == 4 && (request.status == 200 || request.status == 400))  {
          objJSON = JSON.parse(request.response);
          if(objJSON['status'] == 'ok')   {
              document.getElementById("logoutInfo").style.display = "block";
              document.getElementById('getData').style.display="block";
              document.getElementById('getChart').style.display="block";
              document.getElementById('synchData').style.display="block";
              document.getElementById('loginInfo').style.display="none";
              document.getElementById('registerInfo').style.display="none";
              _showLogin();
          }
          else {
              _loginPopout();
          }
      }
      else if(request.readyState == 4 && request.status == 500){
        alert("Błąd ciasteczek.");
      }
  }
  request.open("POST", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/checkSession", true);
  request.send(resp);
}

function setCookie(value){
  document.cookie = "sessionID=" + value + "; path=/";
}

function getCookie(){
  var c, ca;
  ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++)
  {
      c = ca[i];
      while (c.charAt(0)==' ')
      {
          c = c.substring(1,c.length);
      }
      if (c.indexOf("sessionID=") == 0)
      {
          return c.substring("sessionID=".length,c.length);
      }
  }
  return '';
}

// Lista rekordow w bazie
function _showList() {
   document.getElementById('response').innerHTML = '';
   document.getElementById('data').innerHTML = '';
   document.getElementById('town--buttons').innerHTML = '';
   request = getRequestObject() ;
   var txt = "<table><tr><th>Data</th><th>Godzina</th><th>Lokalizacja</th><th>PM10</th><th>PM2.5</th><th>PM1</th></tr>";
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
             txt += "<tr>";
             for ( var prop in objJSON[id] ) {
		 if(prop != "_id")
                 	txt += "<td>" + objJSON[id][prop] + "</td>";
             }
             txt +="</tr>";
         }
	 txt += "</table>";
         document.getElementById('response').innerHTML = txt;
         document.getElementById('chartContainer').innerHTML = '';
      }
   }
   request.open("GET", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/list", true);
   request.send(null);
}


// Wstawianie rekordow do bazy
function _addData() {
   var form1 = "<form name='add'>" ;
   form1    += "Data<br><input type='date' name='date' style='text-align: center;' value='' ></input><br><br>";
   form1    += "Godzina<br><input type='time' name='time' style='text-align: center;' value='' ></input><br><br>";
   form1    += "Miasto<br><input type='text' name='place' value='' ></input><br><br>";
   form1    += "PM10 [ug/m3]<br><input type='text' name='pm10' value='' ></input><br><br>";
   form1    += "PM2.5 [ug/m3]<br><input type='text' name='pm25' value='' ></input><br><br>";
   form1    += "PM1 [ug/m3]<br><input type='text' name='pm1' value='' ></input><br><br>";
   form1    += "<input type='button' value='Dodaj rekord' onclick='_insert(this.form)' ></input><br>";
   form1    += "</form>";
   document.getElementById('data').innerHTML = form1;
   document.getElementById('response').innerHTML = '';
   document.getElementById('chartContainer').innerHTML = '';
   document.getElementById('town--buttons').innerHTML = '';

}

function _showListOffline(){
	document.getElementById('response').innerHTML = '';
	document.getElementById('data').innerHTML = '';
  document.getElementById('chartContainer').innerHTML = '';
  document.getElementById('town--buttons').innerHTML = '';
  /*var objectStore = db.transaction("rekordy").objectStore("rekordy");*/
  var txt = "<table>";
  txt += "<th>Data</th><th>Godzina</th><th>Miejsce</th><th>PM10</th><th>PM2.5</th><th>PM1</th>";
/*	var req = objectStore.openCursor();
  req.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
          txt += "<tr><td>" + cursor.value.date + "</td><td>" + cursor.value.time + "</td><td>" + cursor.value.place + "</td><td>" + cursor.value.pm10 + "</td><td>" + cursor.value.pm25 + "</td><td>" + cursor.value.pm1 + "</td></tr>";
          cursor.continue();
      }
      else {*/
          txt += "</table>";
          document.getElementById('response').innerHTML = txt;
      //}
  //};
}

function _insert(form)  {
    document.getElementById('chartContainer').innerHTML = '';
    document.getElementById('town--buttons').innerHTML = '';
    if(!isValid(form)){
      return;
    }
    else{
      var user = {};
      user.date = form.date.value;
      user.time = form.time.value;
      user.place = form.place.value;
      user.pm10 = form.pm10.value;
      user.pm25 = form.pm25.value;
      user.pm1 = form.pm1.value;
      txt = JSON.stringify(user);
      /*var key;
      var tx = db.transaction("rekordy", "readwrite");
      var store = tx.objectStore("rekordy");
      var toPut = store.put(user);
      toPut.onsuccess = function(event){
            key = event.target.result;
      };*/
      document.getElementById('response').innerHTML = '';
      document.getElementById('data').innerHTML = '';
      request = getRequestObject() ;
      request.onreadystatechange = function() {
         if (request.readyState == 4 && request.status == 200 ){
          objJSON = JSON.parse(request.response);
          alert("Dodano rekord.");
          if(objJSON['status'] == 'ok'){
            alert("Dodano rekord.");
            /*tx = db.transaction("rekordy", "readwrite");
            store = tx.objectStore("rekordy");
            store.delete(key);*/
          }
          else{
            alert("Wystąpił błąd podczas dodawania rekordu.")
          }
        }
        else if(request.readyState == 4 && request.status == 500){
          alert("Jesteś offline. Rekord dodany do bazy lokalnej.");
        }

      }
      request.open("POST", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/save", true);
      request.send(txt);
    }
}

function isValid(form){
  if(form.date.value == '' || form.time.value == '' || form.place.value == '' || form.pm10.value == '' || form.pm25.value == '' || form.pm1.value == ""){
    alert("Proszę uzupełnić wszystkie pola.");
    return false;
  }
  if(form.pm10.value < 0 || form.pm25.value < 0 || form.pm1.value < 0){
    alert("Pola PM10, P2.5, PM1 muszą przyjmować wartość nieujemną.");
    return false;
  }
  if(isNaN(form.pm10.value) || isNaN(form.pm25.value) || isNaN(form.pm1.value)){
    alert("Niepoprawna zawartość pól PM.");
    return false;
  }
  var today = new Date(Date.now());
  var date = new Date(form.date.value);
  if(date > today){
    alert("Wybrana data nie może być z przyszłości.");
    return false;
  }

  return true;
}

function _registerPopout(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="popUser">
        <span class="close" onclick="closePopout()">&times;</span>
        <span class="doc--title">Rejestracja</span>
        <form method="post">
            <br><input type = "text" class="inpt" id="login" name="login" placeholder="Login"><br><br>
            <input type = "password" class="inpt" id="haslo" name="haslo" placeholder="Hasło"><br><br>
            <input type="button" class="btn" value="Zarejestruj się" onclick="_registerUser(this.form)"><br>
        </form>
        <br><span class="small--text">Masz już konto? <span class="hiper" onclick="_loginPopout()">Zaloguj się!</span></span>
        </div>
  `;
}

function _loginPopout(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="popUser">
        <span class="close" onclick="closePopout()">&times;</span>
        <span class="doc--title">Logowanie</span>
        <form method="post">
            <br><input type="text" class="inpt" name="login" id="login" placeholder="Login"><br><br>
            <input type="password" class="inpt" name="haslo" id="haslo" placeholder="Hasło"><br><br>
            <input type="button" class="btn" value="Zaloguj się" onclick="_loginUser(this.form)"><br>
        </form>
        <br><span class="small--text">Nie masz konta? <span class="hiper" onclick="_registerPopout()">Zarejestruj się!</span></span>
    </div>
  `;
}

function _registerUser(form){
  var user = {};
  user.login = form.login.value;
  user.haslo = form.haslo.value;
  request = getRequestObject();
  txt = JSON.stringify(user);
  request.onreadystatechange = function()  {
      if (request.readyState == 4 && request.status == 200 )  {
          objJSON = JSON.parse(request.response);
          if(objJSON['status'] == 'ok')
          {
              alert("Pomyślnie zarejestrowano.");
              closePopout();
          }
          else {
              alert("Podany login został już zarejestrowany.");

          }


      }
  }

  request.open("POST", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/register", true);
  request.send(txt);
}

function _logoutUser(){
  var data = {};
  var sessionID = getCookie();
  data.sessionID = sessionID;
  txt = JSON.stringify(data);
  request = getRequestObject();
  request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 )  {
          objJSON = JSON.parse(request.response);
          if(objJSON['status'] == 'ok')
          {
              alert("Wylogowano.");
              setCookie('');
              document.getElementById("registerInfo").style.display = "block";
              document.getElementById("loginInfo").style.display = "block";
              document.getElementById("logoutInfo").style.display = "none";
              document.getElementById("addData").style.display = "block";
              document.getElementById("getData").style.display = "none";
              document.getElementById("getChart").style.display = "none";
              document.getElementById("synchData").style.display = "block";
              document.getElementById("town--buttons").style.display = "none";
              document.getElementById("data").innerHTML = '';
              document.getElementById("response").innerHTML = '';
              _hideLogin();
          }
      }
  }

  request.open("POST", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/logout", true);
  request.send(txt);
}

function _loginUser(form){
  var user = {};
  user.login = form.login.value;
  user.haslo = form.haslo.value;
  txt = JSON.stringify(user);
  username = form.login.value;
  request = getRequestObject();
  request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 )  {
          objJSON = JSON.parse(request.response);
          if(objJSON['status'] == 'ok')
          {
            setCookie(objJSON['sessionID']);
            document.getElementById("registerInfo").style.display = "none";
            document.getElementById("loginInfo").style.display = "none";
            document.getElementById("logoutInfo").style.display = "block";
            document.getElementById("addData").style.display = "block";
            document.getElementById("getData").style.display = "block";
            document.getElementById("getChart").style.display = "block";
            document.getElementById("synchData").style.display = "block";
            _showLogin();
            closePopout();

          }
          else {
              alert("Niepoprawny login/hasło!");
          }

      }

  }

  request.open("POST", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/login", true);
  request.send(txt);
}

function _showLogin(){
  document.getElementById('userInfo').innerHTML = `
  <span style="font-weight:600">Zalogowano jako:</span> `+ username + `
  `;
}

function _hideLogin(){
  document.getElementById('userInfo').innerHTML = `
  <span style="font-weight:600">Niezalogowano.</span>
  `;
}



function _getCharts(){
  document.getElementById('response').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  document.getElementById("town--buttons").style.display = "block";
  document.getElementById('town--buttons').innerHTML = `
  <input type='button' value='Kraków' onclick='_drawChart1()'></input>
  <input type='button' value='Warszawa' onclick='_drawChart2()' ></input>
  <input type='button' value='Gdańsk' onclick='_drawChart3()' ></input>
  `;
}

function _drawChart1(){
  document.getElementById('response').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  document.getElementById("chartContainer").style.display = "block";
  var value = [0,0,0,0,0,0,0,0,0,0,0,0];
  var value1 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var value2 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var quantity = [0,0,0,0,0,0,0,0,0,0,0,0];
  var j;
  request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        objJSON = JSON.parse(request.response);
        for(var i in objJSON) {
          if(objJSON[i]['place'] == "Kraków"){
            var arr = objJSON[i]['date'].split("-");
            quantity[parseInt(arr[1]) - 1] += 1;
            value[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm10'], 10);
            value1[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm25'], 10);
            value2[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm1'], 10);
          }
        }
        for(j = 0; j < 12; j++){
          if(quantity[j] == 0){
            value[j] == value1[j] == value2[j] == "null";
          }
          else {
            value[j] = value[j]/quantity[j];
            value1[j] = value1[j]/quantity[j];
            value2[j] = value2[j]/quantity[j];
          }
        }
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
	        animationEnabled: true, // change to true
      		title:{
      			text: "Średnia zawartość PM w Krakowie w poszczególnych miesiącach",
            fontSize: 20
      		},
          axisY:{
            interlacedColor: "#f6f6f6",
            gridColor: "#FFBFD5"
          },
      		data: [
      		{
      			type: "spline",
            name: "pm10",
            color: "#A44B4B",
            showInLegend: true,
            legendText: "PM10",
      			dataPoints: [
      				{ label: "Styczeń",  y: value[0]  },
      				{ label: "Luty", y: value[1]  },
      				{ label: "Marzec", y: value[2]  },
      				{ label: "Kwiecień", y: value[3]  },
      				{ label: "Maj", y:  value[4]  },
              { label: "Czerwiec", y: value[5]  },
      				{ label: "Lipiec", y:value[6]  },
      				{ label: "Sierpień", y:value[7]  },
      				{ label: "Wrzesień", y: value[8]  },
      				{ label: "Październik",y:  value[9]  },
              { label: "Listopad", y: value[10]  },
      				{ label: "Grudzień", y: value[11]  }
      			]
      		},
          {
      			type: "spline",
            color: "#6A8A82",
            name: "pm25",
            showInLegend: true,
            legendText: "PM2.5",
      			dataPoints: [
      				{ label: "Styczeń",  y: value1[0]  },
      				{ label: "Luty", y: value1[1]  },
      				{ label: "Marzec", y: value1[2]  },
      				{ label: "Kwiecień", y: value1[3]  },
      				{ label: "Maj", y:  value1[4]  },
              { label: "Czerwiec", y: value1[5]  },
      				{ label: "Lipiec", y:value1[6]  },
      				{ label: "Sierpień", y:value1[7]  },
      				{ label: "Wrzesień", y: value1[8]  },
      				{ label: "Październik",y:  value1[9]  },
              { label: "Listopad", y: value1[10]  },
      				{ label: "Grudzień", y: value1[11]  }
      			]
      		},
          {
      			type: "spline",
            color: "#A37C27",
            name: "pm1",
            showInLegend: true,
            legendText: "PM1",
      			dataPoints: [
      				{ label: "Styczeń",  y: value2[0]  },
      				{ label: "Luty", y: value2[1]  },
      				{ label: "Marzec", y: value2[2]  },
      				{ label: "Kwiecień", y: value2[3]  },
      				{ label: "Maj", y:  value2[4]  },
              { label: "Czerwiec", y: value2[5]  },
      				{ label: "Lipiec", y:value2[6]  },
      				{ label: "Sierpień", y:value2[7]  },
      				{ label: "Wrzesień", y: value2[8]  },
      				{ label: "Październik",y:  value2[9]  },
              { label: "Listopad", y: value2[10]  },
      				{ label: "Grudzień", y: value2[11]  }
      			]
      		}
      		]
      	});
    	chart.render();

     }
      else if(request.readyState == 4 && request.status == 500){
          alert("Error!");
      }
    }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/list", true);
  request.send(null);
}

function _drawChart2(){
  document.getElementById('response').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  document.getElementById("chartContainer").style.display = "block";
  var value = [0,0,0,0,0,0,0,0,0,0,0,0];
  var value1 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var value2 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var quantity = [0,0,0,0,0,0,0,0,0,0,0,0];
  var j;
  request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        objJSON = JSON.parse(request.response);
        for(var i in objJSON) {
          if(objJSON[i]['place'] == "Warszawa"){
            var arr = objJSON[i]['date'].split("-");
            quantity[parseInt(arr[1]) - 1] += 1;
            value[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm10'], 10);
            value1[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm25'], 10);
            value2[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm1'], 10);
          }
        }
        for(j = 0; j < 12; j++){
          if(quantity[j] == 0){
            value[j] == value1[j] == value2[j] == "null";
          }
          else {
            value[j] = value[j]/quantity[j];
            value1[j] = value1[j]/quantity[j];
            value2[j] = value2[j]/quantity[j];
          }
        }
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
	        animationEnabled: true, // change to true
      		title:{
      			text: "Średnia zawartość PM w Warszawie w poszczególnych miesiącach",
            fontSize: 20
      		},
          axisY:{
            interlacedColor: "#f6f6f6",
            gridColor: "#FFBFD5"
          },
      		data: [
      		{
      			type: "spline",
            name: "pm10",
            color: "#A44B4B",
            showInLegend: true,
            legendText: "PM10",
      			dataPoints: [
      				{ label: "Styczeń",  y: value[0]  },
      				{ label: "Luty", y: value[1]  },
      				{ label: "Marzec", y: value[2]  },
      				{ label: "Kwiecień", y: value[3]  },
      				{ label: "Maj", y:  value[4]  },
              { label: "Czerwiec", y: value[5]  },
      				{ label: "Lipiec", y:value[6]  },
      				{ label: "Sierpień", y:value[7]  },
      				{ label: "Wrzesień", y: value[8]  },
      				{ label: "Październik",y:  value[9]  },
              { label: "Listopad", y: value[10]  },
      				{ label: "Grudzień", y: value[11]  }
      			]
      		},
          {
      			type: "spline",
            color: "#6A8A82",
            name: "pm25",
            showInLegend: true,
            legendText: "PM2.5",
      			dataPoints: [
      				{ label: "Styczeń",  y: value1[0]  },
      				{ label: "Luty", y: value1[1]  },
      				{ label: "Marzec", y: value1[2]  },
      				{ label: "Kwiecień", y: value1[3]  },
      				{ label: "Maj", y:  value1[4]  },
              { label: "Czerwiec", y: value1[5]  },
      				{ label: "Lipiec", y:value1[6]  },
      				{ label: "Sierpień", y:value1[7]  },
      				{ label: "Wrzesień", y: value1[8]  },
      				{ label: "Październik",y:  value1[9]  },
              { label: "Listopad", y: value1[10]  },
      				{ label: "Grudzień", y: value1[11]  }
      			]
      		},
          {
      			type: "spline",
            color: "#A37C27",
            name: "pm1",
            showInLegend: true,
            legendText: "PM1",
      			dataPoints: [
      				{ label: "Styczeń",  y: value2[0]  },
      				{ label: "Luty", y: value2[1]  },
      				{ label: "Marzec", y: value2[2]  },
      				{ label: "Kwiecień", y: value2[3]  },
      				{ label: "Maj", y:  value2[4]  },
              { label: "Czerwiec", y: value2[5]  },
      				{ label: "Lipiec", y:value2[6]  },
      				{ label: "Sierpień", y:value2[7]  },
      				{ label: "Wrzesień", y: value2[8]  },
      				{ label: "Październik",y:  value2[9]  },
              { label: "Listopad", y: value2[10]  },
      				{ label: "Grudzień", y: value2[11]  }
      			]
      		}
      		]
      	});
    	chart.render();

     }
      else if(request.readyState == 4 && request.status == 500){
          alert("Error!");
      }
    }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/list", true);
  request.send(null);
}

function _drawChart3(){
  document.getElementById('response').innerHTML = '';
  document.getElementById('data').innerHTML = '';
  request = getRequestObject();
  document.getElementById("chartContainer").style.display = "block";
  var value = [0,0,0,0,0,0,0,0,0,0,0,0];
  var value1 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var value2 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var quantity = [0,0,0,0,0,0,0,0,0,0,0,0];
  var j;
  request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        objJSON = JSON.parse(request.response);
        for(var i in objJSON) {
          if(objJSON[i]['place'] == "Gdańsk"){
            var arr = objJSON[i]['date'].split("-");
            quantity[parseInt(arr[1]) - 1] += 1;
            value[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm10'], 10);
            value1[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm25'], 10);
            value2[parseInt(arr[1]) - 1] += parseInt(objJSON[i]['pm1'], 10);
          }
        }
        for(j = 0; j < 12; j++){
          if(quantity[j] == 0){
            value[j] == value1[j] == value2[j] == "null";
          }
          else {
            value[j] = value[j]/quantity[j];
            value1[j] = value1[j]/quantity[j];
            value2[j] = value2[j]/quantity[j];
          }
        }
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light2", "dark1", "dark2"
	        animationEnabled: true, // change to true
      		title:{
      			text: "Średnia zawartość PM w Gdańsku w poszczególnych miesiącach",
            fontSize: 20
      		},
          axisY:{
            interlacedColor: "#f6f6f6",
            gridColor: "#FFBFD5"
          },
      		data: [
      		{
      			type: "spline",
            name: "pm10",
            color: "#A44B4B",
            showInLegend: true,
            legendText: "PM10",
      			dataPoints: [
      				{ label: "Styczeń",  y: value[0]  },
      				{ label: "Luty", y: value[1]  },
      				{ label: "Marzec", y: value[2]  },
      				{ label: "Kwiecień", y: value[3]  },
      				{ label: "Maj", y:  value[4]  },
              { label: "Czerwiec", y: value[5]  },
      				{ label: "Lipiec", y:value[6]  },
      				{ label: "Sierpień", y:value[7]  },
      				{ label: "Wrzesień", y: value[8]  },
      				{ label: "Październik",y:  value[9]  },
              { label: "Listopad", y: value[10]  },
      				{ label: "Grudzień", y: value[11]  }
      			]
      		},
          {
      			type: "spline",
            color: "#6A8A82",
            name: "pm25",
            showInLegend: true,
            legendText: "PM2.5",
      			dataPoints: [
      				{ label: "Styczeń",  y: value1[0]  },
      				{ label: "Luty", y: value1[1]  },
      				{ label: "Marzec", y: value1[2]  },
      				{ label: "Kwiecień", y: value1[3]  },
      				{ label: "Maj", y:  value1[4]  },
              { label: "Czerwiec", y: value1[5]  },
      				{ label: "Lipiec", y:value1[6]  },
      				{ label: "Sierpień", y:value1[7]  },
      				{ label: "Wrzesień", y: value1[8]  },
      				{ label: "Październik",y:  value1[9]  },
              { label: "Listopad", y: value1[10]  },
      				{ label: "Grudzień", y: value1[11]  }
      			]
      		},
          {
      			type: "spline",
            color: "#A37C27",
            name: "pm1",
            showInLegend: true,
            legendText: "PM1",
      			dataPoints: [
      				{ label: "Styczeń",  y: value2[0]  },
      				{ label: "Luty", y: value2[1]  },
      				{ label: "Marzec", y: value2[2]  },
      				{ label: "Kwiecień", y: value2[3]  },
      				{ label: "Maj", y:  value2[4]  },
              { label: "Czerwiec", y: value2[5]  },
      				{ label: "Lipiec", y:value2[6]  },
      				{ label: "Sierpień", y:value2[7]  },
      				{ label: "Wrzesień", y: value2[8]  },
      				{ label: "Październik",y:  value2[9]  },
              { label: "Listopad", y: value2[10]  },
      				{ label: "Grudzień", y: value2[11]  }
      			]
      		}
      		]
      	});
    	chart.render();

     }
      else if(request.readyState == 4 && request.status == 500){
          alert("Error!");
      }
    }
  request.open("GET", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/list", true);
  request.send(null);
}




function showDoc(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="pop">
        <span class="close" onclick="closePopout()">&times;</span>
        <span class="doc--title">Dokumentacja</span>
        <h3>Projekt 2:  Aplikacja WWW prztwarzająca dane w trybie on-line i off-line.</h3>
        <h3>Autor: Weronika Schabowicz</h3>
        <p>Aplikacja stworzona została w ramach projektu 2. Służy do zbierania danych o stanie zanieczyszczenia powietrza.
        Od użytkownika pobiera informacje o dacie, godzinie pomiaru, lokalizacji, zawartości PM10, PM2.5 oraz PM1.
        Użytkownik uzyskuje dostęp do serwisu poprzez logowanie/rejestrację (mechanizm sesji). Aplikacja wykorzystuje technologie:
        HTML, CSS, JavaScript, MongoDB, RESTful. Po stronie serwera użyto języka php.</p>
        </div>
  `;
}


function closePopout(){
  var popout =  document.getElementById('about');
  popout.style.display = "none";
}

window.onclick = function(event) {
  var popout =  document.getElementById('about');
  if (event.target == popout) {
    popout.style.display = "none";
  }
}

function _synchData(){
  _showListOffline();
  alert("Blad synchronizacji!");
  var tx = db.transaction("rekordy", "readwrite");
  var store = tx.objectStore("rekordy");
	var req = store.openCursor();
  req.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
          var rekord = {};
          rekord.date = cursor.value.date;
          rekord.time = cursor.value.time;
          rekord.place = cursor.value.place;
          rekord.pm10 = cursor.value.pm10;
          rekord.pm25 = cursor.value.pm25;
          rekord.pm1 = cursor.value.pm1;
          txt = JSON.stringify(rekord);
          request = getRequestObject();
          request.onreadystatechange = function () {
              if (request.readyState == 4 && request.status == 200) {
                  objJSON = JSON.parse(request.response);
                  if (objJSON['status'] == 'ok') {
                      alert("Zsynchronizowano rekordy.");

                  }
              }
          }
          request.open("POST", "http://pascal.fis.agh.edu.pl/~6schabowicz/tiprojekt2/rest/save", true);
          request.send(txt);
          cursor.delete();
          cursor.continue();
      }
      else {
          alert("Brak rekordów do zsynchronizowania.");
      }
  };

}
