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
 *                         address: { type: string }
 *                         phone_number: { type: string }
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
 *                         address: { type: string }
 *                         phone_number: { type: string }
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

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new tourist
 *     description: Only accessible by admin or employee
 *     tags:
 *       - User
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
 *         description: Tourist created successfully
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
 *                         address: { type: string }
 *                         phone_number: { type: string }
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
 * /api/user/edit/{id}:
 *   put:
 *     summary: Update tourist data
 *     description: only accessible by self, admin, or employee
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               address: { type: string }
 *               phone_number: { type: string }
 *             required: [password, address, phone_number]
 *     responses:
 *       200:
 *         description: Tourist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 message: { type: string }
 *                 code: { type: integer }
 */

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete a tourist
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tourist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 message: { type: string }
 *                 code: { type: integer }
 */

/**
 * @swagger
 * /api/user/get-tourists:
 *   get:
 *     summary: List all tourists with pagination
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Current page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search tourists by name
 *     responses:
 *       200:
 *         description: Tourist list fetched successfully
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
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: integer }
 *                           name: { type: string }
 *                           address: { type: string }
 *                           phone_number: { type: string }
 *                           email: { type: string }
 *                           password: { type: string }
 *                           role: { type: string }
 *                           createdAt: { type: string, format: date-time }
 *                           updatedAt: { type: string, format: date-time }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalData: { type: integer }
 *                         totalPage: { type: integer }
 *                         currentPage: { type: integer }
 *                         perPage: { type: integer }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/user/get-employees:
 *   get:
 *     summary: List all employees with pagination
 *     description: Only accessible by admin
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Current page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search employees by name
 *     responses:
 *       200:
 *         description: Tourist list fetched successfully
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
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: integer }
 *                           name: { type: string }
 *                           address: { type: string }
 *                           phone_number: { type: string }
 *                           email: { type: string }
 *                           password: { type: string }
 *                           role: { type: string }
 *                           createdAt: { type: string, format: date-time }
 *                           updatedAt: { type: string, format: date-time }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalData: { type: integer }
 *                         totalPage: { type: integer }
 *                         currentPage: { type: integer }
 *                         perPage: { type: integer }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/journeys/create:
 *   post:
 *     summary: Create a journey for a user
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id: { type: integer }
 *               start_date: { type: string, format: date }
 *               end_date: { type: string, format: date }
 *               destination: { type: string }
 *             required: [user_id, start_date, end_date, destination]
 *     responses:
 *       201:
 *         description: Journey created successfully
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
 *                     id: { type: integer }
 *                     user_id: { type: integer }
 *                     start_date: { type: string, format: date-time }
 *                     end_date: { type: string, format: date-time }
 *                     destination: { type: string }
 *                     updatedAt: { type: string, format: date-time }
 *                     createdAt: { type: string, format: date-time }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */

/**
 * @swagger
 * /api/journeys/edit/{journey_id}:
 *   put:
 *     summary: Update a journey
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: journey_id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date: { type: string, format: date }
 *               end_date: { type: string, format: date }
 *               destination: { type: string }
 *     responses:
 *       200:
 *         description: Journey updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean }
 *                 message: { type: string }
 *                 code: { type: integer }
 */

/**
 * @swagger
 * /api/journeys/delete/{journey_id}:
 *   delete:
 *     summary: Delete a journey
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: journey_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Journey deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 */

/**
 * @swagger
 * /api/journeys/get-all-journeys:
 *   get:
 *     summary: List all journeys grouped by user with pagination
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Current page number
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Journey list fetched successfully
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
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         additionalProperties:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id: { type: integer }
 *                               user_id: { type: integer }
 *                               start_date: { type: string, format: date-time }
 *                               end_date: { type: string, format: date-time }
 *                               destination: { type: string }
 *                               createdAt: { type: string, format: date-time }
 *                               updatedAt: { type: string, format: date-time }
 *                               user_name: { type: string }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalData: { type: integer }
 *                         totalPage: { type: integer }
 *                         currentPage: { type: integer }
 *                         perPage: { type: integer }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */
/**
 * @swagger
 * /api/journeys/get-user-history/{user_id}:
 *   get:
 *     summary: List of historical journeys tourist
 *     tags: [Journey]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema: { type: integer }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: size
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Journey list fetched successfully
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
 *                     journeys:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: integer }
 *                           user_id: { type: integer }
 *                           start_date: { type: string, format: date-time }
 *                           end_date: { type: string, format: date-time }
 *                           destination: { type: string }
 *                           createdAt: { type: string, format: date-time }
 *                           updatedAt: { type: string, format: date-time }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalData: { type: integer }
 *                         totalPage: { type: integer }
 *                         currentPage: { type: integer }
 *                         perPage: { type: integer }
 *                 message:
 *                   type: string
 *                 code:
 *                   type: integer
 */
