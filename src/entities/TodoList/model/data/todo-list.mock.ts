import { TodoItem, TodoItemStatus, TodoItemTag } from "../types/todo-item.interface"

export const mockList: TodoItem[] = [
  {
    id: '1',
    text: 'Setup visual office',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.FOUNDATION,
    tagId: '1'
  },
  {
    id: '2',
    text: 'Set mission & vision',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.FOUNDATION,
    tagId: '1'
  },
  {
    id: '3',
    text: 'Select business name',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.FOUNDATION,
    tagId: '1'
  },
  {
    id: '4',
    text: 'Buy domains',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.FOUNDATION,
    tagId: '1'
  },

  ///

  {
    id: '7',
    text: 'Create roadmap',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.DISCOVERY,
    tagId: '2'
  },
  {
    id: '8',
    text: 'Competitor analysis',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.DISCOVERY,
    tagId: '2'
  },

  ///

  {
    id: '9',
    text: 'Release marketing website',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.DELIVERY,
    tagId: '3'
  },
  {
    id: '10',
    text: 'Release MVP',
    status: TodoItemStatus.ACTIVE,
    tagName: TodoItemTag.DELIVERY,
    tagId: '3'

  }
]