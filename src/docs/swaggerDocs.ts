/**
 * @swagger
 * /api/auth/register-tourist:
 *   post:
 *     summary: Register a new tourist
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               phone_number:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - address
 *               - phone_number
 *     responses:
 *       201:
 *         description: Tourist registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id: { type: integer }
 *                         name: { type: string }
 *                         email: { type: string }
 *                         password: { type: string }
 *                         role: { type: string }
 *                         updatedAt: { type: string, format: date-time }
 *                         createdAt: { type: string, format: date-time }
 *                     tourist:
 *                       type: object
 *                       properties:
 *                         id: { type: integer }
 *                         user_id: { type: integer }
 *                         address: { type: string }
 *                         phone_number: { type: string }
 *                         updatedAt: { type: string, format: date-time }
 *                         createdAt: { type: string, format: date-time }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/auth/register-employee:
 *   post:
 *     summary: Register a new employee
 *     description: Only accessible by admin users
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Tourist registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id: { type: integer }
 *                         name: { type: string }
 *                         email: { type: string }
 *                         password: { type: string }
 *                         role: { type: string }
 *                         updatedAt: { type: string, format: date-time }
 *                         createdAt: { type: string, format: date-time }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing tourist and employee
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token: { type: string }
 *                     role: { type: string }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */
