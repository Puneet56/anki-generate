// Import the Anki exporter library
import AnkiExport from 'anki-apkg-export';
import * as fs from 'fs';
import { generateCards, type Card } from './generate';
import path from 'path';


export async function createDeck(dir: string) {
  const files = fs.readdirSync(dir)
  const cards: Card[] = []
  for (let file of files) {
    const filePath = path.join(process.cwd(), dir, file)
    const content = await Bun.file(filePath).text()
    cards.push(generateCards(content))
  }

  await exportAnkiDeck(path.basename(dir), cards)
}

async function exportAnkiDeck(deckName: string, cards: Card[]): Promise<void> {
  const apkg = new AnkiExport(deckName);

  cards.forEach(({ question, answer }) => {
    apkg.addCard(question, answer);
  })

  try {
    const zip = await apkg.save();
    fs.writeFileSync(`${deckName}.apkg`, zip, 'binary');
    console.log(`Anki deck "${deckName}.apkg" created successfully with code highlighting!`);
  } catch (err) {
    console.error(`Error creating Anki deck: ${(err as Error).message}`);
  }
}
