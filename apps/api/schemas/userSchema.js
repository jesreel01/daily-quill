export const userSchema = {
  type: 'object',
  properties: {
    id: { 
      type: 'string',
      description: 'User unique identifier'
    },
    name: { 
      type: 'string',
      description: 'User full name'
    },
    email: { 
      type: 'string', 
      format: 'email',
      description: 'User email address'
    },
    createdAt: { 
      type: 'string', 
      format: 'date-time',
      description: 'User creation timestamp'
    },
    updatedAt: { 
      type: 'string', 
      format: 'date-time',
      description: 'Last update timestamp'
    },
  },
}

export const createUserSchema = {
  description: 'Create a new user',
  tags: ['users'],
  summary: 'Create user',
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100,
        description: 'User full name',
        examples: ['John Doe']
      },
      email: { 
        type: 'string', 
        format: 'email',
        description: 'User email address',
        examples: ['john.doe@example.com']
      },
    },
  },
  response: {
    201: {
      description: 'User successfully created',
      ...userSchema
    },
    400: {
      description: 'Bad Request - Invalid input',
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
}

export const updateUserSchema = {
  description: 'Update an existing user',
  tags: ['users'],
  summary: 'Update user',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { 
        type: 'string',
        description: 'User ID',
        examples: ['123']
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100,
        description: 'User full name',
        examples: ['Jane Doe']
      },
      email: { 
        type: 'string', 
        format: 'email',
        description: 'User email address',
        examples: ['jane.doe@example.com']
      },
    },
  },
  response: {
    200: {
      description: 'User successfully updated',
      ...userSchema
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
}

export const getUserSchema = {
  description: 'Get a user by ID',
  tags: ['users'],
  summary: 'Get user',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { 
        type: 'string',
        description: 'User ID',
        examples: ['123']
      },
    },
  },
  response: {
    200: {
      description: 'User details',
      ...userSchema
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
}

export const getAllUsersSchema = {
  description: 'Get all users',
  tags: ['users'],
  summary: 'List all users',
  response: {
    200: {
      description: 'List of all users',
      type: 'array',
      items: userSchema,
    },
  },
}

export const deleteUserSchema = {
  description: 'Delete a user by ID',
  tags: ['users'],
  summary: 'Delete user',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { 
        type: 'string',
        description: 'User ID to delete',
        examples: ['123']
      },
    },
  },
  response: {
    204: { 
      description: 'User successfully deleted',
      type: 'null' 
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        statusCode: { type: 'integer' },
        error: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
}
