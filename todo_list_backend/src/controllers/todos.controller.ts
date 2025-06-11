import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/ErrorHandler.js";
import user_model from "../model/user.model.js";
import { Types } from "mongoose";
import todo_model from "../model/todos.model.js";

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { id, title, priority, description } = req.body
          if (!id || !Types.ObjectId.isValid(id)) {
               return next(new ErrorHandler("Can't add todo", 400))
          }
          if (!title || !priority) {
               return next(new ErrorHandler("title and priority are required", 400))
          }
          const ObjectId = new Types.ObjectId(id)
          const foundUser = await user_model.findById(ObjectId)
          if (!foundUser) {
               return next(new ErrorHandler("User not found", 404))
          }
          const newTodo = await todo_model.create({ title, priority, description, user: foundUser?._id })
          foundUser!.todos?.push(new Types.ObjectId(newTodo?._id as Types.ObjectId))
          await foundUser.save()

          res.status(200).json({
               success: true,
               message: "New todo added successfully",
               data: newTodo
          })

     } catch (error) {
          next(error)
     }
}

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { id } = req.params
          const { title, status, priority, description } = req.body

          if (!id || !Types.ObjectId.isValid(id)) {
               return next(new ErrorHandler("Invalid inputs", 400))
          }
          const ObjectId = new Types.ObjectId(id)
          const updatedTodo = await todo_model.findByIdAndUpdate(ObjectId, {
               title,
               status,
               priority,
               description
          }, { new: true })
          await updatedTodo!.save()
          if (!updatedTodo) {
               return next(new ErrorHandler("Todo not found", 404))
          }
          res.status(200).json({
               success: true,
               message: "Todo updated successfully",
               data: updatedTodo
          })
     } catch (error) {
          next(error)
     }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { id } = req.params
          if (!id || !Types.ObjectId.isValid(id)) {
               next(new ErrorHandler("Invalid id", 400))

          }
          const ObjectId = new Types.ObjectId(id)
          const deletedTodo = await todo_model.findByIdAndDelete(ObjectId, { new: true })
          if (!deletedTodo) {
               next(new ErrorHandler("Todo not found", 400))
          }
          res.status(200).json({
               success: true,
               message: "Todo deleted successfully",
               data: deletedTodo
          })
     } catch (error) {
          next(error)
     }
}

export const searchTodo = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { searchTerm = "", page = 1, limit = 10 } = req.query
          const { id } = req.body
          const skip = (Number(page) - 1) * 10
          const userObjectId = new Types.ObjectId(id)

          let matchStage: { title?: RegExp } = {}


          if (searchTerm) {
               matchStage.title = new RegExp(searchTerm as string, "gi")
          }
          const filteredTodos = await todo_model.aggregate([
               {
                    $match: {
                         user: userObjectId
                    }
               },
               {
                    $facet: {
                         counts: [{ $count: "Total_todos" }],
                         data: [
                              {
                                   $match: matchStage
                              },
                              {
                                   $sort: {
                                        createdAt: -1
                                   }
                              },
                              {
                                   $skip: skip
                              },
                              {
                                   $limit: Number(limit)
                              },


                         ],

                    }
               },
               {
                    $unwind: {
                         path: "$counts",
                    }
               }
          ]);
          const totalCount = filteredTodos[0]?.counts.Total_todos || 0
          const data = filteredTodos[0]?.data || []


          res.status(200).json({
               success: true,
               message: "Todo searched successfully",
               totalCount,
               data,
          })
     } catch (error) {
          next(error)
     }

}

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { id } = req.params
          if (!id || !Types.ObjectId.isValid(id)) {
               return next(new ErrorHandler("Invalid Id", 400))
          }
          const ObjectId = new Types.ObjectId(id)
          const foundTodo = await todo_model.findById(ObjectId)

          if (!foundTodo) {
               return next(new ErrorHandler("Todo not found", 404))
          }
          res.status(200).json({
               success: true,
               message: "Todo get successfully",
               data: foundTodo
          })
     } catch (error) {
          next(error)
     }
}