import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
//https://www.npmjs.com/package/react-json-pretty
import JSONPretty from 'react-json-pretty';
import JSONPrettyMon from 'react-json-pretty/dist/monikai';
//import 'react-json-pretty/themes/monikai.css';

function readableDays(days){
  var week = 7;
  var month = 30;
  var year = 365;

  var result = "";
  var t = "";
  if(days>=365){
    t = days/365;
    result = `${t} y`;
  }else if(days>=month){
    t = days/month;
    result = `${t} m`
  }else if(days>=week){
    t = days/week;
    result = `${t} w`;
  } else {
    result =`${days} d`;
  }
  return result;
}

function readableNumber(number){

  var hundred = 100;
  var thousand = 10 * hundred;
  var lakh = 100 * thousand;
  var crore = 100 * lakh;

  var result ="";
  var temp = "";
  if(number >=crore){
    temp = number /crore;
    result = `${temp} cr`;
  }else if(number >=lakh){
    temp = number / lakh;
    result = `${temp} l`;
  }else if (number >= thousand){
    temp = number /thousand;
    result = `${temp} k`;
  }else {
    result = number;
  }
  return result;
}

function getWaitingDays(moneyNeeded, initialSadkah, returnMultiplier, returnInDays){
  // debugger;
  var amount = initialSadkah;
  var count = 0;

  var cycles = [];

  for(var i=0; amount<moneyNeeded;i++, count++){
    var cycle = { count: count+1, 
      // wait: (count+1) * returnInDays, 
      wait: readableDays((count+1) * returnInDays), 
      //readableDays
     // start: amount
     start: readableNumber(amount),
    };
    amount = amount *  returnMultiplier;
    // cycle.end=amount;
    cycle.end = readableNumber(amount);

    cycles.push(cycle);
    
  }
  // return {count, waintingDays: count * returnInDays , amount}
  // return count * returnInDays;
  return {count, waintingDays: count * returnInDays , amount, initialSadkah, returnMultiplier, returnInDays, cycles};
}

function App() {
  // var donateAmount = 1;
  /// allah ak vaada on sadkah
  var returnMultiplier = 10 ;
  // allah return in days
  var [returnInDays, setReturnInDays] = useState(30) ;// 3, 5, 7, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 365 
  // var [donateAmount, setDonateAmount] = useState(1);
  var lakh = 100000;
  var crore = 100 *lakh;
  var [moneyNeeded, setMoneyNeeded] = useState(1* crore);//1cr, 10 cr, 100cr, 1000cr, 10k cr, 1l cr,10l cr
  var [initialSadkah, setInitialSadkah] = useState(100); // initial sadkah amount
  return (
    <div className="App">
      <h1>10 Times</h1>

      {/* <p>Donated Amount : {donateAmount}</p> */}
      {/* <input type="number" value={donateAmount} onChange = {e=>setDonateAmount(e.target.value)}/> <br/> */}
      <p>Allah ka vaada sadka badala {returnMultiplier} times</p>
      <p>
        Allah will return in days <input type="number" value={returnInDays} onChange={e=>setReturnInDays(e.target.value)}/>
      </p>
      {/* <p>Allh will give  {donateAmount * returnMultiplier} </p> */}
      <hr/>
      <p>How much money you needed? 
          <input type="number" value={moneyNeeded} onChange={e=>setMoneyNeeded(parseInt(e.target.value))}/> <br/>
           
      </p>
      
      <p>Give Sadkah amount = {moneyNeeded/returnMultiplier}</p>
      <hr/>
      <p>How much money you have for sadkah initial ? 
        <input type="number" value={initialSadkah} onchange={e=>setInitialSadkah(e.target.value)}/> <br/>
      </p>
      <p>How many days you have to wait? {JSON.stringify(getWaitingDays(moneyNeeded, initialSadkah, returnMultiplier, returnInDays))}</p>
      <hr/>
      <JSONPretty 
        data={getWaitingDays(moneyNeeded, initialSadkah, returnMultiplier, returnInDays)} 
        theme={JSONPrettyMon}></JSONPretty>
    </div>
  );
}

export default App;
