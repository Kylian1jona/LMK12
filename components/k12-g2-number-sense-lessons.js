/* Grade 2 number-sense expansion: 25 focused lessons with 25 questions each. */
(function(){
  const groups=[
    {title:"Place Value",lessons:[
      "Place Value Names up to Ten Thousands","Value of a Digit up to Ten Thousands","Convert To and From a Number","Convert Between Place Values","Standard and Expanded Form","Regroup Thousands, Hundreds, Tens, and Ones","Place Value Word Problems","Even or Odd","Guess the Number"
    ]},
    {title:"Comparing and Ordering",lessons:[
      "Compare and Order Numbers Using Number Lines","Compare Numbers","Greatest or Least Number","Order Numbers","Make the Largest or Smallest Number","Ordering Puzzles"
    ]},
    {title:"Rounding",lessons:[
      "Round Using a Number Line","Round to the Nearest Ten or Hundred","Round Numbers in a Table","Rounding Puzzles"
    ]},
    {title:"Estimate Sums",lessons:[
      "Estimate Sums by Rounding up to 1,000","Estimate Sums Using Compatible Numbers","Estimate Sums in Word Problems"
    ]},
    {title:"Estimate Differences",lessons:[
      "Estimate Differences by Rounding up to 1,000","Estimate Differences Using Compatible Numbers","Estimate Differences in Word Problems"
    ]}
  ];
  const titles=groups.flatMap(group=>group.lessons);
  const firstLesson=8;
  const placeNames=["ten-thousands","thousands","hundreds","tens","ones"];
  const placeValues=[10000,1000,100,10,1];

  function format(value){ return Number(value).toLocaleString("en-US"); }
  function rotate(values,index){
    const unique=values.map(String).filter((value,position,list)=>value.trim()&&list.indexOf(value)===position);
    if(unique.length<4) throw new Error(`Four distinct choices are required: ${values.join(" | ")}`);
    const choices=unique.slice(0,4),shift=index%4;
    return choices.slice(shift).concat(choices.slice(0,shift));
  }
  function mc(index,q,answer,wrongs,explain){
    const answerText=String(answer);
    return {type:"mc",q,choices:rotate([answerText,...wrongs.filter(value=>String(value)!==answerText)],index),answer:answerText,explain,audio:q};
  }
  function numeric(index,q,answer,step,explain){
    const value=Number(answer),gap=Math.max(1,Number(step)||1);
    return mc(index,q,format(value),[format(value+gap),format(value+gap*2),format(value+gap*3)],explain);
  }
  function numberFor(index){ return 10000+((index*3179+2468)%89999); }
  function digitAt(number,place){ return Math.floor(number/place)%10; }
  function expanded(number){
    return placeValues.map(place=>Math.floor(number/place)%10*place).filter(Boolean).map(format).join(" + ")||"0";
  }
  function wordsUnder1000(number){
    const ones=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    const tens=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    if(number<20) return ones[number];
    if(number<100) return `${tens[Math.floor(number/10)]}${number%10?`-${ones[number%10]}`:""}`;
    return `${ones[Math.floor(number/100)]} hundred${number%100?` ${wordsUnder1000(number%100)}`:""}`;
  }
  function numberWords(number){
    if(number<1000) return wordsUnder1000(number);
    return `${wordsUnder1000(Math.floor(number/1000))} thousand${number%1000?` ${wordsUnder1000(number%1000)}`:""}`;
  }
  function roundTo(number,place){ return Math.round(number/place)*place; }
  function roundChoices(answer,place){
    return [answer+place,Math.max(0,answer-place),answer+place*2].map(format);
  }

  function questionFor(topic,index){
    const number=numberFor(index),place=placeValues[index%5],digit=digitAt(number,place);
    if(topic===0){
      const answer=placeNames[index%5];
      return mc(index,`In ${format(number)}, what place is the digit ${digit} in?`,answer,placeNames.filter(name=>name!==answer),`The digit ${digit} is in the ${answer} place.`);
    }
    if(topic===1){
      const answer=digit*place;
      const values=[place,place*2,place*3,place*4,place*5].filter(value=>value!==answer);
      return mc(index,`What is the value of the digit ${digit} in ${format(number)}?`,format(answer),values.map(format),`${digit} in the ${placeNames[index%5]} place has a value of ${format(answer)}.`);
    }
    if(topic===2){
      const answer=index%2===0?numberWords(number):format(number);
      const q=index%2===0?`Which is the word form of ${format(number)}?`:`Which standard-form number is ${numberWords(number)}?`;
      const wrong=index%2===0?[numberWords(number+1000),numberWords(number+100),numberWords(number+10)]:[format(number+1000),format(number+100),format(number+10)];
      return mc(index,q,answer,wrong,`Both forms represent ${format(number)}.`);
    }
    if(topic===3){
      const conversions=[["thousands","hundreds",10],["hundreds","tens",10],["tens","ones",10],["ten-thousands","thousands",10]];
      const [from,to,factor]=conversions[index%4],amount=index+1,reverse=index%2===1;
      const answer=reverse?amount:amount*factor;
      const fromLabel=amount===1?from.replace(/s$/,''):from;
      const q=reverse?`${amount*factor} ${to} are equal to how many ${from}?`:`${amount} ${fromLabel} are equal to how many ${to}?`;
      return numeric(index,q,answer,reverse?1:10,reverse?`Every ${factor} ${to} make 1 ${from}.`:`Each ${from} contains ${factor} ${to}.`);
    }
    if(topic===4){
      const answer=index%2===0?expanded(number):format(number);
      const q=index%2===0?`Which is the expanded form of ${format(number)}?`:`What number is ${expanded(number)}?`;
      const wrong=index%2===0?[expanded(number+1000),expanded(number+100),expanded(number+10)]:[format(number+1000),format(number+100),format(number+10)];
      return mc(index,q,answer,wrong,`${format(number)} equals ${expanded(number)}.`);
    }
    if(topic===5){
      const thousands=index%7+2,hundreds=(index*3)%10,tens=(index*5)%10,ones=(index*7)%10;
      const answer=thousands*1000+hundreds*100+tens*10+ones;
      const regroupThousands=thousands-1,regroupHundreds=hundreds+10;
      const thousandsLabel=regroupThousands===1?"thousand":"thousands";
      const correct=`${regroupThousands} ${thousandsLabel} + ${regroupHundreds} hundreds + ${tens} tens + ${ones} ones`;
      return mc(index,`Which regrouping is another way to make ${format(answer)}?`,correct,[`${thousands} thousands + ${hundreds+10} hundreds + ${tens} tens + ${ones} ones`,`${regroupThousands} thousands + ${hundreds} hundreds + ${tens+10} tens + ${ones} ones`,`${regroupThousands} thousands + ${regroupHundreds} hundreds + ${tens} tens + ${ones+1} ones`],`One thousand was regrouped as 10 hundreds, so the value stays ${format(answer)}.`);
    }
    if(topic===6){
      const boxes=index%8+2,each=1000,loose=(index*137)%900+50,answer=boxes*each+loose;
      return numeric(index,`A school has ${boxes} boxes of 1,000 counters and ${loose} loose counters. How many counters are there?`,answer,100,`${boxes} thousands plus ${loose} equals ${format(answer)}.`);
    }
    if(topic===7){
      const value=(index*137+42)%9999,answer=value%2===0?"even":"odd";
      return mc(index,`Is ${format(value)} even or odd?`,answer,[answer==="even"?"odd":"even","both even and odd","neither even nor odd"],`The ones digit is ${value%10}, so ${format(value)} is ${answer}.`);
    }
    if(topic===8){
      const target=1200+index*137,thousands=Math.floor(target/1000),ones=target%10;
      const tens=digitAt(target,10);
      return mc(index,`I am between ${format(target-20)} and ${format(target+20)}. My thousands digit is ${thousands}, my tens digit is ${tens}, and my ones digit is ${ones}. Which number am I?`,format(target),[format(target-10),format(target+10),format(target+100)],`Only ${format(target)} satisfies every clue.`);
    }
    if(topic===9){
      const left=500+index*83,right=left+(index%9+1)*10;
      return mc(index,`On a number line, ${format(left)} is left of ${format(right)}. Which comparison is true?`,`${format(left)} < ${format(right)}`,[`${format(left)} > ${format(right)}`,`${format(left)} = ${format(right)}`,`${format(right)} < ${format(left)}`],`Numbers increase as you move right on a number line.`);
    }
    if(topic===10){
      const left=number,right=number+(index%2===0?index+7:-(index+7)),symbol=left>right?">":"<";
      return mc(index,`Which symbol makes ${format(left)} __ ${format(right)} true?`,symbol,[symbol===">"?"<":">","=","not enough information"],`${format(left)} ${symbol} ${format(right)}.`);
    }
    if(topic===11){
      const values=[number,number+137,number-83,number+51],greatest=index%2===0,answer=greatest?Math.max(...values):Math.min(...values);
      return mc(index,`Which number is ${greatest?"greatest":"least"}: ${values.map(format).join(", ")}?`,format(answer),values.filter(value=>value!==answer).map(format),`Comparing from the highest place shows ${format(answer)} is ${greatest?"greatest":"least"}.`);
    }
    if(topic===12){
      const values=[number,number+137,number-83,number+51],ascending=index%2===0,sorted=[...values].sort((a,b)=>ascending?a-b:b-a),answer=sorted.map(format).join(", ");
      const wrong=[[...sorted].reverse(),[sorted[0],sorted[2],sorted[1],sorted[3]],[sorted[1],sorted[0],sorted[2],sorted[3]]].map(items=>items.map(format).join(", "));
      return mc(index,`Which list orders the numbers from ${ascending?"least to greatest":"greatest to least"}: ${values.map(format).join(", ")}?`,answer,wrong,`Compare ten-thousands first, then thousands, hundreds, tens, and ones.`);
    }
    if(topic===13){
      const digits=[1+Math.floor(index/9),4+Math.floor((index%9)/3),7+index%3,0],largest=index%2===0;
      const ordered=[...digits].sort((a,b)=>largest?b-a:a-b);
      if(!largest&&ordered[0]===0){ const firstNonzero=ordered.findIndex(value=>value!==0); [ordered[0],ordered[firstNonzero]]=[ordered[firstNonzero],ordered[0]]; }
      const answer=Number(ordered.join(""));
      const wrong=[[...ordered].reverse(),[ordered[0],ordered[2],ordered[1],ordered[3]],[ordered[1],ordered[0],ordered[2],ordered[3]]].map(items=>Number(items.join("")));
      return mc(index,`Using each digit once (${digits.join(", ")}), what is the ${largest?"largest":"smallest"} possible number?`,format(answer),wrong.map(format),`Place the ${largest?"largest":"smallest"} available digit first, then continue in order.`);
    }
    if(topic===14){
      const a=1000+index*41,b=a+20,c=b+30,d=c+40;
      return mc(index,`A is ${format(a)}. B is greater than A but less than C. C is ${format(c)}. D is greater than C. Which order is possible from least to greatest?`,`A, B, C, D`,["D, C, B, A","A, C, B, D","B, A, D, C"],`The clues require A < B < C < D.`);
    }
    if(topic===15){
      const roundingPlace=index%2===0?10:100,value=roundingPlace===10?125+index*17:1250+index*83,lower=Math.floor(value/roundingPlace)*roundingPlace,upper=lower+roundingPlace,answer=roundTo(value,roundingPlace);
      return mc(index,`${format(value)} lies between ${format(lower)} and ${format(upper)} on a number line. Which endpoint does it round to? Remember that a halfway value rounds up.`,format(answer),[format(answer===lower?upper:lower),format(value),format(answer+roundingPlace*2)],`${format(value)} rounds to ${format(answer)}.`);
    }
    if(topic===16){
      const roundingPlace=index%2===0?10:100,value=roundingPlace===10?214+index*19:1214+index*97,answer=roundTo(value,roundingPlace);
      return mc(index,`Round ${format(value)} to the nearest ${roundingPlace===10?"ten":"hundred"}.`,format(answer),roundChoices(answer,roundingPlace),`The digit to the right tells us to round to ${format(answer)}.`);
    }
    if(topic===17){
      const roundingPlace=index%2===0?10:100,a=237+index*21,b=464+index*17,ra=roundTo(a,roundingPlace),rb=roundTo(b,roundingPlace),answer=`${format(a)} -> ${format(ra)}; ${format(b)} -> ${format(rb)}`;
      return mc(index,`Which table row correctly rounds ${format(a)} and ${format(b)} to the nearest ${roundingPlace===10?"ten":"hundred"}?`,answer,[`${format(a)} -> ${format(ra+roundingPlace)}; ${format(b)} -> ${format(rb)}`,`${format(a)} -> ${format(ra)}; ${format(b)} -> ${format(rb+roundingPlace)}`,`${format(a)} -> ${format(ra+roundingPlace)}; ${format(b)} -> ${format(rb+roundingPlace)}`],`The correct rounded values are ${format(ra)} and ${format(rb)}.`);
    }
    if(topic===18){
      const base=(index+2)*100,answer=base+(index%2===0?43:57),place=index%2===0?100:10,target=roundTo(answer,place);
      const options=[answer,answer+place,Math.max(0,answer-place),answer+place*2];
      return mc(index,`Which number rounds to ${format(target)} when rounded to the nearest ${place===100?"hundred":"ten"}?`,format(answer),options.filter(value=>roundTo(value,place)!==target).map(format).concat([format(answer+place*3),format(Math.max(0,answer-place*2))]),`${format(answer)} rounds to ${format(target)}.`);
    }
    if(topic===19){
      const a=120+index*12,b=210+index*11,ra=roundTo(a,100),rb=roundTo(b,100),answer=ra+rb;
      return mc(index,`Estimate ${format(a)} + ${format(b)} by rounding each addend to the nearest hundred.`,format(answer),roundChoices(answer,100),`${format(a)} rounds to ${format(ra)} and ${format(b)} rounds to ${format(rb)}; their sum is about ${format(answer)}.`);
    }
    if(topic===20){
      const a=200+index*50,b=300+index*50,offset=index%8+2,answer=a+b;
      return mc(index,`Use compatible numbers to estimate ${format(a-offset)} + ${format(b+offset)}.`,format(answer),[format(answer+50),format(answer-50),format(answer+100)],`${format(a)} and ${format(b)} are nearby compatible numbers, and they total ${format(answer)}.`);
    }
    if(topic===21){
      const red=130+index*17,blue=240+index*13,rr=roundTo(red,100),rb=roundTo(blue,100),answer=rr+rb;
      return mc(index,`A library counted ${red} visits on Monday and ${blue} on Tuesday. About how many visits were there in all? Round to the nearest hundred.`,format(answer),roundChoices(answer,100),`${red} is about ${format(rr)} and ${blue} is about ${format(rb)}, so the total is about ${format(answer)}.`);
    }
    if(topic===22){
      const larger=650+index*13,smaller=120+index*8,rl=roundTo(larger,100),rs=roundTo(smaller,100),answer=rl-rs;
      return mc(index,`Estimate ${format(larger)} - ${format(smaller)} by rounding each number to the nearest hundred.`,format(answer),roundChoices(answer,100),`${format(larger)} is about ${format(rl)} and ${format(smaller)} is about ${format(rs)}; the estimated difference is ${format(answer)}.`);
    }
    if(topic===23){
      const larger=800+index*50,smaller=300+index*20,offset=index%8+2,answer=larger-smaller;
      return mc(index,`Use compatible numbers to estimate ${format(larger+offset)} - ${format(smaller-offset)}.`,format(answer),[format(answer+50),format(answer-50),format(answer+100)],`${format(larger)} and ${format(smaller)} are nearby compatible numbers; their difference is ${format(answer)}.`);
    }
    const total=780+index*17,used=220+index*9,rt=roundTo(total,100),ru=roundTo(used,100),answer=rt-ru;
    return mc(index,`A food drive collected ${total} cans and gave away ${used}. About how many cans remain? Round to the nearest hundred.`,format(answer),roundChoices(answer,100),`${total} is about ${format(rt)} and ${used} is about ${format(ru)}, leaving about ${format(answer)} cans.`);
  }

  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const math=CURR?.g2?.math;
  if(!math) return;
  titles.forEach((title,topic)=>{
    const lesson=`L${firstLesson+topic}`;
    const questions=Array.from({length:25},(_,index)=>questionFor(topic,index));
    data[`g2:math:${lesson}`]={name:title,questions};
    math[lesson]={name:title,gen:classicQuestionPending};
  });

  function renderButtons(){
    const columns=document.querySelector("#g2-math .lesson-columns");
    if(!columns||columns.dataset.numberSenseAdded==="true") return;
    columns.dataset.numberSenseAdded="true";
    let topic=0;
    groups.forEach(group=>{
      const column=document.createElement("div");
      column.className="lesson-column";
      const heading=document.createElement("h3");
      heading.textContent=group.title;
      const note=document.createElement("p");
      note.textContent="Practice with 25 focused questions.";
      column.append(heading,note);
      group.lessons.forEach(title=>{
        const lesson=`L${firstLesson+topic++}`;
        const button=document.createElement("button");
        button.type="button";
        button.className="btn btn-main";
        button.textContent=title;
        button.onclick=()=>startLesson("g2","math",lesson);
        column.appendChild(button);
      });
      columns.appendChild(column);
    });
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",renderButtons,{once:true});
  else renderButtons();
})();
