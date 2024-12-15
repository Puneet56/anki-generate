import { expect, test } from "bun:test";
import { Parser, type Statement } from "../parser";

let input = await Bun.file("sample.txt").text()

test("Lexer", () => {
  let out: Statement[] = [
    { type: "H1", val: "Heading 1" },
    { type: "H2", val: "Heading 2" },
    { type: "H3", val: "Heading 3" },
    { type: "H4", val: "Heading 4" },
    { type: "H5", val: "Heading 5" },
    { type: "H6", val: "Heading 6" },
    { type: "TEXT", val: "Hello world" },
    {
      type: "CODE",
      language: "javascript",
      val: "function() hello {\n  return 'Hello from function'\n}"
    }
  ]

  let l = new Parser(input)

  let tokens: Statement[] = []
  while (true) {
    let t = l.nextStatement()
    if (t.type == "EOF") {
      break;
    }
    tokens.push(t)
  }

  expect(tokens).toEqual(out)
});
