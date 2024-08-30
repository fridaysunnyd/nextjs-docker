import prisma from '../../lib/prisma'

// PUT /api/todoList/:id
export default async function handle(req, res) {
  const postId = req.query.id
  const post = await prisma.todoList.update({
    where: { id: Number(postId) },
    data: { 
      list: req.body 
    },
  })
  res.json(post)
}