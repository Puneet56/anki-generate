export interface Parser {
  input: string;
}

export type StatementType = "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "CODE" | "EOF" | "TEXT"

export type Statement = {
  type: StatementType
  val: string
  language?: string
}

export class Parser {
  public input: string
  private lines: string[]
  private readPos: number

  constructor(input: string) {
    this.input = input.trim()
    this.lines = input.split("\n")
    this.readPos = 0
  }

  private readHeading(): Statement {
    let line = this.lines[this.readPos]
    this.readPos++

    let [level, ...text] = line.split(" ")
    if (level.replaceAll("#", "").length > 0) {
      // no space after #'es
      return { type: "TEXT", val: line }
    }

    if (level.trim().length > 6) {
      level.slice(0, 6) // max 6 level heading
    }


    let type = `H${level.length}` as StatementType
    return { type, val: text.join(" ") }
  }

  private readCodeBlock(): Statement {
    let line = this.lines[this.readPos]
    let language = line.replace('```', "").trim()
    this.readPos++

    let codeBlock = []
    while (true && this.readPos < this.lines.length) {
      let line = this.lines[this.readPos]
      if (line.startsWith('```')) {
        this.readPos++
        break
      }

      this.readPos++
      codeBlock.push(line)
    }


    return { type: "CODE", val: codeBlock.join('\n'), language }
  }

  public nextStatement(): Statement {
    if (this.readPos < this.lines.length) {
      let line = (this.lines[this.readPos]).trim()
      if (line.trim().length === 0) {
        this.readPos++
        return this.nextStatement()
      }

      if (line.startsWith("#")) {
        return this.readHeading()
      }

      if (line.startsWith("```")) {
        return this.readCodeBlock()
      }

      this.readPos++
      return { type: "TEXT", val: line }
    }

    return { type: "EOF", val: "" }
  }


}

