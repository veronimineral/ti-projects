var sun = new Image(),
    earth = new Image(),
    mars = new Image(),
    mercury = new Image(),
    venus = new Image(),
    jupiter = new Image(),
    saturn = new Image(),
    uranus = new Image(),
    neptune = new Image();

// ----------------- RYSOWANIE CANVAS ----------------- \\
window.onload = function(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");
  var canWidth  = canvas.width;
  var canHeight  = canvas.height;
  var time = 1;
  sun.src = 'src/sun.png';
  mercury.src = 'src/mercury.png';
  venus.src = 'src/venus.png';
  earth.src = 'src/earth.png';
  mars.src = 'src/mars.png';
  jupiter.src = 'src/jupiter.png';
  saturn.src = 'src/saturn.png';
  uranus.src = 'src/uranus.png';
  neptune.src = 'src/neptune.png';

  //żądanie wywołania określonej funkcji w celu wykonania animacji
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(callback){
      window.setTimeout(callback, 1000/60);
  }

  function rysujOrbite(x, y, r, thickness){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.lineWidth = thickness;
    if(thickness == 4) ctx.strokeStyle = "rgba(255,255,255,0.6)";
    else ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.stroke();
    ctx.closePath();
  }

  function rysujUklad(){
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, 850, 850);
    ctx.closePath();
    // rozpoczęcie rysowania od srodka canvas
    ctx.translate(canWidth/2, canHeight/2);

    // ---------------------------------- Słońce
    ctx.drawImage(sun, -28, -27);

    // ---------------------------------- Merkury
    rysujOrbite(0, 0, 40, "1"); // --- rysowanie orbity
    ctx.rotate(time / 30); // --- ruch obiektu
    ctx.translate(40,0); // --- ustawienie pozycji
    ctx.drawImage(mercury, -8, 0); // --- rysowanie planety

    // ---------------------------------- Wenus
    ctx.translate(-40,0);
    rysujOrbite(0, 0, 60, "1");
    ctx.rotate(time / 100 - (time / 90));
    ctx.translate(60,0);
    ctx.drawImage(venus, -14, 0);

    // ---------------------------------- Ziemia
    ctx.translate(-60,0);
    rysujOrbite(0, 0, 90, "1");
    ctx.rotate(time / 100 - (time / 80));
    ctx.translate(90,0);
    ctx.drawImage(earth, -16, 0);

    // ---------------------------------- Mars
    ctx.translate(-90,0);
    rysujOrbite(0, 0, 120, "2");
    ctx.rotate(time / 120 - (time / 50));
    ctx.translate(120,0);
    ctx.drawImage(mars, -14, 0);

    // ---------------------------------- Jowisz
    ctx.translate(-120,0);
    rysujOrbite(0, 0, 220, "2");
    ctx.rotate(time / 120 - (time / 50));
    ctx.translate(220,0);
    ctx.drawImage(jupiter, -55, 0);

    // ---------------------------------- Saturn
    ctx.translate(-220,0);
    rysujOrbite(0, 0, 300, "2");
    ctx.rotate(time / 120 - (time / 90));
    ctx.translate(300,0);
    ctx.drawImage(saturn, -68, 3);
    ctx.translate(0,0);
    rysujOrbite(-14, 47, 50, "4");

    // ---------------------------------- Uran
    ctx.translate(-300,0);
    rysujOrbite(0, 0, 340, "2");
    ctx.rotate(time / 120 - (time / 90));
    ctx.translate(-340,0);
    ctx.drawImage(uranus, -48, 0);
    ctx.translate(0,0);
    rysujOrbite(0, 33, 34, "3");

    // ---------------------------------- Neptun
    ctx.translate(340,0);
    rysujOrbite(0, 0, 380, "2");
    ctx.rotate(time / 120 - (time / 140));
    ctx.translate(-380,0);
    ctx.drawImage(neptune, -47, 0);

    ctx.restore();
    time++;

    window.requestAnimationFrame(rysujUklad);

  }

    window.requestAnimationFrame(rysujUklad);

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

// ----------------- MERKURY INFO ----------------- //
function showAbout1(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="aboutPlanet">
        <span class="close" onclick="closePopout()">&times;</span>
        <p><span style="font-weight: bold; color: #e7f380">Merkury</span> jest pierwszą i najmniejszą planetą w Układzie Słonecznym. Ze względu na małą odległość od Słońca ciężko jest zobaczyć go z Ziemi.
        Merkury pozbawiony jest atmosfery. Płaszcz pod skorupą składa się ze stopionych skał, a w środku planety znajduje się żelazne jądro.
        Ze względu na fakt, iż krąży on szybko wokół Słońca, a wolno wokół własnej osi, wschód Słońca następuje na nim co 176 dni. Jest on jednym z najgorętszych
        i jednocześnie najzimniejszych planet Układu Słonecznego. Maksymalna temperatura na Merkurym wynosi +427°C, a minimalna -212°C.
        Merkury ma wiele kraterów, występują na nim góry a także kilka płaskich obszarów. Największy krater o nazwie Caloris Planitia ma średnicę 1300 km.
        Powierzchnię Merkurego przecinają wielkie, strome skarpy o wysokości ponad 3 km, które ciągną się na przestrzeni setek kilometrów.</p>
        <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio1()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg1()"/>   <input type="button" class="mybtn" value="Merkury w liczbach" onclick="displayTab1()"/></div>
        <br/><div id="tab" class="tab" align="center"></div>
      </div>
  `;
}

function displayTab1(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>59,9 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>87,969 dni</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>58,65 dni</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>4878 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>0,056 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>47,36 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>100-700 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>0</td>
        </tr>
      </table>
  `;
}

function displayAudio1(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/mercury.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

function displayImg1(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column2 photo">
    <img src="src/merc1.jpg" alt="Zdjecie z Messengera" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Merkurego z sondy Messenger (2008)</div>
    </div>
  </div>
  <div class="column2 photo">
    <img src="src/merc3.jpg" alt="Analiza widomowa powierzchni" style="width:100%">
    <div class="container">
      <div class="desc">Analiza widomowa powierzchni</div>
    </div>
  </div>
  <div class="column2 photo">
    <img src="src/merc4.jpg" alt="Mapa półkuli północnej" style="width:100%">
    <div class="container">
      <div class="desc">Mapa półkuli północnej</div>
    </div>
  </div>
  <div class="column2 photo">
    <img src="src/merc5.png" alt="Tranzyt" style="width:100%">
    <div class="container">
      <div class="desc">Tranzyt na tle Słońca (2016)</div>
    </div>
  </div>
  `;
}

// ----------------- WENUS INFO ----------------- //
function showAbout2(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="aboutPlanet">
        <span class="close" onclick="closePopout()">&times;</span>
        <p><span style="font-weight: bold; color: #e7f380">Wenus</span> jest drugą planetą od Słońca. Otoczona jest obłokami trujących gazów oraz bardzo gęstą atmosferą - stukrotnie gęstszą od ziemskiej. Jest bardzo jasna ze względu na jej gęste chmury, które bardzo dobrze odbijają światło.
        Czas obrotu Wenus wokół osi jest najdłuższy w Układzie Słonecznym - wynosi aż 243 doby, czyli mniej niż na okrążenie Słońca, przez co dzień na Wenus jest dłuższy niż rok. Planeta ta wykonuje obrót wsteczny - obraca się w przeciwną stroną do ruchu po orbicie.
        Powierzchnię Wenus pokrywają rozległe płaskie równiny z kraterami, dolinami oraz pasmami górskimi, a także wulkany. Efekt cieplarniany podnosi temperaturę planety nawet do +480°C. </p>
        <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio2()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg2()"/>   <input type="button" class="mybtn" value="Wenus w liczbach" onclick="displayTab2()"/></div>
        <br/><div id="tab" class="tab" align="center"></div>
      </div>
  `;
}

function displayTab2(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>108,2 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>224,7 dni</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>243 dni</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>12104 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>0,815 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>35 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>100-740 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>0</td>
        </tr>
      </table>
  `;
}

function displayImg2(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column2 photo">
    <img src="src/ven1.jpg" alt="Zdjecie z Messengera" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Wenus z sondy Mariner 10</div>
    </div>
  </div>
  <div class="column2 photo">
    <img src="src/ven4.jpg" alt="Wewenętrzna budowa" style="width:100%">
    <div class="container">
      <div class="desc">Wewnętrzna budowa Wenus</div>
    </div></div>
  <div class="column2 photo">
    <img src="src/ven3.jpg" alt="Tranzyt" style="width:100%">
    <div class="container">
      <div class="desc">Tranzyt Wenus na tle Słońca (2004)</div>
    </div>
  </div>
  <div class="column2 photo">
    <img src="src/ven2.jpg" alt="Mapa półkuli północnej" style="width:100%">
    <div class="container">
      <div class="desc">Rekonstrukcja powierzchni Wenus z danych radarowych</div>
    </div>
  </div>
  <div class="column2 photo">
    <img src="src/ven5.jpg" alt="Tranzyt" style="width:100%">
    <div class="container">
      <div class="desc">Wenus i Księżyc na nocnym niebie</div>
    </div>
  </div>
  `;
}

function displayAudio2(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/venus.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

// ----------------- ZIEMIA INFO ----------------- //
function showAbout3(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="aboutPlanet">
        <span class="close" onclick="closePopout()">&times;</span>
        <p><span style="font-weight: bold; color: #e7f380">Ziemia</span> jest trzecią planetą od Słońca. Wyjątkową cechą Ziemi jest to, że występuje na niej woda w stanie ciekłym i zawierająca tlen atmosfera.
        W grudniu Ziemia znajduje się nieco bliżej Słońca, a w czerwcu jest najbardziej od niego oddalona. Oś Ziemi jest nachylona w stosunku do Słońca, dzięki czemu występuje zjawisko pór roku.
        Obroty Ziemi wokół własnej osi powodują zjawiska dnia i nocy. W skład atmosfery wchodzą głównie azot i tlen, ma ona grubość około 100 km i składa się z kilku warstw.
        Jedną z najważniejszych jest warstwa ozonowa, która rozciąga się na wysokości ok. 20-35 km i pełni rolę tarczy osłaniającej przed szkodliwym promieniowaniem.
        Ziemia posiada jednego naturalnego satelitę - Księżyc. Jego średnica wynosi 3476 km i znajduje się w odległości 380 tys. km od Ziemi. Jego przyciąganie grawitacyjne powoduje przypływy i odpływy mórz i oceanów.</p>
        <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio3()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg3()"/>   <input type="button" class="mybtn" value="Ziemia w liczbach" onclick="displayTab3()"/></div>
        <br/><div id="tab" class="tab" align="center"></div>
      </div>
  `;
}

function displayTab3(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>149,6 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>365 dni 6h</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>23h 56min</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>12752 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>5,972E24 kg</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>29,8 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>184-330 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>1</td>
        </tr>
      </table>
  `;
}

function displayImg3(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column photo">
    <img src="src/ear1.jpg" alt="Ziemia" style="width:100%">
    <div class="container">
      <div class="desc">Pierwsze pełne zdjęcie Ziemi (1972)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ear2.jpg" alt="Księżyc" style="width:100%">
    <div class="container">
      <div class="desc">Księżyc - naturalny satelia Ziemi</div>
    </div></div>
  <div class="column photo">
    <img src="src/ear4.jpg" alt="Ziemia z Księżyca" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Ziemi wykonane z Księżyca</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ear5.jpg" alt="Wnętrze Ziemi " style="width:100%">
    <div class="container">
      <div class="desc">Warstwy wewnątrz Ziemi.</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ear3.jpg" alt="Huragan Felix" style="width:100%">
    <div class="container">
      <div class="desc">Huragan Felix widziany z orbity (2007)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ear6.jpg" alt="Tesla Roadster " style="width:100%">
    <div class="container">
      <div class="desc">Tesla Roadster na tle Ziemi.</div>
    </div>
  </div>

  `;
}

function displayAudio3(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/earth.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

// ----------------- MARS INFO ----------------- //
function showAbout4(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="aboutPlanet">
        <span class="close" onclick="closePopout()">&times;</span>
        <p><span style="font-weight: bold; color: #e7f380">Mars</span> jest widoczny na niebie jako czerwony, podobny do gwiazdy punkt. Jest on skalistą planetą, którą pokrywają czerwone pustynie, stąd popularna nazwa - Czerwona Planeta.
        Atmosfera składa się w większości z dwutlenku węgla, co uniemożliwia oddychanie. Występują tam potężne burze pyłowe, a powierzchnia planety pokryta jest okruchami skał, tworzą je kratery, góry, doliny i wulkany.
        Maksymalna temperatura na Marsie dochodzi do +27°C, a minimalna -126°C.  Dwa księżyce Marsa - Phobos i Deimos są prawdopodobnie fragmentami planetoid.
        Na Marsie można spotkać dwa różne typy krajobrazów - północna część planety to w większości wygładzona równina pokryta lawą, która wypłynęła z wulkanów, południowa zaś zryta jest głębokimi kraterami.
        Obserwowane są również trąby powietrzne spowodowane prądami konwekcyjnymi, których przyczyną jest różnica temperatur pomiędzy nagrzaną powierzchnią i chłodnym powietrzem.
        Na Marsie znajduje się najwyższa góra w Układzie Słonecznym - Olympus Mons - wygasły wulkan, wznoszący się na wysokość 21299 metrów ponad powierzchnię planety.
        Na obu biegunach planety znajdują się czapy polarne, złożone z zamarzniętej wody z dodatkiem dwutlenku węgla.</p>
        <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio4()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg4()"/>   <input type="button" class="mybtn" value="Mars w liczbach" onclick="displayTab4()"/></div>
        <br/><div id="tab" class="tab" align="center"></div>
      </div>
  `;
}

function displayTab4(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>227,9 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>686,738 dni</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>24h 37min</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>6788 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>0,107 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>24,1 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>130-308 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>2</td>
        </tr>
      </table>
  `;
}

function displayImg4(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column photo">
    <img src="src/mars1.jpg" alt="Mars" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Marsa (rzeczywiste kolory)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/mars2.jpg" alt="Biegun" style="width:100%">
    <div class="container">
      <div class="desc">Czapa polarna na północnym biegunie Marsa</div>
    </div></div>
  <div class="column photo">
    <img src="src/mars3.jpg" alt="Krater" style="width:100%">
    <div class="container">
      <div class="desc">Krater Koroleva wypełniony lodem.</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/mars4.jpg" alt="Olympus Mons" style="width:100%">
    <div class="container">
      <div class="desc">Olympus Mons - najwyższa góra w Układzie Słonecznym.</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/mars5.jpg" alt="Atmosfera" style="width:100%">
    <div class="container">
      <div class="desc">Cienka atmosfera Marsa widoczna z orbity</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/mars6.jpg" alt="Insight" style="width:100%">
    <div class="container">
      <div class="desc">Lądownik InSight na powierzchni Marsa (2018)</div>
    </div>
  </div>
  `;
}

function displayAudio4(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/mars.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

// ----------------- JOWISZ INFO ----------------- //
function showAbout5(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="aboutPlanet">
    <span class="close" onclick="closePopout()">&times;</span>
    <p><span style="font-weight: bold; color: #e7f380">Jowisz</span> to piąta w kolejności oddalenia od Słońca i największa planeta Układu Słonecznego. Jego masa jest nieco mniejsza niż jedna tysięczna masy Słońca,
    a zarazem dwa i pół razy większa niż łączna masa wszystkich innych planet w Układzie Słonecznym. Wraz z Saturnem tworzą grupę gazowych olbrzymów.
    Jest on gazowa kulą, choć posiada prawdopodobnie jądro z płynnych skał. Objętościowo atmosfera Jowisza składa się z około 88–92% wodoru i 8–12% helu (około 1% atmosfery stanowią metan, woda i amoniak).
    Jowisz wybrzusza się na równiku i spłaszcza na biegunach z powodu dużych wirowań. Wiatry na nim osiągają prędkość do 500 km/h. Szybki ruch wirowy i ciepło z wnętrza planety powodują powstanie silnych wiatrów,
    dzielących atmosferę na równoleżnikowe pasy opadających lub wznoszących się gazów. Na tarczy Jowisza widać też od co najmniej 300 lat antycyklon o średnicy dwukrotnie większej od Ziemi, zwany Wielką Czerwoną Plamą, który według badań stale maleje.
    Prawie 400 lat temu Galileusz odkrył cztery księżyce Jowisza -  Io, Europę, Ganimedes i Callisto.  Były to pierwsze obiekty w przestrzeni kosmicznej odkryte za pomocą teleskopu.</p>
    <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio5()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg5()"/>   <input type="button" class="mybtn" value="Jowisz w liczbach" onclick="displayTab5()"/></div>
    <br/><div id="tab" class="tab" align="center"></div>
  </div>
  `;
}

function displayImg5(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column photo">
    <img src="src/jup1.jpg" alt="Jowisz" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Jowisza z teleskopu Hubble'a (2014)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/jup2.jpg" alt="Czerwona Plama" style="width:100%">
    <div class="container">
      <div class="desc">Wielka Czerwona Plama na powierzchni Jowisza</div>
    </div></div>
  <div class="column photo">
    <img src="src/jup3.png" alt="Wnętrze" style="width:100%">
    <div class="container">
      <div class="desc">Model budowy wewnętrznej Jowisza</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/jup4.jpg" alt="Ziemia a Jowisz" style="width:100%">
    <div class="container">
      <div class="desc">Porównanie rozmiarów Ziemi i Jowisza oraz Czerwonej Plamy</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/jup5.jpg" alt="Io" style="width:100%">
    <div class="container">
      <div class="desc">Jeden z księżyców Jowisza - Io</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/jup6.jpg" alt="Biegun" style="width:100%">
    <div class="container">
      <div class="desc">Biegun południowy Jowisza</div>
    </div>
  </div>
  `;
}

function displayAudio5(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/jupiter.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

function displayTab5(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>778,3 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>11 lat 315 dni</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>9,8h</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>142800 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>317,9 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>13,1 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>130-308 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>79</td>
        </tr>
      </table>
  `;
}

// ----------------- SATURN INFO ----------------- //
function showAbout6(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="aboutPlanet">
    <span class="close" onclick="closePopout()">&times;</span>
    <p><span style="font-weight: bold; color: #e7f380">Saturn</span> jest szóstą planetą od Słońca, drugą co do wielkości planetą naszego Układu. Jest to gazowy gigant - bardzo zimny, ponieważ znajduje się bardzo daleko od Słońca i otrzymuje od niego 1/10 ilości ciepła i światła co Ziemia.
    Pierścienie wokół Saturna, odkryte przez Galileusza, czynią go jedną z najpiękniejszych planet Układu Słonecznego. Są ich setki, a rozciągają się one na przestrzeni tysięcy kilometrów. Prawdopodobnie składają się z milionów brył lodu o średnicy od kilku
    centymetrów do kilkudziesięciu metrów, które są widoczne za pomocą teleskopu. Ich grubość wynosi zaledwie około 10 metrów. 7 spośród pierścieni jest oznaczonych kolejnymi literami alfabetu od A do G.
    Atmosfera Saturna składa się głównie z wodoru, helu i amoniaku. Tytan, największy z księżyców Saturna, jest jedynym księżycem w Układzie Słonecznym otoczonym atmosferą podobną do ziemskiej. Inny księżyc Saturna, Phoebe, nie powstał w otoczeniu planety,
    lecz został przechwycony przez siły grawitacyjne. Zawiera on dużo mniej lodu i więcej skał niż inne księżyce Saturna.
    </p>
    <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio6()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg6()"/>   <input type="button" class="mybtn" value="Saturn w liczbach" onclick="displayTab6()"/></div>
    <br/><div id="tab" class="tab" align="center"></div>
  </div>
  `;
}

function displayImg6(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column photo">
    <img src="src/sat1.jpg" alt="Saturn" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Saturna z sondy Cassini (2008)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/sat2.jpg" alt="Cyklon na Saturnie" style="width:100%">
    <div class="container">
      <div class="desc">Cyklon na Saturnie</div>
    </div></div>
  <div class="column photo">
    <img src="src/sat3.jpg" alt="Księżyce Saturna" style="width:100%">
    <div class="container">
      <div class="desc">Księżyce Saturna- Dione, Tytan, Prometeusz i Telesto</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/sat4.jpg" alt="Zaćmienie" style="width:100%">
    <div class="container">
      <div class="desc">Zaćmienie Słońca przez Saturna widziane z sondy Cassini</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/sat5.jpg" alt="Saturn a Ziemia" style="width:100%">
    <div class="container">
      <div class="desc">Porównanie rozmiarów Saturna i Ziemi</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/sat6.jpg" alt="Burza na Saturnie" style="width:100%">
    <div class="container">
      <div class="desc">Sześciokątna burza na północnym biegunie Saturna</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/sat7.jpg" alt="Emisja ciepła" style="width:100%">
    <div class="container">
      <div class="desc">Emisja ciepła Saturna</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/sat8.jpg" alt="Enceladus" style="width:100%">
    <div class="container">
      <div class="desc">Gejzery na jednym z księżyców Saturna- Enceladusie</div>
    </div>
  </div>
  `;
}

function displayAudio6(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/saturn.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

function displayTab6(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>1427 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>29 lat 167 dni</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>10h 14min</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>120660 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>95,1 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>9,6 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>130-308 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>62</td>
        </tr>
      </table>
  `;
}

// ----------------- URAN INFO ----------------- /
function showAbout7(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="aboutPlanet">
    <span class="close" onclick="closePopout()">&times;</span>
    <p><span style="font-weight: bold; color: #e7f380">Uran</span> jest kolejną spośród planet zewnętrznych, będących gazowymi olbrzymami. Z Ziemi jest ledwo widoczny nawet przez teleskop.
    Przez to, że nachylenie płaszczyzny równika Urana do płaszczyzny jego orbity wynosi 98°, planeta wiruje wokół własnej osi ruchem wstecznym.
    Jego pole magnetyczne jest 3 razy silniejsze niż ziemskie. Uran, podobnie jak Saturn, posiada pierścienie, których jest 11. Są one bardzo niewyraźne i ciężko je zobaczyć z Ziemi.
    Uran swój zielonkawy kolor zawdzięcza chmurom metanu w górnych warstwach atmosfery. Różnice temperatur nie są duże i wynoszą od -208°C do -212°C.
    </p>
    <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio7()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg7()"/>   <input type="button" class="mybtn" value="Uran w liczbach" onclick="displayTab7()"/></div>
    <br/><div id="tab" class="tab" align="center"></div>
  </div>
  `;
}

function displayImg7(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column photo">
    <img src="src/ur1.jpg" alt="Uran" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Uranu z sondy Voyager 2 (1986)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ur2.jpg" alt="Bliska podczerwień" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Uranu w bliskiej podczerwieni</div>
    </div></div>
  <div class="column photo">
    <img src="src/ur3.jpg" alt="Zorza na Uranie" style="width:100%">
    <div class="container">
      <div class="desc">Zorza na powierzchni Uranu</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ur4.jpg" alt="Mapa półkuli północnej" style="width:100%">
    <div class="container">
      <div class="desc">Mapa półkuli północnej</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/ur5.jpg" alt="Ostanie zdjecie" style="width:100%">
    <div class="container">
      <div class="desc">Ostatnie zdjecie Uranu wykonane przez Voyagera</div>
    </div>
  </div>
  `;
}

function displayAudio7(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/uranus.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

function displayTab7(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>2870 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>84 lata</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>10h 49min</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>51108 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>14,5 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>6,8 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>130-308 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>27</td>
        </tr>
      </table>
  `;
}

// ----------------- NEPTUN INFO ----------------- //
function showAbout8(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="aboutPlanet">
    <span class="close" onclick="closePopout()">&times;</span>
    <p><span style="font-weight: bold; color: #e7f380">Neptun</span> jest najbardziej odległą i najmniejszą planetą gazową. Jądro Neptuna stanowi około 50% jego objętości i jest zbudowane ze skał i lodu.
    Otacza je amoniak i metan, co nadaje mu niebieskie zabarwienie. Prędkość wiatrów dochodzi do 2,5 tys. km/h. Występują tam również burze w formie wielkiej ciemnej plamy.
    Na jednym z księżyców Neptuna, lodowym Trytonie, odkryto także gejzery. Sonda Voyager 2 potwierdziła wcześniejsze przypuszczenia o istnieniu pierścieni wokół Neptuna.
    Na skutek oddziaływań z satelitami magnetosfera Neptuna ma zmienną geometrię.
    </p>
    <div class="btnclass" align="center"><input type="button" class="mybtn" value="Nagranie audio" onclick="displayAudio8()"/>   <input type="button" class="mybtn" value="Galeria" onclick="displayImg8()"/>   <input type="button" class="mybtn" value="Neptun w liczbach" onclick="displayTab8()"/></div>
    <br/><div id="tab" class="tab" align="center"></div>
  </div>
  `;
}

function displayImg8(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
  <div class="row">
    <div class="column photo">
    <img src="src/nep1.jpg" alt="Neptun" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Neptuna z sondy Voyager 2 (1989)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/nep2.jpg" alt="Chmury" style="width:100%">
    <div class="container">
      <div class="desc">Wysoko położone pasma chmur, rzucające cień na dolne warstwy</div>
    </div></div>
  <div class="column photo">
    <img src="src/nep3.jpg" alt="Neptun z Ziemi" style="width:100%">
    <div class="container">
      <div class="desc">Zdjęcie Neptuna z Ziemi wykonane przez ESO (2018)</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/nep4.jpg" alt="Pierścienie Neptuna" style="width:100%">
    <div class="container">
      <div class="desc">Pierścienie Neptuna</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/nep5.jpg" alt="Proteusz" style="width:100%">
    <div class="container">
      <div class="desc">Księżyc Neptuna Proteusz</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/nep6.jpg" alt="Antycyklony" style="width:100%">
    <div class="container">
      <div class="desc">Antycyklony - Wielka Ciemna Plama, Scooter i Mała Ciemna Plama</div>
    </div>
  </div>
  <div class="column photo">
    <img src="src/nep7.png" alt="Neptun a Ziemia" style="width:100%">
    <div class="container">
      <div class="desc">Porównanie rozmiarów Ziemi i Neptuna</div>
    </div>
  </div>
  `;
}

function displayAudio8(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
    <p>Za pomocą sond kosmicznych odebrane zostały fale elektromagnetyczne, wysyłane przez m.in. planety. Uzyskane dane dzięki odpowiednim narzędziom przekształcone zostały na fale dźwiękowe - "głosy" planet.</p>
    <audio controls>
    <source src="src/neptune.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio><br/><br/>
  `;
}

function displayTab8(){
  var popout =  document.getElementById('tab');
  popout.style.display = "block";
  popout.innerHTML = `
        <table>
        <tr>
          <td>Odległość od Słońca</td>
          <td>4497 mln km</td>
        </tr>
        <tr>
          <td>Okres obiegu wokół Słońca</td>
          <td>164,78 lat</td>
        </tr>
        <tr>
          <td>Okres rotacji</td>
          <td>15h 40min</td>
        </tr>
        <tr>
          <td>Średnica</td>
          <td>49530 km</td>
        </tr>
        <tr>
          <td>Masa</td>
          <td>17,2 Mz</td>
        </tr>
        <tr>
          <td>Prędkość ruchu po orbicie</td>
          <td>5,4 km/s</td>
        </tr>
        <tr>
          <td>Temperatura powierzchni</td>
          <td>130-308 K</td>
        </tr>
        <tr>
          <td>Satelity naturalne</td>
          <td>14</td>
        </tr>
      </table>
  `;
}

// --------------- DOKUMENTACJA --------------- //
function showDoc(){
  var popout =  document.getElementById('about');
  popout.style.display = "block";
  popout.innerHTML = `
      <div class="aboutPlanet">
        <span class="close" onclick="closePopout()">&times;</span>
        <span class="doc--title">Dokumentacja</span>
        <h3>Projekt 1:  Strona WWW w języku HTML5 z wykorzystaniem skryptów JavaScript.</h3>
        <h3>Autor: Weronika Schabowicz</h3>
        <p>Projekt wykonany został przy użyciu technologii HTML5 wykorzystaniem języka JavaScript i CSS 3.0.<br />
        Nawigacja po stonie odbywa się za pomocą navbara, który zawiera elementy odsyłające do konkretnych zakładek strony.
        Dodatkowo w prawym dolnym rogu strony umieszczony został obiekt służący do powrotu do nagłówka.<br/>
        Animacja ruchu planet opracowana została za pomocą elementu <i>canvas</i>.<br/>
        Dzięki językowi JavaScript stworzona została została obsługa zdarzeń <i>onclick</i> - mechanizmy włączania wyskakujących okien (pop-ups), zawierających opis poszczególnych planet, a także do przełączania między
        zakładkami tych okien przy użyciu funkcji <i>getElementByID</i> oraz <i>innerHTML</i>. Wykonywane są również operacje na własnościach styli - <i>style.display</i>.<br/>
        Treści multimedialne prezentowane są za pomocą elementu <i>audio</i>.<br/>
        Zdjęcia umieszczone w zakładkach "galeria" zawierają dodatkowy tooltip - opis, który wyświetla się po najechaniu kursorem na obrazek.
        Dodatkowo użyta została technologia WebWorker, uruchamiana przy pomocy buttonów, która służy do liczenia obiegów Ziemi wokół Słońca.<br/>
      	Wyrażenia matematyczne stworzone zostały za pomocą składni MathJax.<br/>
        Projekt prawidłowo przechodzi walidację na stronie W3C. Testowanie strony odbywało się w przeglądarce Mozilla Firefox.  
</div>
  `;
}

// --------------- WEB WORKER --------------- //
var w;

function startWorker() {
  if(typeof(Worker) !== "undefined") {
    if(typeof(w) == "undefined") {
      w = new Worker("webworker.js");
    }
    w.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Twoja przeglądarka nie obsługuje technologii WebWorker.";
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}
