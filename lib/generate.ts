import { Parser, type Statement } from "./parser";

export type Card = {
  question: string
  answer: string
}

const highlightJsAssets = `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>
`;


export function generateCards(input: string): Card {
  const parser = new Parser(input)

  let statements = parser.getStatements()
  let question = statements[0].val
  statements.shift()

  let answer: string[] = []
  for (let s of statements) {
    console.log(s)
    if (s.type === "CODE") {
      answer.push(`${highlightJsAssets}<pre><code class="language-${s.language}">${s.val}</code></pre>`)    // Add code snippets in answers
    }

    if (s.type.startsWith("H")) {
      let tag = s.type.toLowerCase()
      answer.push(`<${tag}>${s.val}</${tag}>`)
    }

    if (s.type === "TEXT") {
      answer.push(s.val)
    }
  }

  return { question, answer: answer.join('\n') }
}


