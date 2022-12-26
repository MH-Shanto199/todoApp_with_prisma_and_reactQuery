import { PrismaClient, Todo as todoType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    console.log(req.body);
    const todos = await prisma.todo.findMany();
    return res.json({ todos });
  }

  if (req.method == 'POST') {
    const newTodo = req.body;
    const task = newTodo.task;
    const isExist = await prisma.todo.findFirst({
      where: {
        task: task,
      },
    });
    if (!isExist) {
      const savedTodo = await prisma.todo.create({
        data: newTodo,
      });
      return res.json({ savedTodo });
    }
    return res.json({ message: 'Task already exist' });
  }

  if (req.method == 'DELETE') {
    const deleteitem = req.body;
    const todoId = deleteitem.id;
    const deleteTask = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    return res.json({ deleteTask });
  }

  if (req.method == 'PUT') {
    const editItem = req.body;
    const { id, task } = editItem;
    const isExist = await prisma.todo.findFirst({
      where: {
        task: task,
      },
    });
    if (isExist) {
      return res.json({ message: 'edit task before Update' });
    } else {
      const updatetTodo = await prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          task: task,
        },
      });
      return res.json({ updatetTodo });
    }
  }
};
