/* Grade 2 Math: eight groups of ten lessons. New lessons have 25 questions each. */
(function(){
  const oldTitles={
    1:"Add and Subtract 2–3 Digit Numbers",2:"Place Value",3:"Time to Five Minutes",4:"Skip Count by 5s and 10s",5:"Word Problems",6:"Memory Match",7:"Speed Challenge"
  };
  const groups=[
    {title:"Place Value and Number Sense",description:"Build numbers, name places, and show their value.",ids:[2,8,9,10,11,12,13,14,15,16]},
    {title:"Comparing and Rounding",description:"Order numbers and use number lines to round.",ids:[17,18,19,20,21,22,23,24,25,26]},
    {title:"Addition and Estimation",description:"Add, subtract, and estimate answers.",ids:[1,27,28,29,30,31,32,33,34,35]},
    {title:"Everyday Math",description:"Use numbers for time, money, shapes, and stories.",ids:[3,5,6,7,36,37,38,39,40,41]},
    {title:"Patterns, Shapes, and Data",description:"Find patterns and read visual information.",ids:[4,42,43,44,45,46,47,48,49,50]},
    {title:"Number Lines to 1,000",description:"Read, compare, and jump on visual number lines.",ids:[51,52,53,54,55,56,57,58,59,60]},
    {title:"Count Forward by Hundreds",description:"See each jump of 100 up to 1,000.",ids:[61,62,63,64,65,66,67,68,69,70]},
    {title:"Write Addition Sentences",description:"Turn picture-supported stories into equations.",ids:[71,72,73,74,75,76,77,78,79,80]}
  ];
  const visualTitles=[
    "Count Forward by 2s","Count Forward by 10s","Count Forward by 100s","Odd or Even with Pairs",
    "Count Shape Sides","Name Quadrilaterals","Read Picture Graphs","Read Bar Graphs",
    "Find Numbers Between on a Number Line","Find the Number Before","Find the Number After","Fill a Missing Number-Line Tick","Count by Tens on a Number Line",
    "Count by Hundreds on a Number Line","Find a Midpoint","Compare Points on a Number Line","Find the Distance Between Points","Make Jumps on a Number Line",
    "Count One Hundred More","Complete a Hundreds Sequence","Fill a Missing Hundred","Count Two Hundreds Forward","Count Three Hundreds Forward",
    "Count to 1,000 by Hundreds","How Many Hundreds?","Match Hundreds Blocks to a Number","Count Hundreds from Zero","Find the Hundred Between",
    "Write an Addition Sentence: Toys","Write an Addition Sentence: Animals","Write an Addition Sentence: Books","Write an Addition Sentence: Sports",
    "Write an Addition Sentence: Garden","Write an Addition Sentence: School","Write an Addition Sentence: Food","Write an Addition Sentence: Travel",
    "Write an Addition Sentence: Collections","Write an Addition Sentence: Community"
  ];
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const math=CURR?.g2?.math;
  if(!math) return;
  const fmt=n=>Number(n).toLocaleString("en-US");
  const image=(svg,alt)=>({src:"data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg),alt});
  const shell=body=>`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="164" viewBox="0 0 720 164"><rect width="720" height="164" rx="18" fill="#f4fbff"/>${body}</svg>`;
  function line(start,step,marked=[]){
    const ticks=Array.from({length:11},(_,i)=>{
      const x=48+i*62.4,n=start+i*step;
      const highlight=marked.includes(n);
      return `<path d="M${x} 67v22" stroke="${highlight?'#06a6bd':'#667784'}" stroke-width="${highlight?5:2}"/><text x="${x}" y="116" text-anchor="middle" font-family="Arial" font-size="17" fill="#24344b">${fmt(n)}</text>${highlight?`<circle cx="${x}" cy="65" r="7" fill="#06a6bd"/>`:''}`;
    }).join("");
    return image(shell(`<path d="M31 78h658m-658 0 14-8m-14 8 14 8m644-8-14-8m14 8-14 8" fill="none" stroke="#72818e" stroke-width="3"/>${ticks}`),`Number line from ${fmt(start)} to ${fmt(start+10*step)}`);
  }
  function hundreds(count){
    const cards=Array.from({length:count},(_,i)=>`<rect x="${36+i*66}" y="42" width="54" height="72" rx="8" fill="#33b4c6" stroke="#087c90" stroke-width="2"/><text x="${63+i*66}" y="88" text-anchor="middle" font-family="Arial" font-size="22" font-weight="bold" fill="white">100</text>`).join("");
    return image(shell(`${cards}<text x="36" y="145" font-family="Arial" font-size="16" fill="#24344b">Each block = 100</text>`),`${count} hundred blocks`);
  }
  function bars(a,b,first,second){
    return image(shell(`<text x="28" y="36" font-family="Arial" font-size="17" fill="#24344b">${first}: ${a}</text><rect x="190" y="17" width="${Math.max(24,a*5)}" height="26" rx="5" fill="#27a8c4"/><text x="28" y="85" font-family="Arial" font-size="17" fill="#24344b">${second}: ${b}</text><rect x="190" y="66" width="${Math.max(24,b*5)}" height="26" rx="5" fill="#f4a340"/><text x="28" y="137" font-family="Arial" font-size="19" font-weight="bold" fill="#24344b">${a} + ${b} = ?</text>`),`${first} ${a}; ${second} ${b}. Add the two amounts.`);
  }
  function pairDots(n){
    const dots=Array.from({length:n},(_,i)=>`<circle cx="${45+(i%13)*49}" cy="${49+Math.floor(i/13)*48}" r="15" fill="${i%2?'#f4a340':'#27a8c4'}"/>`).join("");
    return image(shell(`${dots}<text x="40" y="148" font-family="Arial" font-size="16" fill="#24344b">Make pairs to decide: odd or even?</text>`),`${n} dots for making pairs`);
  }
  function polygon(sides){
    const points=Array.from({length:sides},(_,i)=>`${360+65*Math.cos(2*Math.PI*i/sides-Math.PI/2)},${80+57*Math.sin(2*Math.PI*i/sides-Math.PI/2)}`).join(" ");
    return image(shell(`<polygon points="${points}" fill="#b6e9ed" stroke="#07899c" stroke-width="5"/><text x="360" y="151" text-anchor="middle" font-family="Arial" font-size="17" fill="#24344b">Count the straight sides</text>`),`A shape with ${sides} sides`);
  }
  function choice(index,prompt,answer,step=1,art,explain){
    const values=[answer,answer+step,Math.max(0,answer-step),answer+2*step];
    if(new Set(values).size<4) values[2]=answer+3*step;
    const rotated=values.slice(index%4).concat(values.slice(0,index%4));
    return {type:"mc",q:prompt,choices:rotated.map(fmt),answer:fmt(answer),explain,audio:prompt,image:art};
  }
  function extra(topic,i){
    const step=[2,10,100][topic]||1;
    if(topic<=2){const start=topic===2?100+(i%5)*100:topic===1?10+(i%6)*10:2+(i%12)*2;
      return choice(i,`What comes next: ${fmt(start)}, ${fmt(start+step)}, ${fmt(start+2*step)}, ___?`,start+3*step,step,topic===2?hundreds(Math.min(10,(start+3*step)/100)):line(start,step),`Add ${step} each time.`);}
    if(topic===3){const n=8+i;return {type:"mc",q:`Is ${n} odd or even?`,choices:["Odd","Even"],answer:n%2?"Odd":"Even",explain:`${n} ${n%2?'has one left after making pairs':'can be split into pairs'}.`,image:pairDots(n),audio:`Is ${n} odd or even?`};}
    if(topic===4){const shapes=[["triangle",3],["square",4],["pentagon",5],["hexagon",6]],shape=shapes[i%4];return choice(i,`How many sides does a ${shape[0]} have?`,shape[1],1,polygon(shape[1]),`A ${shape[0]} has ${shape[1]} sides.`);}
    if(topic===5){const sides=[3,4,5,4,6][i%5];const prompt="Is the pictured shape a quadrilateral?";return {type:"mc",q:prompt,choices:["Yes","No"],answer:sides===4?"Yes":"No",explain:`A quadrilateral has four sides; this shape has ${sides}.`,audio:prompt,image:polygon(sides)};}
    const a=3+i%8,b=2+(i*3)%7;
    return topic===6
      ?choice(i,`The picture graph shows ${a} blue and ${b} orange items. How many items are shown?`,a+b,1,bars(a,b,"Blue","Orange"),`${a} + ${b} = ${a+b}.`)
      :choice(i,`The bar graph shows ${a} blue and ${b} orange items. How many more are in the larger group?`,Math.abs(a-b),1,bars(a,b,"Blue","Orange"),`The difference is ${Math.abs(a-b)}.`);
  }
  function numberLine(topic,i){
    const base=100+(i*37)%790,start=Math.floor(base/10)*10,step=topic===4?10:topic===5?100:1;
    const low=step===100?0:step===10?start:Math.min(989,base);
    let a=step===100?(i%7+1)*100:low+2*step,b=step===100?(i%7+3)*100:low+4*step,answer,prompt,art;
    if(topic===0){answer=a+step;prompt=`Which number comes between ${fmt(a)} and ${fmt(a+2*step)}?`;}
    else if(topic===1){answer=a-step;prompt=`Which number is just before ${fmt(a)}?`;}
    else if(topic===2){answer=a+step;prompt=`Which number is just after ${fmt(a)}?`;}
    else if(topic===3){answer=a+step;prompt=`What number belongs on the tick between ${fmt(a)} and ${fmt(a+2*step)}?`;}
    else if(topic===4||topic===5){answer=a+step;prompt=`Count forward by ${step}s from ${fmt(a)}. What is the next number?`;}
    else if(topic===6){answer=a+step;prompt=`What number is halfway between ${fmt(a)} and ${fmt(a+2*step)}?`;}
    else if(topic===7){answer=b;prompt=`Which point is farther right: ${fmt(a)} or ${fmt(b)}?`;}
    else if(topic===8){answer=b-a;prompt=`How far is it from ${fmt(a)} to ${fmt(b)} on this number line?`;}
    else {answer=b;prompt=`Start at ${fmt(a)} and make two jumps of ${step}. Where do you land?`;}
    art=line(low,step,topic===8?[a,b]:[a]);
    return choice(i,prompt,answer,topic===8?1:step,art,`${fmt(a)}${topic===8?` to ${fmt(b)} is ${fmt(answer)} apart`:` plus ${step} each step leads to ${fmt(answer)}`}.`);
  }
  function countHundreds(topic,i){
    const start=(i%7+1)*100,room=1000-start;
    let answer,prompt;
    if(topic===0){answer=start+100;prompt=`What is 100 more than ${fmt(start)}?`;}
    else if(topic===1){answer=start+200;prompt=`Complete the pattern: ${fmt(start)}, ${fmt(start+100)}, ___`;}
    else if(topic===2){answer=start+100;prompt=`Fill the missing hundred: ${fmt(start)}, ___, ${fmt(start+200)}`;}
    else if(topic===3){answer=start+200;prompt=`Count two hundreds forward from ${fmt(start)}.`;}
    else if(topic===4){answer=Math.min(1000,start+300);prompt=`Count ${Math.min(3,room/100)} hundreds forward from ${fmt(start)}.`;}
    else if(topic===5){answer=room/100;prompt=`How many jumps of 100 go from ${fmt(start)} to 1,000?`;}
    else if(topic===6){answer=start/100;prompt=`How many hundreds are in ${fmt(start)}?`;}
    else if(topic===7){answer=start;prompt=`These blocks show ${start/100} hundreds. What number is that?`;}
    else if(topic===8){answer=(i%10+1)*100;prompt=`Count by hundreds from zero to the ${answer/100}${answer/100===1?'st':answer/100===2?'nd':answer/100===3?'rd':'th'} hundred. What number is it?`;}
    else {answer=start+100;prompt=`What hundred comes between ${fmt(start)} and ${fmt(start+200)}?`;}
    const art=topic===6||topic===7||topic===8?hundreds(topic===8?answer/100:start/100):line(0,100,[start]);
    return choice(i,prompt,answer,topic===5||topic===6?1:100,art,`Count in steps of 100. The answer is ${fmt(answer)}.`);
  }
  const stories=[
    ["toy cars","more toy cars"],["birds","more birds"],["books","more books"],["soccer balls","more soccer balls"],
    ["flowers","more flowers"],["pencils","more pencils"],["apples","more apples"],["bus riders","more riders"],
    ["stickers","more stickers"],["cans collected","more cans"]
  ];
  function story(topic,i){
    const [thing,more]=stories[topic],a=12+(i*7+topic*3)%48,b=2+(i*3+topic)%29,sum=a+b;
    const prompt=`A class has ${a} ${thing}. It gets ${b} ${more}. How many does it have now? Write an addition sentence that fits the story (for example, 12 + 3 = 15).`;
    return {type:"input",q:prompt,answer:`${a} + ${b} = ${sum}`,equation:true,explain:`Start with ${a}, add ${b}, and write ${a} + ${b} = ${sum}.`,audio:prompt,image:bars(a,b,"At first","Added")};
  }
  for(let id=43;id<=80;id++){
    const topic=id-43,title=visualTitles[topic];
    const questions=Array.from({length:25},(_,i)=>topic<8?extra(topic,i):topic<18?numberLine(topic-8,i):topic<28?countHundreds(topic-18,i):story(topic-28,i));
    data[`g2:math:L${id}`]={name:title,questions};
    math[`L${id}`]={name:title,gen:classicQuestionPending};
  }
  function renderMenu(){
    const menu=document.querySelector("#g2-math .lesson-columns");
    if(!menu)return;
    menu.replaceChildren();
    menu.dataset.grade2TenLessons="true";
    groups.forEach(group=>{
      const column=document.createElement("section");column.className="lesson-column";
      const heading=document.createElement("h3");heading.textContent=group.title;
      const description=document.createElement("p");description.textContent=group.description;
      column.append(heading,description);
      group.ids.forEach(id=>{
        const button=document.createElement("button");button.type="button";button.className="btn btn-main";
        button.textContent=math[`L${id}`]?.name||oldTitles[id]||`Lesson ${id}`;
        button.onclick=()=>startLesson("g2","math",`L${id}`);
        column.append(button);
      });
      menu.append(column);
    });
    window.decorateLearnMasterIcons?.(menu);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",renderMenu,{once:true});
  else renderMenu();
})();
