var input, button, sentence, sel1, sel2;
var mainlink = "https://api.exchangeratesapi.io/latest?base=";
var mainlink2 = "&symbols=";
var linkbase, linksymbols, completelink;
var database, ref;
var over = false;

function setup() {
   noCanvas();

   createP("From: ");

   input = createInput();

   sel1 = createSelect();

   sel1.option('EUR');
   sel1.option('CAD');
   sel1.option('HKD');
   sel1.option('ISK');
   sel1.option('PHP');
   sel1.option('DKK');
   sel1.option('HUF');
   sel1.option('CZK');
   sel1.option('AUD');
   sel1.option('RON');
   sel1.option('SEK');
   sel1.option('IDR');
   sel1.option('INR');
   sel1.option('BRL');
   sel1.option('RUB');
   sel1.option('HRK');
   sel1.option('JPY');
   sel1.option('CTB');
   sel1.option('CHF');
   sel1.option('SGD');
   sel1.option('PLN');
   sel1.option('BGN');
   sel1.option('TRY');
   sel1.option('CNY');
   sel1.option('NOK');
   sel1.option('NZD');
   sel1.option('ZAR');
   sel1.option('USD');
   sel1.option('MXN');
   sel1.option('ILS');
   sel1.option('GBP');
   sel1.option('KRW');
   sel1.option('MYR');

   createP("To: ");

   sel2 = createSelect();

   sel2.option('CAD');
   sel2.option('EUR');
   sel2.option('HKD');
   sel2.option('ISK');
   sel2.option('PHP');
   sel2.option('DKK');
   sel2.option('HUF');
   sel2.option('CZK');
   sel2.option('AUD');
   sel2.option('RON');
   sel2.option('SEK');
   sel2.option('IDR');
   sel2.option('INR');
   sel2.option('BRL');
   sel2.option('RUB');
   sel2.option('HRK');
   sel2.option('JPY');
   sel2.option('CTB');
   sel2.option('CHF');
   sel2.option('SGD');
   sel2.option('PLN');
   sel2.option('BGN');
   sel2.option('TRY');
   sel2.option('CNY');
   sel2.option('NOK');
   sel2.option('NZD');
   sel2.option('ZAR');
   sel2.option('USD');
   sel2.option('MXN');
   sel2.option('ILS');
   sel2.option('GBP');
   sel2.option('KRW');
   sel2.option('MYR');


   linkbase = sel1.value();
   linksymbols = sel2.value();

   createP('');

   button = createButton('convert');
   button.mousePressed(convertAmount);

   createP('Previously converted values from the database:');

   textAlign(CENTER);
   textSize(50);

   database = firebase.database();
   ref = database.ref('/');
   ref.once('value', getData, err);

}

function draw(){

  linkbase = sel1.value();
  linksymbols = sel2.value();
  completelink = mainlink + linkbase + mainlink2 + linksymbols;

}

async function convertAmount() {

  const convertingvalue = input.value();
  var response = await fetch(completelink);
  var responseJSON = await response.json();
  var rates = responseJSON.rates;
  var base = eval("rates." + linksymbols);
  var answerval = convertingvalue*base;

  createP(answerval);

  input.value('');

  var sent = ref.push(answerval);

}

function getData(data){

  nums = data.val();
  keys = Object.keys(nums);
  for (var i = 0; i < keys.length; i++) {
    allKeys = keys[i];
    ref1 = database.ref('/' + allKeys);
    ref1.on('value', getValue, err);

    function getValue(data) {
      finalvalue = data.val();
      createP(finalvalue);
    }
  }

}

function err(err) {
  console.log(err);
}
