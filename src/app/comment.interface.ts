export type Tag = string

export interface Comment {
  id: string,
  title: string,
  text: string,
  tags: Array<Tag>
}
