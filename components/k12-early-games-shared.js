/* Shared entry point for the explicit Pre-K, Kindergarten, and Grade 1 banks. */
window.K12_EARLY_BANKS=window.K12_EARLY_BANKS||Object.create(null);

function startEarlyBank(key,backId){
  const record=window.K12_EARLY_BANKS[key];
  if(!record||!Array.isArray(record.questions)||record.questions.length!==25){
    console.error("Invalid early-grade lesson bank",key,record);
    toast("This lesson is still loading. Please try again.");
    return;
  }
  if(typeof startUnifiedEarlyLesson!=="function"){
    console.error("The shared lesson runner is unavailable for",key);
    toast("The lesson runner is still loading. Please try again.");
    return;
  }
  startUnifiedEarlyLesson(key,backId||"grades");
}
