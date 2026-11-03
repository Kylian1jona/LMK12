/* Ten Grade 2 science lessons with 25 questions each. */
(function(){
  const lessons=[
    {name:"Animal Habitats",group:"Living Things",facts:[
      ["A beaver builds a lodge beside a river. Which habitat meets its needs?","A river wetland",["A dry desert","A snowy mountain","An open ocean"],"Beavers find water, trees, and food near rivers."],
      ["A cactus wren nests among desert plants. Where does it live?","A desert",["A pond","A polar sea","A rain forest"],"A cactus wren is suited to a dry desert habitat."],
      ["A frog needs water to lay its eggs. Which place is best?","A pond",["A sandy road","A dry cave","A rooftop"],"Frog eggs develop in water."],
      ["A squirrel gathers acorns and climbs trees. Which habitat fits it?","A woodland",["An empty parking lot","A coral reef","A glacier"],"Trees offer squirrels food and shelter."],
      ["A crab hides in sand near the tide. Where does it live?","A seashore",["A grassland","A mountain top","A garden shed"],"Crabs can find food and shelter along the shore."]]},
    {name:"What Plants Need",group:"Living Things",facts:[
      ["A bean plant is drooping in dry soil. What should you give it?","Water",["More stones","A closed box","Salt"],"Plants need water to grow."],
      ["A seedling sits in a dark closet. What should change?","Move it into sunlight",["Cover it with paper","Remove all soil","Put it in a freezer"],"Most plants need light to make food."],
      ["A seed is placed on a bare desk. What can support its roots?","Soil",["A smooth plate","A metal lid","A sheet of glass"],"Soil can hold roots and provide nutrients."],
      ["Two seedlings crowd one tiny cup. What would help both grow?","Give them more space",["Tie their leaves together","Remove their roots","Keep them in darkness"],"Roots and leaves need room to grow."],
      ["A plant has water and light but no air. What is missing?","Air",["Paint","Plastic toys","Sandpaper"],"Plants need air as well as water and light."]]},
    {name:"Growing and Changing",group:"Living Things",facts:[
      ["A butterfly lays an egg. What hatches from it?","A caterpillar",["An adult butterfly","A frog","A seed"],"A butterfly begins as an egg and then becomes a caterpillar."],
      ["A tadpole grows legs. What animal will it become?","A frog",["A fish","A duck","A turtle"],"Tadpoles grow and change into frogs."],
      ["A young chicken comes out of an egg. What is it called?","A chick",["A calf","A cub","A larva"],"A baby chicken is a chick."],
      ["A seed begins to grow a tiny root. What stage comes next?","A seedling",["A new seed","A full-grown tree","A flower petal"],"The young growing plant is a seedling."],
      ["A caterpillar forms a chrysalis. What comes out later?","A butterfly",["A tadpole","A worm","A bird"],"A butterfly emerges after the chrysalis stage."]]},
    {name:"Food Chains",group:"Living Things",facts:[
      ["Grass grows using sunlight. A rabbit eats grass. What eats the grass?","The rabbit",["The sunlight","The soil","The cloud"],"The rabbit gets energy by eating grass."],
      ["A caterpillar eats a leaf, and a bird eats the caterpillar. What does the bird eat?","The caterpillar",["The leaf","The tree trunk","The sunlight"],"The bird gets energy from the caterpillar."],
      ["A mouse eats seeds, and an owl eats the mouse. Which animal eats the mouse?","The owl",["The seeds","The grass","The flower"],"The owl is the predator in this food chain."],
      ["A pond snail eats algae, and a fish eats the snail. What starts this food chain?","Algae",["The fish","The snail","A rock"],"Algae makes food using light and starts the chain."],
      ["A bee drinks nectar from a flower. Where does the bee get food?","The flower",["A pebble","The wind","A puddle"],"Flowers provide nectar for bees."]]},
    {name:"Weather Tools",group:"Weather and Earth",facts:[
      ["Which tool measures how warm or cold the air is?","A thermometer",["A ruler","A magnet","A hand lens"],"A thermometer measures temperature."],
      ["Which tool shows the direction the wind blows?","A wind vane",["A calendar","A balance scale","A flashlight"],"A wind vane points with the wind direction."],
      ["Which tool collects rain so you can measure it?","A rain gauge",["A clock","A mirror","A compass"],"A rain gauge collects and measures rainfall."],
      ["Which tool measures how fast the wind blows?","An anemometer",["A thermometer","A measuring cup","A pencil"],"An anemometer measures wind speed."],
      ["Which tool helps record the temperature each day?","A thermometer",["A shovel","A telescope","A magnet"],"Read a thermometer and record its temperature."]]},
    {name:"Weather Changes",group:"Weather and Earth",facts:[
      ["Dark clouds move in and the sky becomes gray. What may happen next?","Rain may fall",["The Moon will rise at noon","The ground will freeze at once","The wind must stop"],"Dark clouds can be a sign that rain is coming."],
      ["A thermometer reads 35°F and puddles turn icy. What is the weather like?","Cold",["Very hot","Always rainy","Windless"],"35°F is close to freezing."],
      ["Leaves blow across the schoolyard. Which weather condition do you notice?","Wind",["Snow","Fog","Thunder"],"Moving leaves show that air is moving."],
      ["The sun is bright and the temperature rises. Which change happened?","The air became warmer",["The air became colder","Rain began falling","The day became night"],"A rising temperature means warmer air."],
      ["Rain falls for three days and the river rises. What caused the change?","The rain added water",["The Sun removed the river","The wind made rocks","The clouds took water away"],"Rain adds water to rivers and streams."]]},
    {name:"Properties of Materials",group:"Matter and Motion",facts:[
      ["Which material lets you see through it clearly?","Clear glass",["Cardboard","Wood","Thick cloth"],"Clear glass is transparent."],
      ["Which material can soak up spilled water?","A sponge",["A metal spoon","A plastic lid","A stone"],"A sponge is absorbent and takes in water."],
      ["Which object is attracted to a magnet?","An iron nail",["A wooden block","A rubber band","A paper cup"],"Magnets attract many objects made of iron."],
      ["Which material bends easily without breaking?","Rubber",["Dry glass","A brick","A stone"],"Rubber is flexible."],
      ["Which material works well for a raincoat?","Waterproof fabric",["Tissue paper","Cotton balls","Cardboard"],"Waterproof fabric helps keep water out."]]},
    {name:"Heating and Cooling",group:"Matter and Motion",facts:[
      ["An ice cube warms in a bowl. What happens?","It melts into water",["It becomes a rock","It grows larger forever","It turns into sand"],"Warmth can melt solid ice into liquid water."],
      ["Water is placed in a freezer. What happens?","It freezes into ice",["It becomes soil","It catches fire","It becomes a plant"],"Cooling water enough turns it into solid ice."],
      ["A wet sidewalk dries on a warm day. Where does some water go?","It evaporates into the air",["It becomes metal","It grows roots","It turns into a cloud of dust"],"Liquid water can evaporate into the air."],
      ["Drops appear on the outside of a cold cup. What happened?","Water vapor cooled into drops",["The cup made new water","The cup melted","The air disappeared"],"Water vapor in the air can condense on a cold surface."],
      ["Chocolate softens beside a warm window. What caused it?","Heat",["A magnet","A shadow","A sound"],"Heat can soften or melt chocolate."]]},
    {name:"Pushes and Pulls",group:"Matter and Motion",facts:[
      ["You move a toy car away from you with your hand. What force did you use?","A push",["A pull","A shadow","A sound"],"A push moves an object away from you."],
      ["You bring a wagon toward you with its handle. What force did you use?","A pull",["A push","A light beam","A temperature"],"A pull brings an object toward you."],
      ["A ball rolls more slowly on rough grass than on smooth floor. What slows it?","Friction",["Sunlight","A louder sound","A new color"],"Friction between surfaces slows motion."],
      ["A dropped pencil falls to the floor. What pulls it downward?","Gravity",["A shadow","A magnet in every floor","A breeze"],"Gravity pulls objects toward Earth."],
      ["A stronger push makes a toy car move farther. What changed?","The amount of force",["The color of the car","The time of day","The car's name"],"A stronger force can change how far an object moves."]]},
    {name:"Light and Sound",group:"Matter and Motion",facts:[
      ["A flashlight shines on a wall. What travels from the flashlight?","Light",["A seed","A magnet","Rain"],"A flashlight is a source of light."],
      ["Your hand blocks a lamp and a dark shape appears. What is the shape?","A shadow",["A reflection of sound","A puddle","A cloud"],"A shadow forms when an object blocks light."],
      ["A guitar string vibrates when plucked. What does it make?","Sound",["Rain","A shadow","A magnet"],"Vibrating objects make sound."],
      ["A drum is tapped softly, then hard. What may change?","How loud the sound is",["The color of the drum","The season","The shape of the room"],"A harder tap often makes a louder sound."],
      ["A mirror sends light back toward your eyes. What does it do?","Reflect light",["Absorb every ray","Make a sound","Pull objects down"],"A mirror reflects light."]]}
  ];
  const settings=["in the classroom","during a nature walk","while helping at home","at the science table","on a school field trip"];
  const data=window.K12_CLASSIC_25_DATA=window.K12_CLASSIC_25_DATA||Object.create(null);
  const science=CURR?.g2?.sci;
  if(!science) return;
  lessons.forEach((lesson,topic)=>{
    const key=`L${topic+5}`;
    const questions=Array.from({length:25},(_,index)=>{
      const [prompt,answer,wrongs,explain]=lesson.facts[index%5];
      const q=`Think about this ${settings[Math.floor(index/5)]}: ${prompt}`;
      const choices=[answer,...wrongs],shift=index%4;
      return {type:"mc",q,choices:choices.slice(shift).concat(choices.slice(0,shift)),answer,explain,audio:q};
    });
    data[`g2:sci:${key}`]={name:lesson.name,questions};
    science[key]={name:lesson.name,gen:classicQuestionPending};
  });
  function addMenu(){
    const menu=document.querySelector("#g2-sci .lesson-columns");
    if(!menu || menu.querySelector('[data-more-g2-science="true"]')) return;
    [...new Set(lessons.map(lesson=>lesson.group))].forEach(group=>{
      const column=document.createElement("div");column.className="lesson-column";column.dataset.moreG2Science="true";
      const heading=document.createElement("h3");heading.textContent=group;
      const note=document.createElement("p");note.textContent="Explore with 25 questions in each lesson.";
      column.append(heading,note);
      lessons.forEach((lesson,topic)=>{
        if(lesson.group!==group)return;
        const button=document.createElement("button");button.type="button";button.className="btn btn-main";button.textContent=lesson.name;
        button.onclick=()=>startLesson("g2","sci",`L${topic+5}`);
        column.append(button);
      });
      menu.append(column);
    });
    window.decorateLearnMasterIcons?.(menu);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",addMenu,{once:true});
  else addMenu();
})();
