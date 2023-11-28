export enum TodoItemStatus {
  ACTIVE = "active",
  COMPLETED = "completed"
}

export enum TodoItemTag {
  FOUNDATION = "foundation",
  DISCOVERY = "discovery",
  DELIVERY = "delivery",
}

export interface TodoItem {
  id: string
  text: string
  status: TodoItemStatus
  tagName: TodoItemTag
  tagId: string
}