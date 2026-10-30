/* Grade 1 standard multiple-choice practice: five Math and five Science lessons. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  function question(prompt,answer,distractors,index){
    const correct=String(answer);
    const options=[correct,...distractors.map(String).filter(value=>value!==correct)];
    const unique=[...new Set(options)].slice(0,4);
    const offset=index%unique.length;
    return {type:"mc",q:prompt,audio:prompt,choices:unique.slice(offset).concat(unique.slice(0,offset)),answer:correct};
  }
  function numberQuestion(prompt,answer,index,limit=120){
    const wrong=[answer-2,answer-1,answer+1,answer+2,answer+10]
      .filter(value=>value>=0&&value<=limit&&value!==answer);
    return question(prompt,answer,wrong,index);
  }
  function addBank(key,name,makeQuestion){
    if(banks[key]) throw Error(`Duplicate Grade 1 lesson: ${key}`);
    banks[key]={name,questions:Array.from({length:25},(_,index)=>makeQuestion(index))};
  }

  addBank("g1:math:number-neighbors","Numbers Before and After",index=>{
    const number=12+index*4;
    const before=index%2===0;
    return numberQuestion(`What number comes ${before?"just before":"just after"} ${number}?`,number+(before?-1:1),index);
  });
  addBank("g1:math:number-bonds","Number Bonds to 20",index=>{
    const whole=8+Math.floor(index/2);
    const known=1+index%(whole-1);
    return numberQuestion(`${known} + __ = ${whole}. What is the missing part?`,whole-known,index,20);
  });
  const storyThings=["stickers","crayons","blocks","shells","apples","marbles","books","toy cars","buttons","flowers","pencils","beads","stars","cards","cookies","pebbles","balloons","paper clips","leaves","coins","cups","spoons","paintbrushes","ribbons","seeds"];
  addBank("g1:math:addition-stories","Addition Story Problems",index=>{
    const first=2+index%9,more=1+(index*2)%8;
    return numberQuestion(`A child has ${first} ${storyThings[index]} and gets ${more} more. How many ${storyThings[index]} are there now?`,first+more,index,20);
  });
  addBank("g1:math:subtraction-stories","Subtraction Story Problems",index=>{
    const first=8+index%12,used=1+(index*3)%(first-1);
    return numberQuestion(`There are ${first} ${storyThings[index]}. ${used} are put away. How many are left?`,first-used,index,20);
  });
  addBank("g1:math:coin-totals","Count Coins",index=>{
    const dimes=index%3,nickels=(index*2)%4,pennies=(index*3)%5;
    const total=dimes*10+nickels*5+pennies;
    return numberQuestion(`How many cents are ${dimes} ${dimes===1?"dime":"dimes"}, ${nickels} ${nickels===1?"nickel":"nickels"}, and ${pennies} ${pennies===1?"penny":"pennies"} worth altogether?`,total,index,50);
  });

  const coverings=[
    ["cat","fur"],["eagle","feathers"],["goldfish","scales"],["turtle","shell"],["dog","fur"],
    ["robin","feathers"],["salmon","scales"],["snail","shell"],["rabbit","fur"],["duck","feathers"],
    ["trout","scales"],["clam","shell"],["fox","fur"],["owl","feathers"],["lizard","scales"],
    ["crab","shell"],["bear","fur"],["penguin","feathers"],["snake","scales"],["lobster","shell"],
    ["sheep","fur"],["sparrow","feathers"],["carp","scales"],["oyster","shell"],["mouse","fur"]
  ];
  addBank("g1:sci:animal-coverings","Animal Body Coverings",index=>{
    const [animal,covering]=coverings[index];
    return question(`What covers most of a ${animal}'s body?`,covering,["fur","feathers","scales","shell"],index);
  });
  const youngAnimals=[
    ["cat","kitten"],["dog","puppy"],["cow","calf"],["horse","foal"],["sheep","lamb"],
    ["goat","kid"],["chicken","chick"],["duck","duckling"],["pig","piglet"],["frog","tadpole"],
    ["butterfly","caterpillar"],["kangaroo","joey"],["deer","fawn"],["bear","cub"],["lion","cub"],
    ["tiger","cub"],["elephant","calf"],["whale","calf"],["goose","gosling"],["turkey","poult"],
    ["swan","cygnet"],["rabbit","kit"],["fox","kit"],["seal","pup"],["penguin","chick"]
  ];
  const youngChoices=["kitten","puppy","calf","foal","lamb","kid","chick","duckling","piglet","tadpole","caterpillar","joey","fawn","cub","gosling","poult","cygnet","kit","pup"];
  addBank("g1:sci:animal-young","Young Animals",index=>{
    const [animal,young]=youngAnimals[index];
    const wrong=Array.from({length:3},(_,offset)=>youngChoices[(index*3+offset+2)%youngChoices.length]);
    return question(`What is a young ${animal} called?`,young,wrong,index);
  });
  const magnetObjects=[
    ["iron nail",true],["wooden spoon",false],["steel paper clip",true],["plastic cup",false],["iron screw",true],
    ["rubber band",false],["steel washer",true],["glass marble",false],["iron key",true],["paper card",false],
    ["steel safety pin",true],["cotton ball",false],["iron bolt",true],["wooden block",false],["steel thumbtack",true],
    ["plastic ruler",false],["iron chain link",true],["ceramic mug",false],["steel binder clip",true],["pencil eraser",false],
    ["iron gate latch",true],["fabric sock",false],["steel staple",true],["rock",false],["iron frying pan",true]
  ];
  addBank("g1:sci:magnet-test","What Magnets Attract",index=>{
    const [object,attracted]=magnetObjects[index];
    return question(`Would a magnet attract a ${object}?`,attracted?"Yes, it attracts the object.":"No, it does not attract the object.",
      ["Yes, it attracts the object.","No, it does not attract the object.","The object turns into a magnet."],index);
  });
  const waterChanges=[
    ["Water is placed in a freezer overnight.","It freezes into ice."],["An ice cube sits in a warm room.","It melts into liquid water."],
    ["A wet sidewalk dries in the sun.","Liquid water evaporates into the air."],["Water vapor touches a cold window.","It forms liquid drops."],
    ["A puddle freezes on a cold night.","It becomes solid ice."],["Snow is brought into a warm house.","It melts into liquid water."],
    ["A wet shirt dries on a clothesline.","Water evaporates into the air."],["Drops appear outside a cold glass.","Water vapor forms liquid drops."],
    ["Liquid water is cooled below freezing.","It becomes solid ice."],["A frozen pond warms in spring.","The ice melts into water."],
    ["A damp towel dries outside.","Water evaporates into the air."],["Steam meets a cool mirror.","It forms liquid drops."],
    ["An ice tray stays in the freezer.","The water freezes into ice."],["An icicle warms in sunlight.","It melts into liquid water."],
    ["A small puddle disappears on a hot day.","Water evaporates into the air."],["A cold lid is held above warm water.","Water vapor forms liquid drops."],
    ["A cup of water is left outside below freezing.","It becomes solid ice."],["Ice chips are put in warm soup.","They melt into liquid water."],
    ["Rainwater on a bench dries.","Water evaporates into the air."],["Drops form on cool grass at dawn.","Water vapor forms liquid drops."],
    ["Water in a mold becomes hard in a freezer.","It freezes into ice."],["A snowball shrinks in a warm hand.","It melts into liquid water."],
    ["A wet sponge dries on a sunny porch.","Water evaporates into the air."],["Warm, moist air touches a cold bottle.","It forms liquid drops."],
    ["A shallow dish of water freezes outside.","It becomes solid ice."]
  ];
  const changeChoices=["It freezes into ice.","It melts into liquid water.","Liquid water evaporates into the air.","Water vapor forms liquid drops.","It becomes solid ice.","Water evaporates into the air.","It forms liquid drops.","The water turns into a rock."];
  addBank("g1:sci:water-changes","Water, Ice, and Vapor",index=>{
    const [scene,answer]=waterChanges[index];
    const category=index%4;
    const wrong=[changeChoices[(category+1)%4],changeChoices[(category+2)%4],"The water turns into a rock."];
    return question(`${scene} What happens to the water?`,answer,wrong,index);
  });
  const weatherSafety=[
    ["It is raining on the walk to school.","Wear a raincoat."],["The Sun is very bright outside.","Wear a hat and use sunscreen."],
    ["Thunder can be heard nearby.","Go inside a sturdy building."],["Snow covers the sidewalk.","Wear warm boots."],
    ["The day is hot and you are playing outside.","Drink water and rest in shade."],["A strong wind is shaking tree branches.","Stay away from loose branches."],
    ["The ground is icy.","Walk slowly with careful steps."],["You see lightning at the park.","Go inside and wait for the storm to pass."],
    ["The morning is very cold.","Wear a warm coat and gloves."],["Rainwater covers a road.","Stay out of the flooded road."],
    ["The air is hot and sunny.","Take breaks in the shade."],["A storm warning is announced.","Listen to a trusted adult's safety plan."],
    ["Fog makes it hard to see the path.","Stay close to a trusted adult."],["A windy day sends dust into your eyes.","Move to a sheltered place."],
    ["A puddle is deep enough to hide the curb.","Walk around the puddle."],["Hail begins to fall.","Go indoors and stay away from windows."],
    ["The playground slide is very hot in the Sun.","Check it with an adult before using it."],["The temperature drops below freezing.","Dress in warm layers."],
    ["Rain starts while you are riding a bike.","Slow down and find a safe place to stop."],["You feel very hot after running outdoors.","Rest and drink water."],
    ["Thunder sounds while you are in a pool.","Leave the water and go indoors."],["Strong wind tips over a trash bin.","Move away from things that could fall."],
    ["Snow makes the road slippery.","Let an adult choose a safe route."],["The Sun is bright at the beach.","Use shade, sunscreen, and water."],
    ["A tornado warning is given.","Follow an adult to the safest shelter."]
  ];
  const unsafe=["Keep playing outside.","Ignore the weather.","Run toward the danger."];
  addBank("g1:sci:weather-safety","Safe Choices in Weather",index=>{
    const [scene,answer]=weatherSafety[index];
    return question(`${scene} What is a safe choice?`,answer,unsafe,index);
  });
})();
