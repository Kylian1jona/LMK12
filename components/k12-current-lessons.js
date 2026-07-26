/* Authoritative lesson catalog.
   Load after every current lesson installer and before TEKS/release validation.

   New or revised lessons should be installed into CURR first. Rebuilding this
   catalog then makes that final pack the only pack used by the lesson runner,
   search, and selector-label synchronization. Legacy generator globals remain
   harmless because runtime lookups come through this catalog.
*/
(function installCurrentLessonCatalog(){
  "use strict";

  const catalog = new Map();
  const selectorPattern = /startLesson\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g;
  const audit = {
    lessons:0,
    selectors:0,
    renamedSelectors:0,
    invalidSelectors:[],
    duplicateLessonKeys:[]
  };

  function lessonKey(grade, subject, lesson){
    return [grade, subject, lesson].map(value=>String(value || "").trim()).join(":");
  }

  function rebuild(){
    catalog.clear();
    audit.lessons = 0;
    audit.duplicateLessonKeys.length = 0;

    Object.entries(CURR || {}).forEach(([grade, subjects])=>{
      Object.entries(subjects || {}).forEach(([subject, lessons])=>{
        Object.entries(lessons || {}).forEach(([lesson, pack])=>{
          if(lesson === "showName" || !pack || typeof pack.gen !== "function") return;
          const key = lessonKey(grade, subject, lesson);
          if(catalog.has(key)) audit.duplicateLessonKeys.push(key);
          pack.currentLessonKey = key;
          pack.generatorSource = "current-25-question";
          catalog.set(key, pack);
          audit.lessons++;
        });
      });
    });

    return audit.lessons;
  }

  function get(grade, subject, lesson){
    return catalog.get(lessonKey(grade, subject, lesson)) || null;
  }

  function parseSelector(button){
    const handler = String(button?.getAttribute?.("onclick") || "");
    const matches = [...handler.matchAll(selectorPattern)];
    if(matches.length !== 1) return {error:`Selector must launch exactly one lesson; found ${matches.length}.`};
    const [, grade, subject, lesson] = matches[0];
    const pack = get(grade, subject, lesson);
    if(!pack) return {error:`Selector points to missing lesson ${lessonKey(grade, subject, lesson)}.`};
    return {grade, subject, lesson, pack};
  }

  function setSelectorLabel(button, label){
    const medals = [...button.children].filter(child=>child.matches?.(".lesson-selector-medal,.lesson-medal-count"));
    const existingLabel = button.querySelector(":scope > .lesson-selector-current-label");
    const labelSource = existingLabel || button.cloneNode(true);
    if(!existingLabel){
      labelSource.querySelectorAll?.(".lesson-selector-medal,.lesson-medal-count").forEach(node=>node.remove());
    }
    const current = String(labelSource.textContent || "").replace(/\s+/g, " ").trim();
    if(current === label){
      button.setAttribute("aria-label", label);
      return false;
    }

    const labelNode = document.createElement("span");
    labelNode.className = "lesson-selector-current-label";
    labelNode.textContent = label;
    button.replaceChildren(labelNode, ...medals);
    button.setAttribute("aria-label", label);
    return current !== label;
  }

  function syncSelectorButtons(root=document){
    if(!root?.querySelectorAll) return 0;
    const seenSelectorKeys = new Set();
    audit.selectors = 0;
    audit.renamedSelectors = 0;
    audit.invalidSelectors.length = 0;

    root.querySelectorAll('button[onclick*="startLesson("]').forEach((button, index)=>{
      audit.selectors++;
      const parsed = parseSelector(button);
      if(parsed.error){
        audit.invalidSelectors.push(`button ${index + 1}: ${parsed.error}`);
        button.setAttribute("aria-disabled", "true");
        return;
      }

      const {grade, subject, lesson, pack} = parsed;
      const key = lessonKey(grade, subject, lesson);
      if(seenSelectorKeys.has(key)){
        audit.invalidSelectors.push(`button ${index + 1}: More than one selector points to ${key}.`);
        return;
      }
      seenSelectorKeys.add(key);
      button.dataset.lessonGrade = grade;
      button.dataset.lessonSubject = subject;
      button.dataset.lessonId = lesson;
      if(setSelectorLabel(button, String(pack.name || lesson).trim())) audit.renamedSelectors++;
    });

    return audit.renamedSelectors;
  }

  rebuild();

  window.K12CurrentLessons = Object.freeze({
    get,
    rebuild,
    syncSelectorButtons,
    key:lessonKey,
    count:()=>catalog.size,
    entries:()=>[...catalog.entries()].map(([key, pack])=>{
      const [grade, subject, lesson] = key.split(":");
      return {key, grade, subject, lesson, pack};
    })
  });
  window.K12_CURRENT_LESSONS_AUDIT = audit;

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ()=>syncSelectorButtons(), {once:true});
  }else{
    syncSelectorButtons();
  }
})();
