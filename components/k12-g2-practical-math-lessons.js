/* Ten Grade 2 math lessons, each with 25 checked, four-choice questions. */
(function(){
  const lessons=[
    ["Add Within 100","Addition and Subtraction"],
    ["Subtract Within 100","Addition and Subtraction"],
    ["Two-Step Story Problems","Addition and Subtraction"],
    ["Count Coins","Money and Time"],
    ["Make a Dollar","Money and Time"],
    ["Tell Time to Five Minutes","Money and Time"],
    ["Measure and Compare Lengths","Shapes, Measurement, and Data"],
    ["Shape Attributes","Shapes, Measurement, and Data"],
    ["Read Picture Graphs","Shapes, Measurement, and Data"],
    ["Equal Groups","Shapes, Measurement, and Data"]
  ];
  function question(topic,index){
    const n=index+1;
    let q,answer,explain,step=1;
    switch(topic){
      case 0:{const a=18+n,b=12+(n*3)%35;answer=a+b;q=`What is ${a} + ${b}?`;explain=`Add the tens and ones to get ${answer}.`;break;}
      case 1:{const a=60+n,b=12+(n*2)%32;answer=a-b;q=`What is ${a} − ${b}?`;explain=`Subtract ${b} from ${a} to get ${answer}.`;break;}
      case 2:{const start=20+n,added=4+n%11,used=2+n%5;answer=start+added-used;q=`A class has ${start} pencils. It gets ${added} more and uses ${used}. How many pencils are left?`;explain=`First add ${added}, then subtract ${used}: ${answer} pencils.`;break;}
      case 3:{const quarters=1+n%3,dimes=1+(n*2)%4,nickels=n%2;answer=quarters*25+dimes*10+nickels*5;q=`How many cents are ${quarters} quarter${quarters===1?'':'s'}, ${dimes} dime${dimes===1?'':'s'}, and ${nickels} nickel${nickels===1?'':'s'} worth?`;explain=`Count 25 cents per quarter, 10 per dime, and 5 per nickel: ${answer} cents.`;step=5;break;}
      case 4:{const saved=25+(n%3)*25;answer=100-saved;q=`You have ${saved} cents. How many more cents make one dollar?`;explain=`One dollar is 100 cents, and 100 − ${saved} = ${answer}.`;step=25;break;}
      case 5:{const hour=1+n%11,minute=(n%12)*5;answer=minute;q=`The clock shows ${hour}:${String(minute).padStart(2,'0')}. How many minutes past ${hour} is it?`;explain=`Each number on the clock is five minutes, so it is ${minute} minutes past ${hour}.`;step=5;break;}
      case 6:{const first=10+n,second=4+n%7;answer=first-second;q=`A ribbon is ${first} centimeters long. Another is ${second} centimeters long. How many centimeters longer is the first ribbon?`;explain=`Compare the lengths by subtracting: ${first} − ${second} = ${answer} centimeters.`;break;}
      case 7:{const shapes=[["triangle",3],["square",4],["pentagon",5],["hexagon",6]],chosen=shapes[index%4];answer=chosen[1];q=`How many straight sides does a ${chosen[0]} have?`;explain=`A ${chosen[0]} has ${answer} straight sides.`;break;}
      case 8:{const apples=3+n%6,pears=2+(n*2)%5;answer=apples+pears;q=`A picture graph shows ${apples} apples and ${pears} pears. Each picture means one fruit. How many fruits are shown?`;explain=`Add the pictures: ${apples} + ${pears} = ${answer}.`;break;}
      default:{const groups=2+n%4,each=2+(n*2)%5;answer=groups*each;q=`There are ${groups} equal groups with ${each} blocks in each group. How many blocks are there in all?`;explain=`Count ${each} blocks ${groups} times to get ${answer}.`;break;}
    }
    const values=[answer,answer+step,answer+2*step,Math.max(0,answer-step)];
    if(new Set(values).size<4) values[3]=answer+3*step;
    const choices=values.map(String),shift=index%4;
    return {type:"mc",q,choices:choices.slice(shift).concat(choices.slice(0,shift)),answer:String(answer),explain,audio:q};
  }
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const math=CURR?.g2?.math;
  if(!math) return;
  lessons.forEach(([name],topic)=>{
    const key=`L${33+topic}`;
    data[`g2:math:${key}`]={name,questions:Array.from({length:25},(_,index)=>question(topic,index))};
    math[key]={name,gen:classicQuestionPending};
  });
  function addMenu(){
    const menu=document.querySelector("#g2-math .lesson-columns");
    if(!menu || menu.querySelector('[data-practical-math="true"]')) return;
    [...new Set(lessons.map(([,group])=>group))].forEach(group=>{
      const column=document.createElement("div");
      column.className="lesson-column";
      column.dataset.practicalMath="true";
      const heading=document.createElement("h3");heading.textContent=group;
      const description=document.createElement("p");description.textContent="25 questions in each lesson.";
      column.append(heading,description);
      lessons.forEach(([name,category],topic)=>{
        if(category!==group) return;
        const button=document.createElement("button");button.type="button";button.className="btn btn-main";button.textContent=name;
        button.onclick=()=>startLesson("g2","math",`L${33+topic}`);
        column.append(button);
      });
      menu.append(column);
    });
    window.decorateLearnMasterIcons?.(menu);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",addMenu,{once:true});
  else addMenu();
})();
