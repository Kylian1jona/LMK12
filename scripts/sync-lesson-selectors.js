/* Keep static lesson-button labels aligned with the final current catalog.
   Run with `node scripts/sync-lesson-selectors.js --check` in CI/audits, or
   without --check after changing lesson names. */
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const runtimeFiles = [
  "components/k12-helpers.js",
  "components/k12-governance.js",
  "components/k12-lesson-core.js",
  "components/k12-generators-g2-g3.js",
  "components/k12-generators-g4.js",
  "components/k12-generators-g5-g6.js",
  "components/k12-generators-g7-g10.js",
  "components/k12-curriculum.js",
  "components/k12-mastery-tools.js",
  "components/k12-history-progression.js",
  "components/k12-spelling-lessons.js",
  "components/k12-secondary-g7-progression.js",
  "components/k12-secondary-g8-progression.js",
  "components/k12-secondary-g9-progression.js",
  "components/k12-secondary-g10-progression.js",
  "components/k12-current-lessons.js"
];
const selectorFiles = [
  "components/grade2-4-sections.js",
  "components/grade5-6-sections.js",
  "components/grade7-10-sections.js",
  "components/history-runner.js"
];

const context = vm.createContext({
  console:{log(){},info(){},warn(){},error(){}},
  Math, JSON, Date, Set, Map, structuredClone,
  setTimeout(){ return 0; },
  clearTimeout(){},
  setInterval(){ return 0; },
  clearInterval(){},
  window:{},
  document:{
    readyState:"complete",
    getElementById(){ return null; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    createElement(){ return {}; },
    body:{appendChild(){}}
  },
  localStorage:{getItem(){ return null; },setItem(){},removeItem(){}}
});
context.window = context;

runtimeFiles.forEach(file=>{
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, {filename:file});
});

const names = new Map(JSON.parse(vm.runInContext(
  `JSON.stringify(window.K12CurrentLessons.entries().map(entry=>[entry.key,String(entry.pack.name||entry.lesson)]))`,
  context
)));
const buttonPattern = /<button\b[\s\S]*?<\/button>/gi;
const lessonCallPattern = /startLesson\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/g;
const checkOnly = process.argv.includes("--check");
let selectorCount = 0;
let changedCount = 0;
const failures = [];
const seen = new Set();

function visibleText(markup){
  return String(markup)
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlSafe(value){
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

selectorFiles.forEach(file=>{
  const absolute = path.join(root, file);
  const source = fs.readFileSync(absolute, "utf8");
  const updated = source.replace(buttonPattern, button=>{
    const calls = [...button.matchAll(lessonCallPattern)];
    if(!calls.length) return button;
    selectorCount++;
    if(calls.length !== 1){
      failures.push(`${file}: one button launches ${calls.length} lessons`);
      return button;
    }

    const [, grade, subject, lesson] = calls[0];
    const key = `${grade}:${subject}:${lesson}`;
    if(seen.has(key)) failures.push(`${file}: duplicate selector for ${key}`);
    seen.add(key);
    const expected = names.get(key);
    if(!expected){
      failures.push(`${file}: selector points to missing ${key}`);
      return button;
    }

    const openEnd = button.indexOf(">") + 1;
    const closeStart = button.toLowerCase().lastIndexOf("</button>");
    const inner = button.slice(openEnd, closeStart);
    if(visibleText(inner) === expected) return button;
    changedCount++;
    const leading = inner.match(/^\s*/)?.[0] || "";
    const trailing = inner.match(/\s*$/)?.[0] || "";
    return `${button.slice(0, openEnd)}${leading}${htmlSafe(expected)}${trailing}${button.slice(closeStart)}`;
  });

  if(!checkOnly && updated !== source) fs.writeFileSync(absolute, updated, "utf8");
});

names.forEach((_, key)=>{
  if(!seen.has(key)) failures.push(`No selector points to ${key}`);
});
if(selectorCount !== names.size) failures.push(`Found ${selectorCount} lesson buttons for ${names.size} lessons`);
if(checkOnly && changedCount) failures.push(`${changedCount} selector labels are out of date`);

process.stdout.write(`${JSON.stringify({
  lessons:names.size,
  selectors:selectorCount,
  changed:changedCount,
  failures
}, null, 2)}\n`);
if(failures.length) process.exitCode = 1;
