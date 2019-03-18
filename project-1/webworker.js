var i = 0;

function timedCount() {
  i = i + 1;
  if(i >= 0 && i <= 1) postMessage(i + " rok");
  if(i >= 2 && i <= 4) postMessage(i + " lata");
  else postMessage(i + " lat");
  setTimeout("timedCount()",3700);
}

timedCount();
