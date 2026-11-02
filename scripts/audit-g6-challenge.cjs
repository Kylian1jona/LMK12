const fs = require("node:fs");
const vm = require("node:vm");

const window = { K12_CLASSIC_25_DATA: {} };
vm.runInNewContext(fs.readFileSync("components/k12-classic-25-g6.js", "utf8"), { window });
const lessons = Object.entries(window.K12_CLASSIC_25_DATA).filter(([key]) => key.startsWith("g6:"));
const upgraded = new Set(["g6:math:L1", "g6:math:L2", "g6:math:L3"]);
if (process.argv[2]) {
  const lesson = window.K12_CLASSIC_25_DATA[process.argv[2]];
  if (!lesson) throw new Error(`Unknown lesson ${process.argv[2]}`);
  lesson.questions.forEach((question, index) => console.log(`${index + 1}. ${question.q}\n   ${question.choices?.join(" | ")}\n   Answer: ${question.answer}`));
  process.exit();
}
const problems = [];
for (const [key, lesson] of lessons) {
  if (lesson.questions.length !== 25) problems.push(`${key}: ${lesson.questions.length} questions`);
  const prompts = new Set();
  for (const [index, question] of lesson.questions.entries()) {
    if (upgraded.has(key) && prompts.has(question.q)) problems.push(`${key} #${index + 1}: repeated prompt`);
    prompts.add(question.q);
    if (upgraded.has(key) && /^(?:True or false:.*correctly answers|Which answer (?:correctly resolves|to|satisfies)|When .* are compared for)/i.test(question.q)) problems.push(`${key} #${index + 1}: malformed prompt`);
    if (question.type === "mc" && (!question.choices.includes(question.answer) || new Set(question.choices).size !== question.choices.length)) problems.push(`${key} #${index + 1}: invalid choices`);
  }
}
console.log(`${lessons.length} Grade 6 lessons, ${lessons.reduce((n, [, lesson]) => n + lesson.questions.length, 0)} questions`);
if (problems.length) {
  console.error(problems.slice(0, 30).join("\n"));
  console.error(`${problems.length} problems total`);
  process.exitCode = 1;
}
