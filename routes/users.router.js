import express from 'express';
import UserController from './../controllers/user.controller.js';
import validatorHandler from '../middlewares/validator.hander.js';
import { updateUserSchema, createUserSchema, getUserSchema } from './../schemas/user.schema.js';
import userController from './../controllers/user.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       required:
 *         - email
 *         - password
 *       example:
 *         id: d5fE_asz
 *         password: John Doe
 *         email: johndoe@example.com
 */


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


router.get('/', UserController.find);

/**
 * @swagger
 * /users:
 *   getbyid:
 *     summary: Returns one user by id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Return one user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


router.get('/:id',validatorHandler(getUserSchema, 'params'), userController.findOne);  

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */

router.post('/',validatorHandler(createUserSchema,'body'), userController.create);

router.patch('/:id', validatorHandler(updateUserSchema, 'body'), UserController.update);

router.delete('/:id',  validatorHandler(getUserSchema, 'params'), userController.delete);

export default router;
