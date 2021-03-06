import mysql from 'mysql2/promise'
import { dbsetting } from '../config/config'
import { FetchMessageType, FetchUserType, UserType } from '../types/UserType'

const TABLE = 't01_users'

export const fetchAll = async (): Promise<FetchUserType | FetchMessageType> => {
  try {
    const connection = await mysql.createConnection(dbsetting)
    const sql = `SELECT * FROM ${TABLE}`
    const [rows] = await connection.execute(sql)
    return {
      response: 200,
      rows,
    } as FetchUserType
  } catch (err) {
    return {
      response: 400,
      message: 'Error!',
    }
  }
}

export const fetchOne = async (
  params: string
): Promise<FetchUserType | FetchMessageType> => {
  try {
    const connection = await mysql.createConnection(dbsetting)
    const sql = `SELECT * FROM ${TABLE} WHERE id = ? LIMIT 1`
    const [rows] = await connection.execute(sql, [params])
    if (Object.keys(rows).length === 0) throw 'データが見つかりませんでした。'
    return {
      response: 200,
      rows,
    } as FetchUserType
  } catch (err) {
    return {
      response: 400,
      message: 'Error!',
    }
  }
}

export const postUser = async (req: UserType): Promise<FetchMessageType> => {
  try {
    const connection = await mysql.createConnection(dbsetting)
    const sql = `INSERT INTO ${TABLE} (id, username, email, password) VALUES (?, ?, ?, ?)`
    const [rows] = await connection.execute(sql, [
      req.id,
      req.username,
      req.email,
      req.password,
    ])
    return {
      response: 200,
      message: 'Success!!',
    }
  } catch (err) {
    return {
      response: 400,
      message: 'Error!',
    }
  }
}

export const updateUser = async (req: UserType): Promise<FetchMessageType> => {
  try {
    const connection = await mysql.createConnection(dbsetting)
    const sql = `UPDATE ${TABLE} SET username = ?, email = ?, password = ? WHERE id = ?`
    const [rows] = await connection.execute(sql, [
      req.username,
      req.email,
      req.password,
      req.id,
    ])
    return {
      response: 200,
      message: 'Success!!',
    }
  } catch (err) {
    console.log(err)
    return {
      response: 400,
      message: 'Error!',
    }
  }
}

export const deleteUser = async (id: string): Promise<FetchMessageType> => {
  try {
    const connection = await mysql.createConnection(dbsetting)
    const sql = `DELETE FROM ${TABLE} WHERE id = ?`
    const [rows] = await connection.execute(sql, [id])
    return {
      response: 200,
      message: 'Success!!',
    }
  } catch (err) {
    return {
      response: 400,
      message: 'Error!',
    }
  }
}
