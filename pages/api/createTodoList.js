import prisma from '../lib/prisma'

// POST /api/createTodoList

export default async function handle(req, res) {
  const result = await prisma.todoList.create({
    data: {
      list: '[]',
    },
  })
  res.json(result)
}