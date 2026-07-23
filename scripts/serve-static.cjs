const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.argv[2] || 4173);
const types = {
  ".html":"text/html; charset=utf-8",
  ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".json":"application/json; charset=utf-8",
  ".png":"image/png",
  ".jpg":"image/jpeg",
  ".jpeg":"image/jpeg",
  ".svg":"image/svg+xml",
  ".mp3":"audio/mpeg"
};

http.createServer((request, response)=>{
  const pathname = decodeURIComponent(String(request.url || "/").split("?")[0]);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const target = path.resolve(root, relative);
  if(target !== root && !target.startsWith(`${root}${path.sep}`)){
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.readFile(target, (error, data)=>{
    if(error){
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    response.writeHead(200, {"Content-Type":types[path.extname(target).toLowerCase()] || "application/octet-stream"});
    response.end(data);
  });
}).listen(port, "127.0.0.1", ()=>{
  console.log(`LearnMaster preview: http://127.0.0.1:${port}`);
});
