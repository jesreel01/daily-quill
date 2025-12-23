import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiStandardResponse = <TModel extends Type<any>>(options: {
  type?: TModel | TModel[];
  description?: string;
  status?: number;
}) => {
  const isArray = Array.isArray(options.type);
  const model = isArray
    ? (options.type as TModel[])[0]
    : (options.type as TModel);

  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      description: options.description || 'Successful operation',
      status: options.status || 200,
      schema: {
        title: `ApiResponseOf${model.name} `,
        allOf: [
          {
            properties: {
              success: { type: 'boolean', example: true },
              statusCode: { type: 'number', example: options.status || 200 },
              message: { type: 'string', example: 'Operation successful' },
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  }
                : {
                    $ref: getSchemaPath(model),
                  },
              timestamp: { type: 'string', format: 'date-time' },
              path: { type: 'string' },
            },
          },
        ],
      },
    }),
  );
};

export const ApiStandardErrorResponse = (options: {
  status: number;
  description?: string;
}) => {
  return applyDecorators(
    ApiResponse({
      description: options.description || 'Error occurred',
      status: options.status,
      schema: {
        title: `ApiErrorResponse${options.status}`,
        properties: {
          success: { type: 'boolean', example: false },
          statusCode: { type: 'number', example: options.status },
          message: { type: 'string', example: 'Error message' },
          error: { type: 'string', example: 'Error Type' },
          validationErrors: {
            type: 'array',
            items: { type: 'string' },
            example: ['optional validation error'],
          },
          timestamp: { type: 'string', format: 'date-time' },
          path: { type: 'string' },
        },
      },
    }),
  );
};
