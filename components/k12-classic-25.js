/* Classic 25-question lesson banks.
   Each grade is loaded only when a learner opens one of its lessons. */
(function(){
  const loadedGrades=new Set();
  const pendingGrades=new Map();
  const release="expanded-grades-20260905.2";
  const courseNameOverrides={
    "g11:math:L1":"Algebra 2 Functions and Modeling",
    "g11:math:L2":"Algebra 2 Equations, Systems, and Sequences",
    "g12:math:L1":"Precalculus Functions and Trigonometry",
    "g12:math:L2":"Calculus Foundations"
  };
  const courseLessonOverrides={
    "g11:math:L1":[
      ["polynomial functions","A polynomial function combines nonnegative whole-number powers of a variable; degree and leading coefficient determine its end behavior.","A graphing task asks how a fifth-degree polynomial behaves far to the left and right."],
      ["rational functions","A rational function is a quotient of polynomials, and input values that make its denominator zero must be excluded.","A model contains (x + 2)/(x - 4), so the learner must identify the restricted input."],
      ["exponential functions","An exponential function changes by a constant multiplicative factor over equal input intervals.","A population grows by 6 percent each year and must be represented with a function."],
      ["logarithmic functions","A logarithm gives the exponent needed to produce a value and reverses the matching exponential function.","An equation asks for the exponent to which 10 must be raised to produce 1,000."],
      ["composition and inverses","Function composition uses one function's output as another's input, while an inverse reverses a one-to-one input-output rule.","A temperature conversion is applied and then reversed to recover the original measurement."]
    ],
    "g11:math:L2":[
      ["quadratic formula and discriminant","The quadratic formula solves ax² + bx + c = 0, and b² - 4ac indicates the number and type of solutions.","A quadratic does not factor easily, so its discriminant is checked before solving."],
      ["complex solutions","Complex numbers extend the real numbers with i² = -1 and allow negative square roots to appear in quadratic solutions.","A quadratic has a negative discriminant and therefore requires nonreal solutions."],
      ["nonlinear systems","A solution of a nonlinear system is an ordered pair that satisfies every equation and appears at an intersection of their graphs.","A line and a parabola intersect twice, and both points must be verified."],
      ["radical equations","Solving a radical equation requires isolating the radical, applying a power, and checking for extraneous solutions.","Squaring both sides produces a candidate that fails in the original equation."],
      ["sequences and series","Arithmetic sequences have a constant difference, while geometric sequences have a constant ratio; series add their terms.","A savings plan increases by a fixed amount while another grows by a fixed percent."]
    ],
    "g12:math:L1":[
      ["unit-circle trigonometry","The unit circle connects angles in radians with coordinates (cos θ, sin θ) and exact trigonometric values.","A learner must find sine and cosine at 5π/6 without a calculator."],
      ["trigonometric identities","A trigonometric identity is an equation true throughout its domain and can be verified by transforming one side with established identities.","An expression containing sin²θ + cos²θ must be simplified."],
      ["vectors","A vector has magnitude and direction and can be resolved into components for addition, projection, and modeling.","Two forces acting at different angles must be combined into one resultant force."],
      ["conic sections","Circles, parabolas, ellipses, and hyperbolas can be recognized from their standard equations and geometric definitions.","Completing the square reveals the center and radii of an ellipse."],
      ["limits and continuity","A limit describes the value a function approaches, while continuity additionally requires the function to be defined there with the same value.","A piecewise function has a removable hole, and its limiting value must be distinguished from its assigned value."]
    ],
    "g12:math:L2":[
      ["derivatives","A derivative measures instantaneous rate of change and equals the slope of a tangent line when the derivative exists.","A position function is used to determine an object's velocity at one instant."],
      ["chain rule","The chain rule differentiates a composite function by multiplying the outer derivative by the inner derivative.","A learner differentiates (3x² + 1)^5 without expanding it."],
      ["definite integrals","A definite integral represents signed accumulation over an interval and can model net change or area.","A variable flow rate must be accumulated over three hours."],
      ["Fundamental Theorem of Calculus","The Fundamental Theorem connects differentiation and integration and evaluates a definite integral with an antiderivative.","An antiderivative is used to evaluate an accumulated change between two endpoints."],
      ["optimization and modeling","Optimization uses derivatives, domain constraints, and endpoint checks to locate meaningful maximum or minimum values.","A fixed amount of fencing must enclose the greatest possible rectangular area."]
    ]
  };

  function buildCourseQuestions(key){
    const concepts=courseLessonOverrides[key];
    if(!concepts) return null;
    const stems=[
      (term)=>`Which statement correctly explains ${term}?`,
      (term,scenario)=>`${scenario} Which ${term} principle should guide the solution?`,
      (term)=>`A student gives an incomplete explanation of ${term}. Which statement corrects the explanation?`,
      (term)=>`Which relationship is essential when applying ${term} in a multi-step problem?`,
      (term,scenario)=>`Mastery check: ${scenario} Which statement provides the strongest mathematical justification?`
    ];
    return Array.from({length:25},(_,index)=>{
      const conceptIndex=index%5,round=Math.floor(index/5);
      const [term,answer,scenario]=concepts[conceptIndex];
      const distractors=concepts.filter((_,other)=>other!==conceptIndex).map(item=>item[1]);
      const choices=[answer,...distractors.slice(round%2,round%2+3)];
      while(choices.length<4) choices.push(distractors[choices.length-1]);
      const shift=index%4;
      return {type:"mc",q:stems[round](term,scenario),choices:choices.slice(shift).concat(choices.slice(0,shift)),answer,explain:`${answer} This directly addresses the ${term} relationship required by the problem.`,audio:`Apply ${term}.`};
    });
  }

  function cloneQuestion(question){
    if(typeof structuredClone==="function") return structuredClone(question);
    return JSON.parse(JSON.stringify(question));
  }

  function installGrade(grade){
    if(typeof window.K12RepairClassicBank==="function") window.K12RepairClassicBank(grade);
    const data=window.K12_CLASSIC_25_DATA||{};
    const entries=Object.entries(data).filter(([key])=>key.startsWith(`${grade}:`));
    if(!entries.length) throw new Error(`No classic question banks loaded for ${grade}.`);

    entries.forEach(([key,record])=>{
      const [,subject,lesson]=key.split(":");
      const group=CURR?.[grade]?.[subject];
      if(!group) throw new Error(`Missing lesson group ${grade}:${subject}.`);
      const pack=group[lesson]||makeFallbackLessonPack(grade,subject,lesson);
      const questions=buildCourseQuestions(key)||(Array.isArray(record.questions)?record.questions:[]);
      if(questions.length<25){
        console.error(`${key} has only ${questions.length} questions and was skipped.`);
        return;
      }
      const lessonQuestions=questions.slice(0,25);
      pack.name=courseNameOverrides[key]||record.name||pack.name;
      pack.questions=lessonQuestions;
      pack.gen=()=>cloneQuestion(lessonQuestions[Math.max(0,Math.min(24,Number(LR.round||1)-1))]);
      pack.generatorSource="classic-explicit-25";
      group[lesson]=pack;
    });

    loadedGrades.add(grade);
    return entries.length;
  }

  function ensureGrade(grade){
    if(loadedGrades.has(grade)) return Promise.resolve(true);
    if(pendingGrades.has(grade)) return pendingGrades.get(grade);
    const promise=new Promise((resolve,reject)=>{
      const script=document.createElement("script");
      script.src=`components/k12-classic-25-${grade}.js?v=${release}`;
      script.async=true;
      script.onload=()=>{
        try{ installGrade(grade); resolve(true); }
        catch(error){ reject(error); }
      };
      script.onerror=()=>reject(new Error(`Could not load the 25-question bank for ${grade}.`));
      document.head.appendChild(script);
    }).finally(()=>pendingGrades.delete(grade));
    pendingGrades.set(grade,promise);
    return promise;
  }

  window.K12Classic25={
    ensureGrade,
    installGrade,
    isLoaded:grade=>loadedGrades.has(grade),
    release
  };
})();
