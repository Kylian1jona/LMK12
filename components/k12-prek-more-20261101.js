/* Twenty-five picture-led questions in each of sixteen new Pre-K lessons. */
(function(){
  const bank=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  // Each row is a picture or short clue and its answer. Five rounds revisit
  // the skill with a different instruction and a different choice order.
  const lessons=[
    ['prek:eng:opposite-words','Opposite Words',['big','small','up','down','hot','cold','open','closed','wet','dry'],['🐘 big|small','⬆️ up|down','☀️ hot|cold','🚪 open|closed','💧 wet|dry'],['Which word means the opposite of','Find the opposite of','What is the other word for the opposite of','Point to the word that means the opposite of','Choose the word that does not mean']],
    ['prek:eng:animal-babies','Animal Babies',['puppy','kitten','calf','chick','lamb','dog','cat','cow','hen','sheep'],['🐶 dog|puppy','🐱 cat|kitten','🐄 cow|calf','🐔 hen|chick','🐑 sheep|lamb'],['What is the baby of a','A baby of this animal is called what:','Which baby belongs with the','Find the name for a baby','What do we call a baby']],
    ['prek:eng:action-pictures','Action Pictures',['run','sleep','jump','eat','read','sing','swim','dance','draw','clap'],['🏃 running child|run','😴 sleeping child|sleep','🤸 jumping child|jump','🍽️ eating child|eat','📖 reading child|read'],['What is the child doing in','Choose the action in','Which word tells what happens in','Name the action shown by','Point to the action in']],
    ['prek:eng:daily-routines','Daily Routines',['morning','afternoon','evening','night','anytime','sunrise','lunch','dinner','bedtime','playtime'],['🌅 waking up|morning','🥪 eating lunch|afternoon','🌇 eating dinner|evening','🌙 going to sleep|night','🧸 playing with a toy|anytime'],['When might you be','What part of the day fits','Choose the time for','When do many children do this:','Point to the time that matches']],
    ['prek:eng:vowel-pictures','Vowel Picture Sounds',['A','E','I','O','U','B','M','S','T','F'],['🍎 apple|A','🥚 egg|E','🦎 iguana|I','🐙 octopus|O','☂️ umbrella|U'],['Which letter starts','Find the first letter of','What sound begins','Choose the beginning letter of','Point to the first letter in']],
    ['prek:eng:last-sounds','Last Sounds',['T','N','G','P','M','B','D','F','L','S'],['🐱 cat|T','☀️ sun|N','🐶 dog|G','🧢 cap|P','🥁 drum|M'],['What letter ends','Find the last sound in','Which letter comes last in','Listen for the ending sound of','Choose the final letter of']],
    ['prek:eng:story-clues','Picture Story Clues',['park','school','home','farm','beach','store','garden','zoo','library','pool'],['🛝 Maya slides and swings|park','🏫 Lee writes at a desk|school','🏠 Jo cooks in a kitchen|home','🐄 Ana feeds a cow|farm','🏖️ Ben makes a sandcastle|beach'],['Where does this happen:','Find the place in this little story:','Which place fits this clue:','Point to the story setting:','Choose where the child is:']],
    ['prek:eng:community-helpers','Community Helpers',['doctor','teacher','firefighter','mail carrier','chef','farmer','pilot','artist','dentist','builder'],['🩺 helps a sick person|doctor','📚 helps children learn|teacher','🚒 puts out a fire|firefighter','✉️ brings letters|mail carrier','🍳 cooks a meal|chef'],['Who','Which helper','Find the person who','Choose the helper who','Point to the person who']],
    ['prek:math:five-frames','Five Frames',['1','2','3','4','5','0','6','7','8','9'],['●○○○○|1','●●○○○|2','●●●○○|3','●●●●○|4','●●●●●|5'],['How many filled dots are in','Count the dark dots in','Which number matches','How many dots are filled in','Point to the count shown by']],
    ['prek:math:count-six-ten','Count Six to Ten',['6','7','8','9','10','1','2','3','4','5'],['⭐⭐⭐⭐⭐⭐|6','🍎🍎🍎🍎🍎🍎🍎|7','🐟🐟🐟🐟🐟🐟🐟🐟|8','⚽⚽⚽⚽⚽⚽⚽⚽⚽|9','🌼🌼🌼🌼🌼🌼🌼🌼🌼🌼|10'],['How many pictures are here:','Count the objects:','Which number tells the size of this group:','Point to the number of pictures:','Find the count for']],
    ['prek:math:compare-small-groups','Compare Small Groups',['left','right','same','more','fewer','first','second','both','one','none'],['🍎🍎🍎  vs  🍎🍎|left','⭐  vs  ⭐⭐⭐|right','🐟🐟  vs  🐟🐟|same','⚽⚽⚽⚽  vs  ⚽|left','🌼🌼  vs  🌼🌼🌼🌼|right'],['Which side has more, or are they the same, in','Compare the two sides in','Which side has more, or do they match, in','Find the larger group, or choose same, in','Compare these two groups:']],
    ['prek:math:shapes-around-us','Shapes Around Us',['circle','square','triangle','rectangle','oval','star','heart','diamond','cube','line'],['🛞 wheel|circle','🪟 square window|square','🍕 pizza slice|triangle','🚪 door|rectangle','🥚 egg outline|oval'],['What shape is a','Find the shape of a','Which shape looks like a','Choose the shape shown by a','Point to the shape of a']],
    ['prek:math:inside-outside','Inside and Outside',['inside','outside','above','below','beside','behind','between','near','far','under'],['🐱 in a box|inside','🐶 out of the house|outside','🧸 in a basket|inside','🦋 out of the jar|outside','🍎 in a bowl|inside'],['Where is the picture:','Choose the position for','Is this inside or outside:','Point to the word that fits','Where is the object in']],
    ['prek:math:longer-shorter','Longer and Shorter',['longer','shorter','same length','taller','smaller','more','less','wider','narrower','equal'],['━━━━  /  ━━|longer','━  /  ━━━━━|shorter','━━━  /  ━━━|same length','━━━━━  /  ━|longer','━━  /  ━━━━|shorter'],['How is the first line compared with the second:','Compare the first line in','Choose a length word for the first line in','What is true about the first line in','Point to the length of the first line in']],
    ['prek:math:add-one','Add One More',['2','3','4','5','6','1','7','8','9','10'],['🍎 + 🍎|2','⭐⭐ + ⭐|3','🐟🐟🐟 + 🐟|4','⚽⚽⚽⚽ + ⚽|5','🌼🌼🌼🌼🌼 + 🌼|6'],['How many after adding one:','Count the pictures after one more:','What is the new total for','Point to the sum in','Find how many there are in']],
    ['prek:math:take-one-away','Take One Away',['0','1','2','3','4','5','6','7','8','9'],['🍎 − 🍎|0','⭐⭐ − ⭐|1','🐟🐟🐟 − 🐟|2','⚽⚽⚽⚽ − ⚽|3','🌼🌼🌼🌼🌼 − 🌼|4'],['How many remain after one goes away:','Count what is left in','What is one less in','Point to the number left in','Find the result of']]
  ];
  for(const [key,name,domain,rows,openers] of lessons){
    if(bank[key])throw Error(`Duplicate Pre-K lesson: ${key}`);
    const questions=[];
    for(let round=0;round<5;round++)for(let i=0;i<5;i++){
      const [clue,answer]=rows[(i+round*2)%5].split('|');
      const wrong=domain.filter(value=>value!==answer);
      const choices=[answer,wrong[(i+round*2)%wrong.length],wrong[(i+round*2+3)%wrong.length]];
      const shift=(round+i)%3;
      const q=`${openers[round]} ${clue}?`;
      questions.push({type:'mc',q,choices:choices.slice(shift).concat(choices.slice(0,shift)),answer,audio:q,explain:`${clue} goes with ${answer}.`});
    }
    bank[key]={name,contentVersion:'20261101.1',questions};
  }
})();
