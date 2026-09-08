/* Hands-on Grade 1 math lessons that use the shared lesson runner. */
(function(){
  const banks=window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);
  const additions=Array.from({length:25},(_,index)=>{
    const left=index%9+1;
    const right=(index*3)%9+1;
    return {type:"block-add",q:`Block challenge ${index+1}: Build ${left} + ${right}, then check the total.`,left,right,answer:left+right,audio:`Block challenge ${index+1}. Build ${left} plus ${right} with blocks.`};
  });
  const numberLines=Array.from({length:25},(_,index)=>{
    const start=index%8;
    const jump=index%6+1;
    const direction=index%4===3?"back":"forward";
    const safeStart=direction==="back"?Math.max(jump,start+jump):start;
    const answer=direction==="back"?safeStart-jump:safeStart+jump;
    return {type:"number-line",q:`Number-line challenge ${index+1}: Start at ${safeStart}. Jump ${jump} spaces ${direction}. Where do you land?`,start:safeStart,jump,direction,max:20,answer,audio:`Number-line challenge ${index+1}. Start at ${safeStart}. Jump ${jump} spaces ${direction}.`};
  });
  const fractions=Array.from({length:25},(_,index)=>{
    const denominator=[2,3,4][index%3];
    const numerator=index%denominator+1;
    return {type:"fraction-build",q:`Fraction challenge ${index+1}: Shade ${numerator} of ${denominator} equal parts to build ${numerator}/${denominator}.`,numerator,denominator,answer:`${numerator}/${denominator}`,audio:`Fraction challenge ${index+1}. Shade ${numerator} of ${denominator} equal parts.`};
  });
  banks["g1:math:block-add"]={name:"Addition Block Builder",questions:additions};
  banks["g1:math:number-line-lab"]={name:"Number Line Jump Lab",questions:numberLines};
  banks["g1:math:fraction-builder"]={name:"Fraction Shape Builder",questions:fractions};
})();
