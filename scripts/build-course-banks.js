/* Builds explicit browser lesson records. Run with node scripts/build-course-banks.js. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
for (const grade of ['g9', 'g10', 'g11', 'g12']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, `components/k12-classic-25-${grade}.js`), 'utf8'), context);
}
const data = context.window.K12_CLASSIC_25_DATA;
const Q = (q, answer, wrong, explain) => {
  answer = String(answer);
  const choices = [...new Set([answer, ...wrong.map(String)])];
  if (choices.length < 3) throw new Error(`Invalid choices: ${q}: ${choices}`);
  return { type: 'mc', q, choices, answer, explain, audio: q };
};
const num = value => String(Number(value.toFixed(4)));
function add(grade, lesson, name, topic, make) {
  const questions = Array.from({ length: 25 }, (_, i) => {
    const question = make(i % 5, Math.floor(i / 5) + 1);
    const shift = i % 4;
    question.choices = question.choices.slice(shift).concat(question.choices.slice(0, shift));
    return question;
  });
  if (new Set(questions.map(q => q.q)).size !== 25) throw new Error(`Repeated prompt in ${name}`);
  data[`${grade}:math:L${lesson}`] = { name, topic, contentVersion: '20260907.1', questions };
}

// Geometry progresses through measurement, proof, similarity, and coordinate geometry.
const geometryTopics = ['Angles and Geometric Reasoning', 'Triangles and Similarity', 'Circles and Measurement', 'Coordinates and Transformations'];
const stages = ['Foundations', 'Guided Practice', 'Applications', 'Reasoning', 'Review'];
for (let lesson = 1; lesson <= 20; lesson++) {
  const group = Math.floor((lesson - 1) / 5);
  add('g9', lesson, `${geometryTopics[group]}: ${stages[(lesson-1)%5]}`, geometryTopics[group], (kind, round) => {
    const n = round + (lesson - 1) * 5;
    const a = 20 + n % 50, b = 35 + n % 25, k = n + 2;
    const mode = (kind + lesson - 1) % 5;
    if (group === 0) {
      if (mode === 0) return Q(`Two adjacent angles form a straight line. One is ${a} degrees. What is the other?`, 180-a, [90-a, 180+a, a], `A straight angle is 180 degrees, so subtract ${a}: 180 - ${a} = ${180-a}.`);
      if (mode === 1) return Q(`Parallel lines are cut by a transversal. An interior angle is ${a} degrees. What is its alternate interior angle?`, a, [180-a, 90-a, 360-a], 'Alternate interior angles are congruent when the two lines are parallel; same-side interior angles are supplementary.');
      if (mode === 2) return Q(`A triangle has angles of ${a} and ${b} degrees. Find its third angle.`, 180-a-b, [a+b, 180-a, 180-b], `Triangle angles sum to 180 degrees. Subtract both known angles: 180 - ${a} - ${b} = ${180-a-b}.`);
      if (mode === 3) return Q(`What is the sum of the interior angles of a convex ${k+3}-gon, in degrees?`, (k+1)*180, [(k+3)*180, (k+2)*180, (k+1)*360], `Draw diagonals from one vertex to divide an n-gon into n - 2 triangles. Here (${k+3} - 2) × 180 = ${(k+1)*180}.`);
      return Q(`Two lines intersect. Vertical angles measure (2x + ${k}) degrees and ${3*k} degrees. Find x.`, k, [2*k, 3*k, k/2], `Vertical angles are equal: 2x + ${k} = ${3*k}. Subtract ${k}, then divide by 2 to get x = ${k}.`);
    }
    if (group === 1) {
      if (mode === 0) return Q(`Triangles ABC and DEF have AB = DE = ${k}, AC = DF = ${k+2}, and angle A = angle D = 40 degrees. Which theorem proves congruence?`, 'SAS', ['SSS', 'ASA', 'AA'], 'The equal angle lies between the two known equal sides. That is side-angle-side; AA proves similarity, not congruence.');
      if (mode === 1) return Q(`A triangle with sides 3, 4, 5 is enlarged by a scale factor of ${k}. What is the new longest side?`, 5*k, [5+k, 3*k, 4*k], `Multiply every side by the scale factor. The longest side becomes 5 × ${k} = ${5*k}.`);
      if (mode === 2) return Q(`A right triangle has legs ${3*k} cm and ${4*k} cm. Find the hypotenuse.`, `${5*k} cm`, [`${7*k} cm`, `${k} cm`, `${25*k*k} cm`], `Use a² + b² = c². This is a 3-4-5 triangle scaled by ${k}, so c = ${5*k} cm.`);
      if (mode === 3) return Q(`In a right triangle, angle T has opposite side ${3*k}, adjacent side ${4*k}, and hypotenuse ${5*k}. What is tan(T)?`, '3/4', ['3/5', '4/5', '4/3'], 'Tangent is opposite divided by adjacent. The common scale factor cancels, leaving 3/4. Sine would use the hypotenuse.');
      return Q(`A ${k}-meter pole casts a ${2*k}-meter shadow. At the same time, a tree casts a ${6*k}-meter shadow on level ground. How tall is the tree?`, `${3*k} meters`, [`${12*k} meters`, `${4*k} meters`, `${2*k} meters`], `The sun creates similar right triangles. height/shadow = 1/2, so the tree height is ${6*k}/2 = ${3*k} meters.`);
    }
    if (group === 2) {
      if (mode === 0) return Q(`A circle has radius ${k} cm. What is its circumference, in terms of pi?`, `${2*k}pi cm`, [`${k*k}pi cm`, `${k}pi cm`, `${4*k}pi cm`], `Circumference is 2pi r = 2pi(${k}). The formula pi r² gives area, not circumference.`);
      if (mode === 1) return Q(`A circle has radius ${2*k}. What is the area of a 90-degree sector?`, `${k*k}pi square units`, [`${4*k*k}pi square units`, `${2*k*k}pi square units`, `${k}pi square units`], `A 90-degree sector is one quarter of the circle: (90/360)pi(${2*k})² = ${k*k}pi.`);
      if (mode === 2) return Q(`A closed cube has edge length ${k} cm. Find its total surface area.`, `${6*k*k} square cm`, [`${k*k*k} square cm`, `${4*k*k} square cm`, `${k*k} square cm`], `There are six square faces, each with area ${k}². Total surface area is 6 × ${k*k} = ${6*k*k} square cm.`);
      if (mode === 3) return Q(`A cylinder has radius 2 cm and height ${k} cm. Find its volume.`, `${4*k}pi cubic cm`, [`${2*k}pi cubic cm`, `${8*k}pi cubic cm`, `${4*k*k}pi cubic cm`], `Volume is base area times height: pi(2)²(${k}) = ${4*k}pi cubic cm.`);
      return Q(`A solid has volume ${k} cubic units. A similar solid has every length tripled. What is its volume?`, 27*k, [3*k, 9*k, k+3], `Volume scales with the cube of the linear factor. Multiply ${k} by 3³ = 27.`);
    }
    if (mode === 0) return Q(`Find the midpoint of (${k}, 2) and (${k+6}, 10).`, `(${k+3}, 6)`, [`(${2*k+6}, 12)`, `(${k+6}, 6)`, `(${k+3}, 8)`], `Average each pair of coordinates: x = (${k} + ${k+6})/2 = ${k+3}, y = (2 + 10)/2 = 6.`);
    if (mode === 1) return Q(`Reflect the point (${k}, 3) across the y-axis. What is its image?`, `(${-k}, 3)`, [`(${k}, -3)`, `(${-k}, -3)`, `(3, ${k})`], 'Reflection across the y-axis changes the sign of x and preserves y.');
    if (mode === 2) return Q(`A line has slope ${k}. What slope must a perpendicular line have?`, `-1/${k}`, [`1/${k}`, `${-k}`, `${k}`], 'Nonvertical perpendicular lines have slopes whose product is -1. Take the negative reciprocal.');
    if (mode === 3) return Q(`The circle (x - ${k})² + (y + 3)² = 25 has which center and radius?`, `Center (${k}, -3), radius 5`, [`Center (${-k}, 3), radius 5`, `Center (${k}, -3), radius 25`, `Center (${k}, 3), radius 5`], 'Match (x - h)² + (y - k)² = r². The center uses the opposite signs inside the parentheses, and the radius is the square root of 25.');
    return Q(`Find the distance between (${k}, 1) and (${k+3}, 5).`, 5, [7, 25, 4], 'The horizontal and vertical changes are 3 and 4. Distance is sqrt(3² + 4²) = 5.');
  });
}

// The existing Grade 10 bank already includes algebraic models, quadratics,
// functions, systems, and statistics. Add its missing advanced algebra strands.
add('g10', 5, 'Exponential and Logarithmic Equations', 'Models and Logarithms', (t,n) => {
  const b=n+2;
  if(t===0) return Q(`Solve ${b}^x = ${b*b*b}.`,3,[b,2,b*b],`${b}³ = ${b*b*b}, so the required exponent is 3.`);
  if(t===1) return Q(`Evaluate log base ${b} of ${b*b}.`,2,[b,b*b,1],`A logarithm asks for an exponent: ${b}² = ${b*b}.`);
  if(t===2) return Q(`Solve log base 2 of (x - ${n}) = 3.`,8+n,[8-n,3+n,n+6],`Rewrite in exponential form: x - ${n} = 2³ = 8, so x = ${8+n}. This also satisfies x > ${n}.`);
  if(t===3) return Q(`A balance of $${100*n} grows by 5% per year with annual compounding. Which model gives its value after t years?`,`${100*n}(1.05)^t`,[`${100*n}(0.05)^t`,`${100*n} + 5t`,`${100*n}(1.5)^t`],'A 5% increase multiplies the balance by 1.05 each year. The starting amount is the coefficient.');
  return Q(`For x > 0, simplify log base 10 of (${10**n}x).`,`${n} + log base 10 of x`,[`${n} times log base 10 of x`,`${10**n} + log base 10 of x`,`${n} - log base 10 of x`],`The logarithm of a product is a sum. log10(${10**n}) = ${n}.`);
});
add('g10', 10, 'Complex Numbers and Quadratic Solutions', 'Polynomials and Quadratics', (t,n) => {
  if(t===0) return Q(`Simplify (${n} + 2i) + (3 + 4i).`,`${n+3} + 6i`,[`${n+3} + 8i`,`${n+7}i`,`${n-3} - 2i`],'Add real parts to real parts and imaginary coefficients to imaginary coefficients.');
  if(t===1) return Q(`Solve x² + ${n*n} = 0 over the complex numbers.`,`x = ${n}i or x = -${n}i`,[`x = ${n} or x = -${n}`,`x = ${n*n}i only`,'No complex solutions'],`x² = -${n*n}. Since i² = -1, both ${n}i and -${n}i square to -${n*n}.`);
  if(t===2) return Q(`Find the discriminant of x² + ${2*n}x + ${n*n+1} = 0.`,-4,[4,0,4*n*n],`b² - 4ac = ${4*n*n} - ${4*(n*n+1)} = -4. The negative result indicates two nonreal conjugate solutions.`);
  if(t===3) return Q(`Multiply (${n} + i)(${n} - i).`,n*n+1,[n*n-1,2*n,n*n+2],`Conjugates multiply to ${n}² - i² = ${n*n} + 1 because i² = -1.`);
  return Q(`The polynomial p(x) has real coefficients and a zero ${n} + 3i. Which other zero must it have?`,`${n} - 3i`,[`${-n} + 3i`,`${-n} - 3i`,`${n} + 9i`],'Nonreal zeros of real-coefficient polynomials occur in conjugate pairs. Keep the real part and reverse the imaginary sign.');
});
add('g10', 15, 'Rational and Radical Equations', 'Functions and Equations', (t,n) => {
  if(t===0) return Q(`What input is excluded from f(x) = (x + 1)/(x - ${n+2})?`,n+2,[-1,-n-2,0],`The denominator cannot be zero. Solve x - ${n+2} = 0.`);
  if(t===1) return Q(`Solve sqrt(x + ${n}) = ${n+2}.`,(n+2)**2-n,[(n+2)**2+n,n+2-n,(n+2)*2-n],`Square both sides: x + ${n} = ${(n+2)**2}. Subtract ${n}, then check the nonnegative square root in the original equation.`);
  if(t===2) return Q(`Solve ${2*n}/x = 2, with x not zero.`,n,[2*n,4*n,-n],`Multiply by x: ${2*n} = 2x. Divide by 2, and check x = ${n} is nonzero.`);
  if(t===3) return Q(`Simplify (x² - ${n*n})/(x - ${n}) for x not equal to ${n}.`,`x + ${n}`,[`x - ${n}`,'x²',`${n}`],`Factor the numerator as (x - ${n})(x + ${n}), then cancel the common factor while keeping the original restriction.`);
  return Q(`A student squares sqrt(x + ${n}) = -2 and obtains x = ${4-n}. What should happen next?`,'Reject the candidate because a principal square root cannot be negative',['Accept it because the squared equation holds','Change the answer to its absolute value','Divide the candidate by two'],'Squaring loses the sign restriction. Substitution gives 2 = -2, so the candidate is extraneous.');
});

// Precalculus: eight named lessons, each mixing five problem forms.
add('g11',1,'Function Composition and Inverses','Functions and Models',(t,n)=>{
  if(t===0) return Q(`Let f(x) = 2x + ${n} and g(x) = x². Find f(g(${n+1})).`,2*(n+1)**2+n,[(2*(n+1)+n)**2,2*(n+1)+n,(n+1)**2+n],`Evaluate the inner function first: g(${n+1}) = ${(n+1)**2}. Then f gives 2(${(n+1)**2}) + ${n}.`);
  if(t===1) return Q(`Find the inverse of f(x) = ${n+1}x + ${n}.`,`f inverse(x) = (x - ${n})/${n+1}`,[`f inverse(x) = (x + ${n})/${n+1}`,`f inverse(x) = ${n+1}x - ${n}`,`f inverse(x) = x/${n+1} - ${n}`],`Write y = ${n+1}x + ${n}, swap x and y, then subtract ${n} and divide by ${n+1}.`);
  if(t===2) return Q(`What is the real domain of f(x) = sqrt(x - ${n+2})?`,`x >= ${n+2}`,[`x > ${n+2}`,`x <= ${n+2}`,'All real numbers'],`The radicand must be nonnegative: x - ${n+2} >= 0. Equality is allowed because sqrt(0) exists.`);
  if(t===3) return Q(`For f(x) = x², find the average rate of change from x = ${n} to x = ${n+2}.`,2*n+2,[4*n+4,2,n*n],`Average rate is [(${n+2})² - (${n})²]/[${n+2} - ${n}] = ${2*n+2}.`);
  return Q(`A tank starts with ${10*n} liters and fills at 3 liters per minute. How many minutes until it holds ${10*n+24} liters?`,8,[24,3,10*n+8],'The required increase is 24 liters. Divide by the rate, 3 liters per minute, to obtain 8 minutes.');
});
add('g11',2,'Polynomial and Rational Functions','Functions and Models',(t,n)=>{
  if(t===0) return Q(`For f(x) = (x - ${n})(x + ${n+2}), which are the zeros?`,`${n} and ${-n-2}`,[`${-n} and ${n+2}`,`${n} and ${n+2}`,`${-n} and ${-n-2}`],'A product is zero when a factor is zero. Solve each linear factor separately.');
  if(t===1) return Q(`For f(x) = (x + 1)/(x - ${n+2}), where is the vertical asymptote?`,`x = ${n+2}`,[`x = -${n+2}`,'y = 1','x = -1'],'The denominator is zero at this input and the numerator is nonzero, so the discontinuity is a vertical asymptote.');
  if(t===2) return Q(`Find the horizontal asymptote of f(x) = (${n+2}x² + 1)/(2x² + 3).`,`y = ${(n+2)/2}`,[`y = ${2/(n+2)}`,'y = 0',`x = ${(n+2)/2}`],'When numerator and denominator have equal degree, the horizontal asymptote is the ratio of their leading coefficients.');
  if(t===3) return Q(`The graph of f(x) = (x - ${n})²(x + 2) reaches x = ${n}. What happens there?`,'It touches the x-axis without crossing',['It crosses the x-axis','It has a vertical asymptote','It has a hole'],'The zero has even multiplicity, so the sign does not change as x passes through it.');
  return Q(`Where is the hole in f(x) = (x² - ${n*n})/(x - ${n})?`,`(${n}, ${2*n})`,[`(${-n}, 0)`,`(${n}, 0)`,`(${n}, ${n*n})`],`Cancel (x - ${n}) to get x + ${n} except at the excluded input. Its limiting value there is ${2*n}.`);
});
add('g11',3,'Exponential and Logarithmic Models','Functions and Models',(t,n)=>{
  if(t===0) return Q(`Solve 2^(x + ${n}) = ${2**(n+3)}.`,3,[n+3,2*n+3,2**(n+3)],`Rewrite the right side as 2^${n+3}. Equal bases give x + ${n} = ${n+3}, hence x = 3.`);
  if(t===1) return Q(`Solve ln(x - ${n}) = 0.`,n+1,[n,n-1,Math.E+n],`Exponentiate: x - ${n} = e^0 = 1. The result is inside the domain x > ${n}.`);
  if(t===2) return Q(`A sample starts at ${80*n} grams and halves every 4 hours. How much remains after 8 hours?`,`${20*n} grams`,[`${40*n} grams`,`${10*n} grams`,`${80*n-8} grams`],'Eight hours is two half-lives, so multiply the initial mass by (1/2)² = 1/4.');
  if(t===3) return Q(`For x > 0, expand ln(x^${n+2}).`,`${n+2} ln(x)`,[`ln(x) + ${n+2}`,`(ln(x))^${n+2}`,`ln(${n+2}x)`],'The logarithm power rule moves the exponent in front as a multiplier; it does not raise the logarithm itself to that power.');
  return Q(`A population follows P(t) = ${200*n}e^(0.04t). Which equation determines the doubling time?`,'e^(0.04t) = 2',[`e^(0.04t) = ${400*n}`,'0.04t = 2','e^(0.08t) = 1'],'Set P(t) to twice its starting value and divide both sides by the initial population.');
});
add('g11',4,'Radians and the Unit Circle','Trigonometry',(t,n)=>{
  if(t===0) return Q(`Convert ${30*n} degrees to radians.`,`${n}pi/6`,[`${n}pi/3`,`${n}pi/12`,`${6*n}pi`],'Multiply degrees by pi/180. Since 30/180 = 1/6, the angle becomes the stated multiple of pi/6.');
  if(t===1) return Q(`An angle measures ${n}pi/3 radians. What is its measure in degrees?`,60*n,[30*n,120*n,180*n],'Multiply radians by 180/pi. The pi factors cancel and 180/3 = 60.');
  if(t===2) return Q(`Find sin(pi/6 + ${2*n}pi).`,'1/2',['sqrt(3)/2','-1/2','-sqrt(3)/2'],'Adding a whole number of full turns does not change sine. sin(pi/6) = 1/2.');
  if(t===3) return Q(`A circle has radius ${n+2} meters. Find the arc length subtended by an angle of 2 radians.`,`${2*(n+2)} meters`,[`${n+2} meters`,`${(n+2)**2} meters`,`${4*(n+2)} meters`],'Arc length is r times the central angle in radians: s = r theta.');
  return Q(`An angle theta = ${2*n}pi + 2pi/3 ends in which quadrant?`,'Quadrant II',['Quadrant I','Quadrant III','Quadrant IV'],'Remove the full turns. The remaining angle is 120 degrees, between 90 and 180 degrees.');
});
add('g11',5,'Trigonometric Graphs and Identities','Trigonometry',(t,n)=>{
  if(t===0) return Q(`Find the amplitude of y = ${n+2}sin(2x) - 1.`,n+2,[2,1,2*(n+2)],'Amplitude is the absolute value of the multiplier outside sine. The frequency and vertical shift do not change it.');
  if(t===1) return Q(`Find the period of y = cos(${n+2}x).`,`2pi/${n+2}`,[`${2*(n+2)}pi`,`pi/${n+2}`,`${n+2}`],'Sine and cosine have period 2pi/|b| when their input is bx.');
  if(t===2) return Q(`Simplify ${n+2}(sin²(x) + cos²(x)).`,n+2,[2*(n+2),0,1],'The Pythagorean identity sin²(x) + cos²(x) = 1 holds for every real x. Multiply 1 by the coefficient.');
  if(t===3) return Q(`Find the midline of y = 3sin(x) + ${n+4}.`,`y = ${n+4}`,[`y = 3`,`y = ${n+7}`,`y = ${n+1}`],'The vertical shift gives the midline. Adding and subtracting the amplitude instead gives the maximum and minimum.');
  return Q(`The graph y = sin(x - ${n}pi/4) is shifted how relative to y = sin(x)?`,`Right by ${n}pi/4`,[`Left by ${n}pi/4`,`Up by ${n}pi/4`,`Down by ${n}pi/4`],'Subtracting a constant inside the input shifts the graph to the right. A vertical shift would be outside sine.');
});
add('g11',6,'Trigonometric Equations and Triangles','Trigonometry',(t,n)=>{
  if(t===0) return Q(`Solve ${n+2}sin(x) = 0 on 0 <= x < 2pi.`,`x = 0 or pi`,['x = 0 only','x = pi/2 or 3pi/2','x = 0, pi, or 2pi'],`Divide by ${n+2}. Sine is zero at 0 and pi in the half-open interval; 2pi is excluded.`);
  if(t===1) return Q(`Solve ${2*n}cos(x) = ${n} on 0 <= x < 2pi.`,`x = pi/3 or 5pi/3`,['x = pi/6 or 5pi/6','x = pi/3 only','x = 2pi/3 or 4pi/3'],'Divide to get cos(x) = 1/2. Cosine is positive in quadrants I and IV with reference angle pi/3.');
  if(t===2) return Q(`Two sides of a triangle are ${n+2} and ${n+3}, with included angle 90 degrees. Which expression is the third side squared?`,(n+2)**2+(n+3)**2,[(2*n+5)**2,(n+3)**2-(n+2)**2,2*(n+2)*(n+3)],'The law of cosines gives c² = a² + b² - 2ab cos(C). At 90 degrees the cosine term is zero.');
  if(t===3) return Q(`A triangle has a side ${n+2} opposite a 30-degree angle. A second side is opposite a 90-degree angle. How long is that second side?`,2*(n+2),[n+2,(n+2)/2,3*(n+2)],`By the law of sines, b/sin(90°) = ${n+2}/sin(30°). Since sin(30°) = 1/2, b = ${2*(n+2)}.`);
  return Q(`A triangle has sides ${2*n} and ${n+1} enclosing a 30-degree angle. Find its area.`,n*(n+1)/2,[n*(n+1),2*n*(n+1),n*(n+1)/4],'Use area = (1/2)ab sin(C). sin(30°) = 1/2, so area is one quarter of the product of the sides.');
});
add('g11',7,'Vectors and Conic Sections','Vectors and Further Functions',(t,n)=>{
  if(t===0) return Q(`Find the magnitude of vector <${3*n}, ${4*n}>.`,5*n,[7*n,25*n*n,n],'Magnitude is sqrt(x² + y²). These components form a scaled 3-4-5 right triangle.');
  if(t===1) return Q(`Compute <${n}, 2> dot <3, ${n+1}>.`,5*n+2,[3*n+2,5*n,6*n+2],'Multiply corresponding components and add: 3n + 2(n + 1). A dot product is a scalar.');
  if(t===2) return Q(`Add vectors <${n}, -2> and <3, ${n+4}>.`,`<${n+3}, ${n+2}>`,[`<${3*n}, ${-2*(n+4)}>`,`<${n-3}, ${-n-6}>`,`<${n+3}, ${n+6}>`],'Vector addition combines each coordinate separately, including its sign.');
  if(t===3) return Q(`The ellipse x²/${(n+3)**2} + y²/4 = 1 has what horizontal semi-axis length?`,n+3,[(n+3)**2,2,2*(n+3)],'In standard form the denominators are squares of semi-axis lengths. Take the positive square root.');
  return Q(`Find the vertex of y = (x - ${n})² + ${n+2}.`,`(${n}, ${n+2})`,[`(${-n}, ${n+2})`,`(${n}, ${-n-2})`,`(0, ${n*n+n+2})`],'Vertex form is y = a(x - h)² + k. The vertex is (h, k); the x sign is opposite the sign inside parentheses.');
});
add('g11',8,'Sequences, Series, and Limit Readiness','Vectors and Further Functions',(t,n)=>{
  if(t===0) return Q(`An arithmetic sequence starts at ${n} with common difference 3. Find its tenth term.`,n+27,[n+30,10*n+3,n+9],'a10 = a1 + (10 - 1)d. There are nine increments between the first and tenth terms.');
  if(t===1) return Q(`A geometric sequence starts ${n+1}, ${2*(n+1)}, ${4*(n+1)}. Find its fifth term.`,16*(n+1),[8*(n+1),32*(n+1),5*(n+1)],'The common ratio is 2, so a5 = a1 times 2^4.');
  if(t===2) return Q(`Find the infinite sum ${n} + ${n}/2 + ${n}/4 + ... .`,2*n,[n,n/2,4*n],'For |r| < 1, the geometric sum is a/(1-r). Here r = 1/2, giving twice the first term.');
  if(t===3) return Q(`For x not equal to ${n}, simplify (x² - ${n*n})/(x - ${n}) before studying its limit.`,`x + ${n}`,[`x - ${n}`,`2x + ${n}`,'x²'],'Factor a difference of squares and cancel the common nonzero factor. The excluded input remains excluded in the original function.');
  return Q(`As x approaches ${n}, what value does 2x + 3 approach?`,2*n+3,[2*n,2*n-3,n+3],'A linear function is continuous, so its limiting value is found by substitution.');
});

// Calculus uses numerical problems, rule selection, error analysis, and applications.
add('g12',1,'Limits and Continuity','Limits and Differentiation',(t,n)=>{
  if(t===0) return Q(`Evaluate the limit of (x² - ${n*n})/(x - ${n}) as x approaches ${n}.`,2*n,[0,n,n*n],'Factor and cancel for nearby x, obtaining x + n. The original expression need not be defined at the limit point.');
  if(t===1) return Q(`A function equals x + ${n} for x < 2 and 3x + c for x >= 2. What c makes it continuous at 2?`,n-4,[n+4,n-2,n+2],`Match the one-sided values: 2 + ${n} = 6 + c, so c = ${n-4}.`);
  if(t===2) return Q(`Evaluate the limit of (${n+1}x² + 1)/(2x² + 5) as x tends to positive infinity.`,(n+1)/2,[(n+1)*2,0,5/2],'Divide numerator and denominator by x². Terms with 1/x² vanish, leaving the ratio of leading coefficients.');
  if(t===3) return Q(`At x = ${n}, the left-hand limit is 2 and the right-hand limit is 5. What is the two-sided limit?`,'It does not exist',['2','5','3.5'],'A two-sided limit exists only if both one-sided limits agree. Averaging them does not give a limit.');
  return Q(`Evaluate the limit of sin(${n+1}x)/x as x approaches 0, using radians.`,n+1,[1,0,1/(n+1)],`Rewrite as ${n+1} times sin((${n+1})x)/((${n+1})x), then use the standard limit sin(u)/u = 1.`);
});
add('g12',2,'Derivatives and Tangent Lines','Limits and Differentiation',(t,n)=>{
  if(t===0) return Q(`For f(x) = x², find f'(${n+1}).`,2*(n+1),[(n+1)**2,n+1,0],`The derivative of x² is 2x. Evaluate at x = ${n+1}.`);
  if(t===1) return Q(`Find the derivative of f(x) = ${n+2}x³.`,`${3*(n+2)}x²`,[`${n+2}x²`,`${3*(n+2)}x³`,`${n+2}x⁴/4`],'The power rule multiplies by the exponent and then reduces the exponent by one.');
  if(t===2) return Q(`A position is s(t) = t² + ${n}t meters. Find velocity at t = 3 seconds.`,`${6+n} m/s`,[`${9+3*n} m/s`,`${3+n} m/s`,'2 m/s'],'Velocity is the derivative of position: s prime(t) = 2t + n. Substitute t = 3.');
  if(t===3) return Q(`Find the tangent line to y = x² at x = ${n}.`,`y = ${2*n}x - ${n*n}`,[`y = ${n}x`,`y = ${2*n}x + ${n*n}`,`y = ${n*n}`],`Use point-slope form with point (${n}, ${n*n}) and slope ${2*n}: y - ${n*n} = ${2*n}(x - ${n}).`);
  return Q(`What is the derivative of the constant function f(x) = ${7*n}?`,0,[7*n,1,7],'A constant function has no change in output, so its slope and derivative are zero everywhere.');
});
add('g12',3,'Product, Quotient, and Chain Rules','Limits and Differentiation',(t,n)=>{
  if(t===0) return Q(`Differentiate (3x + ${n})⁴.`,`12(3x + ${n})³`,[`4(3x + ${n})³`,`12(3x + ${n})⁴`,`(3x + ${n})³`],'Apply the outer power rule, then multiply by the inner derivative 3.');
  if(t===1) return Q(`Find f'(1) for f(x) = x²(x + ${n}).`,3+2*n,[2*(n+1),n+3,2*n+1],`The product rule gives 2x(x + ${n}) + x². At x = 1 this is ${3+2*n}.`);
  if(t===2) return Q(`Differentiate x/(x + ${n}), where x is not -${n}.`,`${n}/(x + ${n})²`,[`1/(x + ${n})`,`-${n}/(x + ${n})²`,'1'],'The quotient rule gives [(x + n) - x]/(x + n)², which simplifies to n/(x + n)².');
  if(t===3) return Q(`Differentiate e^(${n+1}x).`,`${n+1}e^(${n+1}x)`,[`e^(${n+1}x)`,`${n+1}e^x`,`e^(${n+1}x)/${n+1}`],'The derivative of e^u is e^u times u prime. Here the inner derivative is n + 1.');
  return Q(`Differentiate sin(${n+1}x), with x in radians.`,`${n+1}cos(${n+1}x)`,[`cos(${n+1}x)`,`-${n+1}cos(${n+1}x)`,`${n+1}sin(${n+1}x)`],'The derivative of sine is cosine; the chain rule also multiplies by the inner coefficient.');
});
add('g12',4,'Applications of Derivatives','Derivative Applications',(t,n)=>{
  if(t===0) return Q(`For f(x) = x² - ${2*n}x, at which x does f have its minimum?`,n,[-n,2*n,n*n],`Set f prime(x) = 2x - ${2*n} to zero. The second derivative is positive, confirming a minimum.`);
  if(t===1) return Q(`A rectangle has perimeter ${8*n} meters. Which width maximizes its area?`,`${2*n} meters`,[`${4*n} meters`,`${n} meters`,`${8*n} meters`],'With fixed perimeter P, area is w(P/2 - w). Its derivative is P/2 - 2w, so the maximum occurs at w = P/4.');
  if(t===2) return Q(`A circle's radius increases at 2 cm/s. How fast is its area increasing when r = ${n+2} cm?`,`${4*(n+2)}pi square cm/s`,[`${2*(n+2)}pi square cm/s`,`${(n+2)**2}pi square cm/s`,'4pi square cm/s'],'Differentiate A = pi r² with respect to time: dA/dt = 2pi r dr/dt. Substitute both the radius and its rate.');
  if(t===3) return Q(`For f(x) = x³ - ${3*n*n}x, find f''(${n}).`,6*n,[3*n*n,0,6],'The first derivative is 3x² - 3n²; the second derivative is 6x. Evaluate at x = n.');
  return Q(`A function has derivative f'(x) = x - ${n}. On which interval is it decreasing?`,`x < ${n}`,[`x > ${n}`,'All real x','It never decreases'],'A function decreases where its derivative is negative. Solve x - n < 0.');
});
add('g12',5,'Antiderivatives and Definite Integrals','Integration',(t,n)=>{
  if(t===0) return Q(`Find an antiderivative of ${2*n}x.`,`${n}x²`,[`${2*n}x²`,`${n}x`,`${2*n}`],`Differentiate ${n}x² to check: its derivative is ${2*n}x. A general antiderivative also includes an arbitrary constant.`);
  if(t===1) return Q(`Evaluate the integral from 0 to ${n} of 2x dx.`,n*n,[2*n*n,2*n,n*n/2],`An antiderivative is x². Evaluate upper minus lower: ${n}² - 0² = ${n*n}.`);
  if(t===2) return Q(`Evaluate the integral from 1 to 4 of ${n+1} dx.`,3*(n+1),[4*(n+1),n+1,5*(n+1)],'A constant integral is the rectangle area: constant height times interval length, 4 - 1 = 3.');
  if(t===3) return Q(`The integral of f from 0 to 2 is ${n+3}. What is its integral from 2 to 0?`,-n-3,[n+3,0,2*(n+3)],'Reversing the integration bounds changes the sign of the definite integral.');
  return Q(`A rate is r(t) = ${n+2} liters/minute for 5 minutes. What net volume accumulates?`,`${5*(n+2)} liters`,[`${n+2} liters`,`${n+7} liters`,`${(n+2)/5} liters`],'Net accumulation is the integral of the rate. A constant rate gives rate multiplied by elapsed time.');
});
add('g12',6,'The Fundamental Theorem and Area','Integration',(t,n)=>{
  if(t===0) return Q(`Let F(x) be the integral from 0 to x of (t² + ${n}) dt. What is F'(x)?`,`x² + ${n}`,[`2x`,`x³/3 + ${n}x`,`${n}`],'The Fundamental Theorem says differentiating an integral with variable upper bound x returns the continuous integrand at x.');
  if(t===1) return Q(`Let H(x) be the integral from 0 to x² of (t + ${n}) dt. Find H'(x).`,`2x(x² + ${n})`,[`x² + ${n}`,`2x + ${n}`,`x⁴/2 + ${n}x²`],'Evaluate the integrand at the upper bound x², then multiply by its derivative 2x using the chain rule.');
  if(t===2) return Q(`Evaluate the integral from 0 to 1 of ${3*n}x² dx.`,n,[3*n,n/3,0],`An antiderivative is ${n}x³. Upper minus lower gives ${n}(1)³ - ${n}(0)³.`);
  if(t===3) return Q(`A velocity is v(t) = -${n+1} m/s from t = 0 to t = 3. What is displacement?`,`${-3*(n+1)} meters`,[`${3*(n+1)} meters`,`${-n-1} meters`,'0 meters'],'Displacement is the signed integral of velocity. Distance would use the absolute value instead.');
  return Q(`Find the area between y = ${n+2} and y = 1 from x = 0 to x = 2.`,2*(n+1),[2*(n+2),n+1,2*(n+3)],'Integrate top minus bottom. The constant height difference is n + 1 across an interval of length 2.');
});
add('g12',7,'Substitution and Integral Models','Integration Applications',(t,n)=>{
  if(t===0) return Q(`Find the general antiderivative of 2x(x² + ${n})³.`,`(x² + ${n})⁴/4 + C`,[`(x² + ${n})⁴ + C`,`6x(x² + ${n})² + C`,`(x² + ${n})³/3 + C`],'Set u = x² + n, so du = 2x dx. Integrate u³ to get u⁴/4, then substitute back.');
  if(t===1) return Q(`For substitution u = ${n+1}x + 1, what is du?`,`${n+1} dx`,['dx',`x dx`,`${n+1}x dx`],'Differentiate u with respect to x. The constant term disappears and the linear coefficient remains.');
  if(t===2) return Q(`Evaluate the integral from 0 to 1 of 2x(x² + ${n}) dx.`,n+0.5,[n+1,2*n+1,n/2],`Use u = x² + ${n}, with bounds ${n} and ${n+1}. The result is [u²/2] = ${num(((n+1)**2-n*n)/2)}.`);
  if(t===3) return Q(`A solid has cross-sectional area A(x) = ${n}x² for 0 <= x <= 3. Find its volume.`,9*n,[27*n,3*n,18*n],'Integrate cross-sectional area: n[x³/3] from 0 to 3 = 9n cubic units.');
  return Q(`Find the average value of f(x) = ${n}x on [0, 2].`,n,[2*n,n/2,4*n],'Average value is the integral divided by interval length. The integral is 2n; dividing by 2 gives n.');
});
add('g12',8,'Differential Equations and Numerical Methods','Integration Applications',(t,n)=>{
  if(t===0) return Q(`Solve dy/dx = 2x with y(0) = ${n}.`,`y = x² + ${n}`,[`y = 2x + ${n}`,`y = x² - ${n}`,`y = 2x² + ${n}`],'Integrate to y = x² + C, then substitute the initial condition to find C = n.');
  if(t===1) return Q(`A population satisfies P' = 0.2P and P(0) = ${10*n}. Which solution fits?`,`P(t) = ${10*n}e^(0.2t)`,[`P(t) = ${10*n} + 0.2t`,`P(t) = 0.2e^(${10*n}t)`,`P(t) = ${10*n}e^(-0.2t)`],'A rate proportional to the current population gives exponential growth. The initial value supplies the coefficient.');
  if(t===2) return Q(`Use one Euler step of size 0.5 for y' = x + y from (0, ${n}). What is the estimated y at x = 0.5?`,1.5*n,[n+0.5,2*n,0.5*n],`Euler's method uses y new = y old + h f(x old, y old) = ${n} + 0.5(${n}).`);
  if(t===3) return Q(`Approximate the integral of f(x) = x² on [0, ${2*n}] using one trapezoid.`,4*n**3,[8*n**3,2*n**3,4*n*n],`The trapezoid rule gives width times average endpoint height: ${2*n} × (0 + ${4*n*n})/2.`);
  return Q(`A slope field represents y' = y - ${n}. Along which horizontal line are all slopes zero?`,`y = ${n}`,[`y = -${n}`,'y = 0',`x = ${n}`],'Set y - n = 0. This constant solution is an equilibrium because its derivative is zero.');
});

// Grade 11 reading, science, and history use hand-authored scenario questions.
const seniorFile = path.join(__dirname, 'grade11-content.json');
{
  for (const [key, record] of Object.entries(JSON.parse(fs.readFileSync(seniorFile, 'utf8')))) {
    data[key] = { name: record.name, topic: record.name, contentVersion: '20260907.1', questions: record.items.map(([q,a,w,e],i) => {
      const question = Q(q,a,w,e);
      const shift = i % 4;
      question.choices = question.choices.slice(shift).concat(question.choices.slice(0,shift));
      return question;
    }) };
  }
}
for (const grade of ['g9','g10','g11','g12']) {
  const records = Object.fromEntries(Object.entries(data).filter(([key]) => key.startsWith(`${grade}:`) && !key.startsWith(`${grade}:alg1:`)));
  const topics = {};
  for (const [key, record] of Object.entries(records)) {
    const course = key.split(':').slice(0,2).join(':');
    const list = topics[course] ||= [];
    const subject=key.split(':')[1];
    const number=Number(key.split(':')[2].slice(1));
    const fallbackTopics={eng:['Reading and Literature','Vocabulary and Language','Grammar and Writing','Research and Synthesis'],sci:['Scientific Foundations','Systems and Change','Evidence and Investigation','Applications and Analysis'],hist:['Historical Foundations','Conflict and Change','Government and Society','Evidence and Analysis']};
    const title = grade==='g10'&&subject==='math'
      ? ['Models and Logarithms','Polynomials and Quadratics','Functions and Equations','Statistics and Modeling'][Math.floor((number-1)/5)]
      : record.topic || (fallbackTopics[subject]?.[Math.floor((number-1)/5)]) || record.name;
    let topic = list.find(item => item.name === title);
    if (!topic) list.push(topic = { name: title, lessons: [] });
    topic.lessons.push({ key, name: record.name });
  }
  const serialized = ['g9','g10'].includes(grade)
    ? '{\n'+Object.entries(records).map(([key,{questions,...metadata}])=>`  ${JSON.stringify(key)}: {\n${Object.entries(metadata).map(([field,value])=>`    ${JSON.stringify(field)}: ${JSON.stringify(value)},`).join('\n')}\n    "questions": [\n${questions.map(question=>'      '+JSON.stringify(question)).join(',\n')}\n    ]\n  }`).join(',\n')+'\n}'
    : JSON.stringify(records,null,2);
  fs.writeFileSync(path.join(root, `components/k12-classic-25-${grade}.js`), `/* Explicit 25-question lessons. Source: scripts/build-course-banks.js. */\n(function(){\n  window.K12_CLASSIC_25_DATA = window.K12_CLASSIC_25_DATA || Object.create(null);\n  Object.assign(window.K12_CLASSIC_25_DATA, ${serialized});\n  window.K12_CLASSIC_25_TOPICS = window.K12_CLASSIC_25_TOPICS || Object.create(null);\n  Object.assign(window.K12_CLASSIC_25_TOPICS, ${JSON.stringify(topics,null,2)});\n})();\n`);
}
console.log('Updated Grade 9–12 course banks.');
