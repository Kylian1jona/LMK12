import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'images','reading-stories');
fs.mkdirSync(out,{recursive:true});

const colors={ink:'#677c82',cream:'#f8f5ee',sky:'#e9f3f5',grass:'#c8dbcd',leaf:'#a9c6b3',wood:'#cda88c',rose:'#d5a7a9',blue:'#a9c6d8',yellow:'#e8d6a2',lavender:'#c7bdd4',red:'#c98784'};
const ellipse=(x,y,rx,ry,fill,extra='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const circle=(x,y,r,fill,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const rect=(x,y,w,h,fill,rx=0,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
const pathShape=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
const line=(d,color=colors.ink,width=4)=>pathShape(d,'none',`stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`);
const group=(x,y,body,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})">${body}</g>`;

function person(x,y,shirt=colors.blue,skin='#d9b79d',scale=1){
  return group(x,y,ellipse(0,83,45,10,'#839a9250')+rect(-19,37,38,50,shirt,16)+circle(0,19,22,skin)+pathShape('M-23 19 Q-20 -16 5 -10 Q27 -8 23 21 Q10 5 -2 8 Q-15 10 -23 19',colors.ink)+line('M-18 53 L-33 72 M18 53 L33 72',shirt,9)+line('M-10 83 L-15 105 M10 83 L15 105',colors.ink,9)+circle(-7,18,2,colors.ink)+circle(8,18,2,colors.ink),scale);
}
function animal(x,y,type='dog',fill=colors.wood,scale=1){
  const ears=type==='cat'?pathShape('M-31 10 L-26 -19 L-7 -4 M8 -4 L26 -19 L31 10',fill,`stroke="${colors.ink}" stroke-width="3"`):type==='fox'?pathShape('M-32 8 L-32 -17 L-9 -4 M9 -4 L32 -17 L32 8',fill,`stroke="${colors.ink}" stroke-width="3"`):type==='hare'?ellipse(-17,-29,9,37,fill)+ellipse(18,-29,9,37,fill):type==='bear'?circle(-24,-5,12,fill)+circle(24,-5,12,fill):ellipse(-25,-5,12,25,fill)+ellipse(25,-5,12,25,fill);
  const tail=type==='fox'?pathShape('M30 59 Q75 35 75 72 Q55 88 28 74',colors.rose):line('M25 66 Q55 40 49 31',fill,10);
  return group(x,y,tail+ellipse(0,65,34,32,fill)+circle(0,18,33,fill)+ears+ellipse(0,30,18,12,colors.cream)+circle(-10,17,3,colors.ink)+circle(10,17,3,colors.ink)+circle(0,29,4,colors.ink)+line('M-15 82 L-16 99 M14 82 L16 99',colors.ink,7),scale);
}
function bird(x,y,fill=colors.yellow,scale=1){return group(x,y,ellipse(0,17,36,28,fill)+circle(23,-5,20,fill)+ellipse(-9,15,20,13,'#ffffff72')+pathShape('M40 -2 L56 4 L40 10',colors.wood)+circle(28,-9,2.8,colors.ink)+line('M-3 44 L-5 60 M15 43 L13 60',colors.wood,4),scale);}
function tortoise(x,y,scale=1){return group(x,y,ellipse(0,70,58,31,colors.leaf)+pathShape('M-51 66 Q-42 7 3 15 Q43 15 54 67 Z',colors.grass,`stroke="${colors.ink}" stroke-width="3"`)+circle(63,65,17,colors.leaf)+circle(69,58,2.5,colors.ink)+line('M-34 91 L-39 104 M35 92 L40 104',colors.ink,8),scale);}
function tree(x,y,scale=1){return group(x,y,rect(-10,64,20,132,colors.wood,8)+ellipse(-25,61,55,58,colors.leaf)+ellipse(24,48,56,63,colors.grass)+ellipse(0,18,50,45,colors.leaf),scale);}
function flower(x,y,fill=colors.rose,scale=1){return group(x,y,line('M0 0 L0 50',colors.leaf,4)+circle(0,0,7,colors.yellow)+circle(-11,0,8,fill)+circle(11,0,8,fill)+circle(0,-11,8,fill)+circle(0,11,8,fill)+ellipse(-8,30,12,5,colors.leaf),scale);}
function house(x,y,fill=colors.cream,scale=1){return group(x,y,rect(-58,7,116,100,fill,9,`stroke="${colors.ink}" stroke-width="3"`)+pathShape('M-72 10 L0 -43 L72 10 Z',colors.rose)+rect(-14,54,28,53,colors.wood,5)+rect(-42,31,20,23,colors.blue,4)+rect(23,31,20,23,colors.blue,4),scale);}
function book(x,y,fill=colors.blue,scale=1){return group(x,y,pathShape('M0 8 Q-27 -9 -55 2 L-55 65 Q-27 54 0 70 Q27 54 55 65 L55 2 Q27 -9 0 8 Z',fill,`stroke="${colors.ink}" stroke-width="3"`)+line('M0 8 L0 70',colors.ink,3)+line('M-43 20 Q-20 17 -8 27 M10 27 Q29 17 44 20','#ffffffb8',3),scale);}
function cloud(x,y,scale=1){return group(x,y,ellipse(0,14,51,18,'#ffffffb8')+circle(-28,5,21,'#ffffffb8')+circle(0,-4,25,'#ffffffb8')+circle(29,5,20,'#ffffffb8'),scale);}
function pond(x,y,scale=1){return group(x,y,ellipse(0,30,107,35,colors.blue)+ellipse(0,23,81,16,'#d9e9ed')+line('M-110 0 L-98 -24 M102 0 L109 -22',colors.leaf,6),scale);}
function star(x,y,r=5){return pathShape(`M${x} ${y-r} L${x+r*.27} ${y-r*.27} L${x+r} ${y} L${x+r*.27} ${y+r*.27} L${x} ${y+r} L${x-r*.27} ${y+r*.27} L${x-r} ${y} L${x-r*.27} ${y-r*.27} Z`,colors.yellow);}
function sceneFrame(content,index,grade){
  const tints={prek:'#fff5eb',k:'#edf5f0',g1:'#f1f3f8',g2:'#f5f0eb',g3:'#edf2f4'};
  const soft=tints[grade];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 320" role="img"><rect width="640" height="320" rx="24" fill="${soft}"/><circle cx="530" cy="68" r="39" fill="#f8e9c5" opacity=".68"/>${cloud(120,66,.7)}${cloud(470,95,.5)}<path d="M0 247 Q160 222 310 253 T640 241 V320 H0Z" fill="#dbe8dc"/><path d="M0 273 Q170 247 340 270 T640 264 V320 H0Z" fill="#cbdccf"/>${ellipse(320,294,220,16,'#a8bdb936')}${content}<path d="M14 15 H626 V305 H14Z" fill="none" stroke="#8aa4a0" stroke-opacity=".2" stroke-width="2" rx="20"/></svg>`;
}

const tent=(x,y)=>group(x,y,pathShape('M-84 93 L-15 -36 L76 93 Z','#d4b6a3',`stroke="${colors.ink}" stroke-width="3"`)+pathShape('M-15 -36 L15 93 L-45 93 Z','#f4e7d7')+line('M-15 -36 L-15 -58',colors.ink,3));
const map=(x,y)=>group(x,y,pathShape('M-66 0 L-20 -10 L23 0 L67 -10 L67 65 L23 75 L-20 65 L-66 75 Z','#f7e8cd',`stroke="${colors.ink}" stroke-width="3"`)+line('M-20 -10 L-20 65 M23 0 L23 75',colors.ink,2)+line('M-43 47 Q0 18 45 28',colors.rose,3)+circle(45,28,5,colors.rose));
const sock=(x,y)=>group(x,y,pathShape('M-24 -43 H25 V17 Q42 20 40 42 Q36 65 8 64 H-50 V27 H-20 Z',colors.leaf,`stroke="${colors.ink}" stroke-width="3"`)+rect(-24,-42,49,15,'#ffffffa0',3));
const kite=(x,y)=>group(x,y,pathShape('M0 -53 L42 0 L0 51 L-42 0 Z',colors.rose,`stroke="${colors.ink}" stroke-width="3"`)+line('M0 -53 L0 51 M-42 0 L42 0 M0 51 Q35 110 11 158',colors.ink,2));
const pot=(x,y)=>group(x,y,ellipse(0,13,45,13,colors.ink)+rect(-42,10,84,55,colors.wood,10)+ellipse(0,10,42,11,colors.rose)+line('M-49 23 L-63 23 M49 23 L63 23',colors.ink,6));
const bell=(x,y)=>group(x,y,pathShape('M-31 44 Q-31 -4 0 -15 Q31 -4 31 44 L42 55 H-42 Z',colors.yellow,`stroke="${colors.ink}" stroke-width="3"`)+circle(0,61,8,colors.wood));
const cap=(x,y)=>group(x,y,pathShape('M-42 29 Q-36 -30 0 -30 Q36 -30 42 29 Z',colors.red,`stroke="${colors.ink}" stroke-width="3"`)+ellipse(0,30,55,10,colors.red));
const pig=(x,y,scale=1)=>group(x,y,ellipse(0,69,41,29,colors.rose)+circle(0,20,34,colors.rose)+pathShape('M-30 2 L-27 -22 L-8 -8 M8 -8 L27 -22 L30 2',colors.rose,`stroke="${colors.ink}" stroke-width="3"`)+ellipse(0,34,18,12,colors.red)+circle(-10,18,3,colors.ink)+circle(10,18,3,colors.ink)+circle(-6,34,2,colors.ink)+circle(6,34,2,colors.ink)+line('M-24 88 L-24 105 M24 88 L24 105',colors.ink,7),scale);
const gingerbread=(x,y,scale=1)=>group(x,y,circle(0,0,26,colors.wood)+rect(-24,24,48,63,colors.wood,19)+line('M-20 47 L-47 67 M20 47 L47 67 M-11 80 L-24 107 M11 80 L24 107',colors.wood,16)+circle(-8,-4,3,colors.ink)+circle(8,-4,3,colors.ink)+circle(0,42,5,colors.red)+circle(0,61,5,colors.red)+line('M-8 11 Q0 18 8 11',colors.ink,2),scale);
const bus=(x,y)=>group(x,y,rect(-104,0,208,91,colors.yellow,19,`stroke="${colors.ink}" stroke-width="3"`)+rect(-79,14,49,32,colors.blue,5)+rect(-17,14,49,32,colors.blue,5)+rect(44,14,46,32,colors.blue,5)+circle(-63,94,18,colors.ink)+circle(65,94,18,colors.ink));
const goat=(x,y,scale=1)=>group(x,y,ellipse(0,69,43,28,colors.wood)+circle(25,28,26,colors.wood)+pathShape('M12 9 L3 -22 M38 9 L47 -22', 'none',`stroke="${colors.ink}" stroke-width="7" stroke-linecap="round"`)+circle(34,26,3,colors.ink)+line('M-26 86 L-29 108 M20 88 L23 108',colors.ink,6),scale);
const swan=(x,y,scale=1)=>group(x,y,ellipse(0,62,57,32,colors.cream,`stroke="${colors.ink}" stroke-width="3"`)+pathShape('M18 55 Q33 22 23 -12 Q20 -35 39 -36 Q60 -36 60 -14 Q60 3 44 11 L44 58 Z',colors.cream,`stroke="${colors.ink}" stroke-width="3"`)+circle(48,-21,3,colors.ink)+pathShape('M60 -13 L78 -8 L60 -2 Z',colors.yellow),scale);

const prekScenes=[
  ()=>person(157,167,colors.blue)+person(288,177,colors.lavender,'#bd987e',.83)+cap(437,172)+pond(477,232,.58),
  ()=>person(160,171,colors.rose)+person(451,171,colors.blue,'#bd987e',.9)+pot(307,190)+circle(355,175,11,colors.red)+circle(377,198,10,colors.red),
  ()=>animal(340,158,'dog',colors.wood,1.13)+person(144,173,colors.blue)+rect(402,222,120,30,colors.blue,10)+pond(456,228,.43),
  ()=>person(161,168,colors.blue)+bird(371,166,colors.red,1.13)+rect(433,177,105,77,colors.wood,7)+line('M446 178 L446 254 M477 178 L477 254 M510 178 L510 254',colors.ink,3),
  ()=>person(170,169,colors.lavender)+animal(397,151,'cat',colors.wood,1.08)+bell(405,207,.47),
  ()=>person(172,169,colors.rose)+person(448,185,colors.blue,'#bd987e',.72)+pot(315,196)+ellipse(492,249,75,10,colors.lavender),
  ()=>person(147,171,colors.blue)+person(245,178,colors.rose,'#bd987e',.82)+bus(454,161),
  ()=>house(120,117,colors.yellow,.58)+house(319,117,colors.wood,.58)+house(518,117,colors.red,.58)+pig(160,205,.68)+pig(320,205,.68)+pig(480,205,.68),
  ()=>gingerbread(253,150,1.05)+bird(467,198,colors.yellow,.72)+tree(527,91,.68)+line('M99 264 Q330 238 591 263',colors.wood,5),
  ()=>bird(210,160,colors.red,1.25)+flower(414,201,colors.yellow,.8)+rect(351,226,150,24,colors.wood,8)+ellipse(426,222,47,16,colors.yellow),
  ()=>person(151,169,colors.yellow)+animal(325,167,'bear',colors.wood,.76)+animal(414,184,'bear',colors.wood,.57)+animal(493,196,'bear',colors.wood,.42)+circle(296,246,12,colors.yellow)+circle(369,246,10,colors.yellow)+circle(434,246,8,colors.yellow),
  ()=>person(184,156,colors.blue)+group(445,159,rect(-96,14,192,76,colors.lavender,28,`stroke="${colors.ink}" stroke-width="3"`)+circle(-58,94,16,colors.ink)+circle(62,94,16,colors.ink)+star(0,38,18))+star(115,145,12)+pathShape('M301 251 Q335 216 361 250 Z',colors.blue,`stroke="${colors.ink}" stroke-width="3"`),
  ()=>tortoise(213,190,.84)+animal(456,160,'hare',colors.wood,.9)+line('M123 270 Q319 240 544 272',colors.wood,5),
  ()=>person(183,172,colors.red)+pathShape('M162 168 Q184 110 207 168 Z',colors.red)+house(463,151,colors.cream,.76)+tree(562,79,.57),
  ()=>person(187,176,colors.blue)+tree(406,-75,1.75)+pathShape('M386 211 Q314 101 395 16 M414 219 Q495 112 412 5','none',`stroke="${colors.leaf}" stroke-width="15"`)+cloud(427,61,.7),
  ()=>pond(329,213)+swan(345,113,1.03)+bird(477,181,colors.yellow,.63)+flower(144,223,colors.rose),
  ()=>goat(177,164,.72)+goat(287,163,.85)+goat(432,157,1.04)+rect(96,236,450,21,colors.wood,5)+line('M118 257 L118 297 M528 257 L528 297',colors.ink,7)
];

const kScenes=[
  ()=>tent(335,161)+person(150,170,colors.rose)+person(520,181,colors.blue,'#bd987e',.82)+cloud(394,51,.72)+line('M440 112 L428 135 M485 109 L473 132',colors.blue,4),
  ()=>map(330,168)+person(152,170,colors.blue)+flower(505,215,colors.rose)+flower(542,230,colors.yellow),
  ()=>animal(385,145,'cat',colors.wood,1.2)+sock(235,187)+rect(455,202,86,55,colors.cream,12),
  ()=>pond(350,201)+bird(380,132,colors.yellow,1.05)+person(135,169,colors.blue,'#d9b79d',.85),
  ()=>tree(405,52,.95)+bird(335,154,colors.yellow,.85)+ellipse(355,209,65,20,colors.wood)+circle(337,202,8,colors.cream)+circle(365,201,8,colors.cream),
  ()=>person(180,166,colors.lavender)+person(465,166,colors.rose,'#bf987d',.95)+book(324,210,colors.yellow,.85),
  ()=>tree(465,62,.9)+person(142,168,colors.blue)+kite(306,95)+line('M176 229 Q238 222 306 146',colors.ink,2),
  ()=>house(445,132,colors.cream,.95)+animal(185,168,'bear',colors.wood,1.15)+pot(324,203),
  ()=>tree(411,17,1.35)+person(192,176,colors.blue)+cloud(395,70,.72)+ellipse(417,49,12,9,colors.yellow),
  ()=>tortoise(211,195,.86)+animal(444,160,'hare',colors.wood,.9)+line('M145 275 Q330 242 530 280',colors.wood,5)
];

const g1Scenes=[
  ()=>house(424,132,colors.wood,.9)+person(159,171,colors.rose)+star(345,159)+star(375,133)+star(398,176),
  ()=>person(175,170,colors.lavender)+pot(390,206)+flower(394,135,colors.cream,1.2)+star(426,93),
  ()=>pond(331,210)+bird(444,135,colors.wood,.85)+tree(145,97,.72)+ellipse(244,207,18,12,colors.leaf),
  ()=>person(170,171,colors.blue)+group(395,154,rect(-41,0,82,82,colors.lavender,16)+circle(-16,33,5,colors.ink)+circle(16,33,5,colors.ink)+line('M-13 57 Q0 68 14 57',colors.ink,3)+line('M0 0 L0 -17',colors.ink,3)+circle(0,-20,5,colors.rose)),
  ()=>person(158,171,colors.blue)+person(474,171,colors.rose,'#b98972')+ellipse(319,237,60,17,colors.wood)+pathShape('M285 228 Q319 163 353 228 Z',colors.yellow)+circle(320,195,7,colors.rose),
  ()=>animal(365,157,'dog',colors.wood,1.15)+person(149,171,colors.lavender)+rect(415,200,126,19,colors.wood,7)+line('M435 218 L435 265 M521 218 L521 265',colors.ink,5),
  ()=>tent(351,160)+person(159,171,colors.blue)+tree(505,89,.65)+cloud(245,61,.85)+line('M235 124 L223 149 M281 129 L269 154',colors.blue,4),
  ()=>person(271,160,colors.blue)+house(476,130,colors.cream,.7)+pathShape('M335 242 Q360 209 377 242 Z',colors.cream,`stroke="${colors.ink}" stroke-width="3"`)+star(107,143),
  ()=>tree(464,73,.82)+person(178,170,colors.red)+pathShape('M160 164 Q180 116 201 164 Z',colors.red)+house(379,163,colors.cream,.5),
  ()=>pond(331,208)+bird(345,138,colors.cream,1.25)+bird(456,174,colors.yellow,.72)+flower(141,220,colors.rose)
];

const sharedScenes=[
  ()=>animal(350,159,'fox',colors.wood,1.12)+tree(130,72,.8)+tree(520,98,.67)+star(415,126)+star(453,160),
  ()=>house(357,113,colors.blue,1.05)+person(146,172,colors.rose)+line('M190 243 Q250 234 286 250',colors.ink,3)+ellipse(246,246,10,4,colors.wood),
  ()=>person(175,170,colors.lavender)+cloud(417,102,.8)+star(383,152)+star(463,160)+book(387,207,colors.yellow,.78),
  ()=>group(344,139,rect(-154,0,308,102,colors.blue,24)+rect(-112,20,64,44,colors.cream,10)+rect(-22,20,64,44,colors.cream,10)+rect(68,20,64,44,colors.cream,10)+circle(-93,110,18,colors.ink)+circle(91,110,18,colors.ink))+person(132,159,colors.rose,'#d9b79d',.85),
  ()=>house(383,107,colors.wood,1.13)+bell(383,57,.9)+person(171,173,colors.blue)+line('M335 45 L430 45',colors.ink,4),
  ()=>group(343,136,ellipse(0,94,143,87,'#dcebe4')+pathShape('M-137 92 Q-113 -57 0 -57 Q113 -57 137 92','none',`stroke="${colors.ink}" stroke-width="5"`)+tree(0,-22,.57))+circle(514,72,24,colors.rose),
  ()=>group(383,155,ellipse(0,71,43,38,colors.cream)+ellipse(0,9,34,43,colors.ink)+ellipse(0,65,21,19,colors.cream)+circle(-10,0,3,colors.cream)+circle(10,0,3,colors.cream)+pathShape('M0 15 L17 22 L0 29',colors.yellow))+house(173,130,colors.cream,.65),
  ()=>pond(346,219)+group(357,140,rect(-20,3,42,71,colors.blue,14)+circle(0,-1,18,colors.cream)+line('M-18 48 L19 48',colors.ink,2))+person(150,166,colors.rose),
  ()=>group(345,174,rect(-48,17,95,52,colors.wood,10)+rect(-50,0,100,24,colors.rose,7))+flower(183,215,colors.yellow)+book(480,208,colors.lavender,.65),
  ()=>house(407,125,colors.cream,.9)+person(173,171,colors.blue)+person(299,182,colors.rose,'#b98972',.82)+book(334,214,colors.yellow,.57)
];

for(const [grade,scenes] of [['prek',prekScenes],['k',kScenes],['g1',g1Scenes],['g2',sharedScenes],['g3',sharedScenes]]){
  scenes.forEach((draw,index)=>{
    const art=sceneFrame(draw(),index,grade);
    fs.writeFileSync(path.join(out,`${grade}-${index+1}.svg`),art);
  });
}
console.log(`Created ${prekScenes.length+40} reading story illustrations in ${out}`);
