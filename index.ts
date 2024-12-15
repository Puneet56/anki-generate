import { Parser, type Statement } from "./lib/parser";

let input = await Bun.file("sample.txt").text()

let p = new Parser(input);

let statements: Statement[] = [];
while (true) {
  let s = p.nextStatement();
  if (s.type == "EOF") {
    break;
  }
  statements.push(s);
}

console.log(statements);
