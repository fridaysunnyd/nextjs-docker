import prisma from '../lib/prisma'

// GET /api/todoList

export default async function handle(req, res) {
  const result = await prisma.todoList.findUnique({
    where: { id: 1 },
  })

  res.json(result)
}