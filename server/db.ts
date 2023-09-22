interface TodoList {
  id: string
  content: string
  done: boolean
}

const initTodoList: TodoList[] = [
  { id: '1', content: 'First', done: false },
  { id: '2', content: 'Second', done: false },
  { id: '3', content: 'Third', done: false },
]

const todoList: TodoList[] = [...initTodoList]
export const db = {
  todos: {
    findMany: async () => todoList,
    findById: async (id: string) => todoList.find((todo) => todo.id === id),
    update: async ({ id, done }: { id: string; done: boolean }) => {
      const dataIndex = todoList.findIndex((todo) => todo.id === id)
      if (dataIndex !== -1) {
        todoList[dataIndex].done = done
      }
      return todoList
    },
    create: async (content: string) => {
      const todoObj = { id: String(todoList.length + 1), content, done: false }
      todoList.push(todoObj)
      return todoObj
    },
  },
}
