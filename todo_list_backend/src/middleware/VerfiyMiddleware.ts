import { Request, Response, NextFunction } from 'express'
import ErrorHandler from '../utils/ErrorHandler'
import jwt from 'jsonwebtoken'
const { TokenExpiredError } = jwt
import user_model from '../model/user.model'
import { Types } from 'mongoose'

export const authenticateUser = async (req: Request, _res: Response, next: NextFunction) => {
     try {
          const { token } = req.cookies
          if (!token) {
               return next(new ErrorHandler("unauthorized", 401))
          }
          const decodedUser = jwt.verify(token, process.env.SECRET_TOKEN!)
          if (!decodedUser) {
               return next(new ErrorHandler("token expired", 403))
          }
          if (typeof decodedUser === "object" && "_id" in decodedUser) {
               const ObjectId = new Types.ObjectId(decodedUser?._id)
               const foundUser = await user_model.findById(ObjectId)
               if (!foundUser) {
                    return next(new ErrorHandler("user not found", 404))
               }
               req.body.id = foundUser!._id

               next()
          }

     } catch (error) {
          next(error)
     }
}

interface MyTokenPayload extends jwt.JwtPayload {
     username: string;
     _id: string;
}

export const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { token } = req.cookies
          if (!token) {
               return next(new ErrorHandler("Login First", 401))
          }
          jwt.verify(token, process.env.SECRET_TOKEN!, async (err: Error | null, decoded: jwt.JwtPayload | string | undefined) => {
               if (err) {
                    if (err instanceof TokenExpiredError) {
                         return next(new ErrorHandler("Token expired", 403))
                    }
                    else {
                         return next(new ErrorHandler("Token Error", 403))

                    }
               }
               else {
                    const user = decoded as MyTokenPayload
                    const ObjectId = new Types.ObjectId(user._id)
                    const foundUser = await user_model.findById(ObjectId)

                    if (!foundUser) {
                         return next(new ErrorHandler("User not found", 404))
                    }
                    res.status(200).json({
                         success: true,
                         message: "Token verified successfully",
                         data: foundUser
                    })
               }
          })
     } catch (error) {
          next(error)
     }
}