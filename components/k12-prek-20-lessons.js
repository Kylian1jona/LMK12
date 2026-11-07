/* Twenty new Pre-K lessons: ten early literacy and ten early math. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const literacy=[
    ['kind-words','Kind Words','Which kind word fits?', ['please','thank you','sorry','hello','goodbye'],[
      ['You ask for a turn with a toy.','please'],['A friend shares a crayon.','thank you'],['You bump into someone by accident.','sorry'],['You meet a new friend.','hello'],['You leave the classroom for the day.','goodbye']]],
    ['story-characters','Story Characters','Who is in the story?', ['fox','rabbit','bear','bird','turtle'],[
      ['A red fox runs through the woods.','fox'],['A rabbit hops to its burrow.','rabbit'],['A bear finds berries by a tree.','bear'],['A bird builds a nest.','bird'],['A turtle walks slowly to a pond.','turtle']]],
    ['story-settings-new','Where Stories Happen','Where does the story happen?', ['park','beach','farm','library','kitchen'],[
      ['Children swing and slide outside.','park'],['Waves wash over the sand.','beach'],['A farmer feeds chickens.','farm'],['Books fill the shelves.','library'],['A family makes soup on the stove.','kitchen']]],
    ['what-happens-next','What Happens Next','What would make sense next?', ['put on shoes','water the seed','dry off','open the book','go to sleep'],[
      ['Sam is ready to go outside but has bare feet.','put on shoes'],['A seed is planted in dry soil.','water the seed'],['Mia comes in from the rain.','dry off'],['A child wants to read a story.','open the book'],['It is bedtime and the lights are off.','go to sleep']]],
    ['face-feelings','Feelings from Clues','How does the child feel?', ['happy','sad','scared','surprised','angry'],[
      ['A child smiles after seeing a friend.','happy'],['A child cries when a toy breaks.','sad'],['A child hides from a loud thunderclap.','scared'],['A child opens a gift and gasps.','surprised'],['A child frowns when someone grabs a toy.','angry']]],
    ['first-next-last','Before and After','Which step fits the clue?', ['wash hands','eat lunch','put on coat','plant seed','read story'],[
      ['Before lunch, the class goes to the sink.','wash hands'],['After washing hands, children sit with their food.','eat lunch'],['Before going into the cold, a child gets dressed.','put on coat'],['Before a flower grows, someone puts a seed in soil.','plant seed'],['After choosing a book, a child opens it.','read story']]],
    ['letters-in-names','First Letters in Words','Which letter starts the word?', ['A','B','C','D','E'],[
      ['Apple begins with this letter.','A'],['Ball begins with this letter.','B'],['Cat begins with this letter.','C'],['Dog begins with this letter.','D'],['Egg begins with this letter.','E']]],
    ['picture-compounds','Two Words Together','Which word do the two parts make?', ['sunflower','toothbrush','rainbow','snowman','bedroom'],[
      ['sun + flower','sunflower'],['tooth + brush','toothbrush'],['rain + bow','rainbow'],['snow + man','snowman'],['bed + room','bedroom']]],
    ['color-clues','Color Clues','Which color fits?', ['red','blue','green','yellow','orange'],[
      ['A ripe strawberry is often this color.','red'],['A clear daytime sky is often this color.','blue'],['Fresh grass is often this color.','green'],['A ripe banana is often this color.','yellow'],['A pumpkin is often this color.','orange']]],
    ['size-clues','Size Clues','Which size word fits?', ['tiny','small','medium','large','huge'],[
      ['An ant is very little.','tiny'],['A mouse is little.','small'],['A house cat is between small and large.','medium'],['A horse is big.','large'],['A whale is very big.','huge']]]
  ];
  const math=[
    ['numbers-eleven-fifteen','Count 11 to 15','How many dots are there?', ['11','12','13','14','15'],[11,12,13,14,15].map(n=>['●'.repeat(n),String(n)])],
    ['numbers-sixteen-twenty','Count 16 to 20','How many dots are there?', ['16','17','18','19','20'],[16,17,18,19,20].map(n=>['●'.repeat(n),String(n)])],
    ['ten-frame-counts','Count a Ten Frame','How many filled spaces are there?', ['2','4','6','8','10'],[2,4,6,8,10].map(n=>['['+'●'.repeat(Math.min(n,5))+'○'.repeat(Math.max(0,5-n))+'] ['+'●'.repeat(Math.max(0,n-5))+'○'.repeat(10-Math.max(n,5))+']',String(n)])],
    ['count-on-from-five','Count On from Five','What number comes next?', ['7','8','9','10','11'],[['5, 6, ?','7'],['6, 7, ?','8'],['7, 8, ?','9'],['8, 9, ?','10'],['9, 10, ?','11']]],
    ['compare-to-ten','Compare Groups to 10','Which side has more, or are they the same?', ['left','right','same','cannot tell'],[['●●●● versus ●●','left'],['●● versus ●●●●●','right'],['●●● versus ●●●','same'],['●●●●●● versus ●●●●','left'],['●●●● versus ●●●●●●','right']]],
    ['three-color-patterns','Three-Color Patterns','Which color comes next?', ['red','blue','yellow','green'],[['🔴 🔵 🟡 🔴 🔵 ?','yellow'],['🔵 🟡 🔴 🔵 🟡 ?','red'],['🟡 🔴 🔵 🟡 🔴 ?','blue'],['🟢 🔴 🔵 🟢 🔴 ?','blue'],['🔴 🟢 🟡 🔴 🟢 ?','yellow']]],
    ['add-within-five','Add Within 5','How many altogether?', ['1','2','3','4','5'],[['● + ●','2'],['●● + ●','3'],['●● + ●●','4'],['●●● + ●●','5'],['● + ●●●','4']]],
    ['take-away-five','Take Away Within 5','How many are left?', ['0','1','2','3','4'],[['● − ●','0'],['●● − ●','1'],['●●● − ●','2'],['●●●● − ●','3'],['●●●●● − ●','4']]],
    ['flat-and-solid-shapes','Flat and Solid Shapes','Which shape fits the clue?', ['circle','square','triangle','cube','sphere'],[['A round flat drawing.','circle'],['A flat shape with four equal sides.','square'],['A flat shape with three sides.','triangle'],['A solid block with six square faces.','cube'],['A solid round ball shape.','sphere']]],
    ['measure-with-blocks','Measure with Blocks','How many blocks long is this strip?', ['2','3','4','5','6'],[2,3,4,5,6].map(n=>['🟦'.repeat(n),String(n)])]
  ];
  const contexts=['','Look closely. ','Try this picture clue. ','Think about the example. ','Use the clue to decide. '];
  function addLesson(subject,entry){
    const [slug,name,ask,options,rows]=entry;
    const key=`prek:${subject}:${slug}`;
    if(bank[key]) throw Error(`Duplicate Pre-K lesson: ${key}`);
    const questions=[];
    for(let round=0;round<5;round++) for(let index=0;index<5;index++){
      const [clue,answer]=rows[(index+round)%5];
      const q=`${contexts[round]}${clue} ${ask}`;
      const wrong=options.filter(option=>option!==answer);
      const choices=[answer,...wrong.slice((index+round)%wrong.length).concat(wrong).slice(0,Math.min(3,wrong.length))];
      const shift=(round+index)%choices.length;
      questions.push({type:'mc',q,choices:choices.slice(shift).concat(choices.slice(0,shift)),answer,audio:q,explain:`${clue} The answer is ${answer}.`});
    }
    bank[key]={name,contentVersion:'20261107.1',questions};
  }
  literacy.forEach(entry=>addLesson('eng',entry));
  math.forEach(entry=>addLesson('math',entry));
})();
