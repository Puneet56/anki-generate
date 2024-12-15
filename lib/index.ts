// // Import the Anki exporter library
// import AnkiExport from 'anki-apkg-export';
// import * as fs from 'fs';
//
// // Define the type for question-answer pairs, allowing code snippets
// interface Card {
//   question: string;
//   answer: string;
//   language: string;  // Specify language for syntax highlighting
// }
//
// // Function to create an Anki deck from questions and answers with code snippets and highlighting
// const createAnkiDeck = async (deckName: string, cards: Card[]): Promise<void> => {
//   // Create a new Anki deck with the given name
//   const apkg = new AnkiExport(deckName);
//
//   // Add the Highlight.js CSS and JS to every card's HTML for syntax highlighting
//   const highlightJsAssets = `
//     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css">
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>
//     <script>hljs.highlightAll();</script>
//     `;
//
//   // Loop through the cards array and add each question-answer pair
//   cards.forEach(({ question, answer, language }) => {
//     apkg.addCard(
//       `${highlightJsAssets}<pre><code class="language-${language}">${question}</code></pre>`, // Add code snippets in questions
//       `${highlightJsAssets}<pre><code class="language-${language}">${answer}</code></pre>`    // Add code snippets in answers
//     );
//   });
//
//   try {
//     // Save the deck to a file
//     const zip = await apkg.save();
//     fs.writeFileSync(`${deckName}.apkg`, zip, 'binary');
//     console.log(`Anki deck "${deckName}.apkg" created successfully with code highlighting!`);
//   } catch (err) {
//     console.error(`Error creating Anki deck: ${(err as Error).message}`);
//   }
// };
//
// // Example usage with code snippets and syntax highlighting
// const cards: Card[] = [
//   {
//     question: `// JavaScript function to greet\nfunction greet() {\n  console.log("Hello, World!");\n}`,
//     answer: `// Function call\ngreet();`,
//     language: 'javascript'
//   },
//   {
//     question: `// TypeScript interface definition\ninterface Person {\n  name: string;\n  age: number;\n}`,
//     answer: `// Example usage\nconst person: Person = { name: "John", age: 25 };`,
//     language: 'typescript'
//   },
//   {
//     question: `# Python function to add numbers\ndef add(a, b):\n  return a + b`,
//     answer: `# Calling the add function\nresult = add(5, 3)`,
//     language: 'python'
//   }
// ];
//
// // Create the Anki deck with code snippets and syntax highlighting
// createAnkiDeck('Programming with Code Highlighting', cards);
//
