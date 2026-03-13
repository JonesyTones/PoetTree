export interface Poem {
  title: string
  author: string
  lines: string[]
  linecount: string
}

export type SearchFilter = 'all' | 'title' | 'author'
