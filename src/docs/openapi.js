const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'Smart Carpark API',
    version: '1.0.0',
    description: 'Mock backend API for Smart Carpark admin system (Express) with optional Supabase (Postgres).'
  },
  servers: [{ url: '/', description: 'Current host' }],
  tags: [
    { name: 'System' },
    { name: 'Auth' },
    { name: 'Dashboard' },
    { name: 'Transactions' },
    { name: 'Users' },
    { name: 'Service Pricing' },
    { name: 'Devices' },
    { name: 'Theme' },
    { name: 'System Settings' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: { message: { type: 'string' } }
      },
      PaginationMeta: {
        type: 'object',
        properties: {
          page: { type: 'integer', example: 1 },
          perPage: { type: 'integer', example: 10 },
          total: { type: 'integer', example: 2 },
          totalPages: { type: 'integer', example: 1 }
        }
      },
      AuthUser: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'u1' },
          username: { type: 'string', example: 'admin' },
          name: { type: 'string', example: 'Admin Parking' },
          email: { type: 'string', nullable: true, example: 'admin@example.com' },
          role: { type: 'string', example: 'super_admin' },
          permissions: { type: 'array', items: { type: 'string' } },
          status: { type: 'string', example: 'active' }
        }
      },
      LoginRequest: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { type: 'string', example: 'admin' },
          password: { type: 'string', example: '123456' }
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'mock-token-u1-1710000000000' },
          refreshToken: { type: 'string', example: 'mock-refresh-u1-1710000000000' },
          user: { $ref: '#/components/schemas/AuthUser' }
        }
      },
      RefreshRequest: {
        type: 'object',
        required: ['refreshToken'],
        properties: {
          refreshToken: { type: 'string' }
        }
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', nullable: true },
          role: { type: 'string' },
          permissions: { type: 'array', items: { type: 'string' } },
          status: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      UserCreateRequest: {
        type: 'object',
        required: ['username', 'password', 'name'],
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', nullable: true },
          role: { type: 'string', example: 'staff' },
          permissions: { type: 'array', items: { type: 'string' } },
          status: { type: 'string', example: 'active' }
        }
      },
      UserUpdateRequest: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', nullable: true },
          role: { type: 'string' },
          permissions: { type: 'array', items: { type: 'string' } },
          status: { type: 'string' }
        }
      },
      UsersListResponse: {
        type: 'object',
        properties: {
          data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
          meta: { $ref: '#/components/schemas/PaginationMeta' }
        }
      },
      Payment: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'paid' },
          method: { type: 'string', nullable: true, example: 'cash' },
          channel: { type: 'string', nullable: true, example: 'cashier', enum: ['mobile', 'kiosk', 'gate', 'cashier'] },
          processedBy: { type: 'string', nullable: true, example: 'u1' },
          paidAt: { type: 'string', format: 'date-time', nullable: true },
          qrCodeText: { type: 'string', nullable: true },
          qrCodeImageUrl: { type: 'string', nullable: true },
          referenceNo: { type: 'string', nullable: true }
        }
      },
      Receipt: {
        type: 'object',
        properties: {
          receiptNo: { type: 'string', nullable: true },
          issuedAt: { type: 'string', format: 'date-time', nullable: true },
          footerText: { type: 'string', nullable: true },
          printableText: { type: 'string', nullable: true }
        }
      },
      Transaction: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 't1' },
          billNo: { type: 'string' },
          plateNo: { type: 'string' },
          vehicleType: { type: 'string', example: 'car' },
          serviceType: { type: 'string', example: 'parking' },
          entryAt: { type: 'string', format: 'date-time', nullable: true },
          serviceDisplay: { type: 'string', example: '22-04-2026 : 5 : 12' },
          exitAt: { type: 'string', format: 'date-time', nullable: true },
          durationMinute: { type: 'integer', example: 135 },
          durationDisplay: { type: 'string', example: '2 ชม. 15 นาที' },
          amount: { type: 'number', example: 80 },
          vat: { type: 'number', nullable: true },
          discount: { type: 'number', nullable: true },
          netAmount: { type: 'number', nullable: true },
          status: { type: 'string', example: 'pending' },
          statusLabel: { type: 'string', example: 'รอชำระ' },
          payment: { $ref: '#/components/schemas/Payment' },
          receipt: { $ref: '#/components/schemas/Receipt' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      TransactionsListResponse: {
        type: 'object',
        properties: {
          data: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } },
          meta: { $ref: '#/components/schemas/PaginationMeta' }
        }
      },
      PaymentRequest: {
        type: 'object',
        required: ['method'],
        properties: {
          method: { type: 'string', enum: ['qr', 'cash', 'transfer', 'epay'] },
          channel: { type: 'string', enum: ['mobile', 'kiosk', 'gate', 'cashier'], nullable: true },
          action: { type: 'string', enum: ['confirm', 'generate'], example: 'confirm' },
          referenceNo: { type: 'string', nullable: true }
        }
      },
      StatusPatchRequest: {
        type: 'object',
        required: ['status'],
        properties: {
          status: { type: 'string', enum: ['pending', 'completed', 'cancelled', 'void'] }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/': {
      get: {
        tags: ['System'],
        summary: 'API root metadata',
        security: [],
        responses: {
          200: {
            description: 'API metadata',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    version: { type: 'string' },
                    docs: { type: 'string' },
                    openapi: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Health check',
        security: [],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    service: { type: 'string', example: 'smart-carpark-api' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/health/db': {
      get: {
        tags: ['System'],
        summary: 'DB connectivity (Supabase)',
        security: [],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'object' }
              }
            }
          },
          500: {
            description: 'DB error',
            content: {
              'application/json': {
                schema: { type: 'object' }
              }
            }
          }
        }
      }
    },
    '/docs': {
      get: {
        tags: ['System'],
        summary: 'Swagger UI',
        security: [],
        responses: {
          200: { description: 'HTML' }
        }
      }
    },
    '/docs/openapi.json': {
      get: {
        tags: ['System'],
        summary: 'OpenAPI document',
        security: [],
        responses: {
          200: {
            description: 'OpenAPI JSON',
            content: {
              'application/json': { schema: { type: 'object' } }
            }
          }
        }
      }
    },
    '/api/v1/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' }
            }
          }
        },
        responses: {
          200: {
            description: 'Login success',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } }
            }
          },
          401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/auth/refresh': {
      post: {
        tags: ['Auth'],
        summary: 'Refresh token',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/RefreshRequest' } }
          }
        },
        responses: {
          200: { description: 'Refreshed', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
          401: { description: 'Invalid refresh token', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/auth/logout': {
      post: {
        tags: ['Auth'],
        summary: 'Logout',
        responses: {
          200: { description: 'Logged out', content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' } } } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user',
        responses: {
          200: { description: 'Current user', content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/AuthUser' } } } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/dashboard/overview': {
      get: {
        tags: ['Dashboard'],
        summary: 'Dashboard overview',
        parameters: [
          { in: 'query', name: 'start_date', schema: { type: 'string' }, description: 'ISO Date string' },
          { in: 'query', name: 'end_date', schema: { type: 'string' }, description: 'ISO Date string' },
          { in: 'query', name: 'branch_id', schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'Overview', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/dashboard/revenue-overall': {
      get: {
        tags: ['Dashboard'],
        summary: 'Revenue overall',
        responses: {
          200: { description: 'Revenue', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/transactions': {
      get: {
        tags: ['Transactions'],
        summary: 'List transactions',
        parameters: [
          { in: 'query', name: 'keyword', schema: { type: 'string' } },
          { in: 'query', name: 'plate_no', schema: { type: 'string' } },
          { in: 'query', name: 'bill_no', schema: { type: 'string' } },
          { in: 'query', name: 'status', schema: { type: 'string' } },
          { in: 'query', name: 'payment_status', schema: { type: 'string' } },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
          { in: 'query', name: 'per_page', schema: { type: 'integer', default: 10 } }
        ],
        responses: {
          200: { description: 'Transactions', content: { 'application/json': { schema: { $ref: '#/components/schemas/TransactionsListResponse' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/transactions/{id}': {
      get: {
        tags: ['Transactions'],
        summary: 'Get transaction by id',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Transaction details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } } }
        }
      },
      patch: {
        tags: ['Transactions'],
        summary: 'Update transaction',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } } },
        responses: {
          200: { description: 'Updated' }
        }
      },
      delete: {
        tags: ['Transactions'],
        summary: 'Delete transaction',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Deleted' }
        }
      }
    },
    '/api/v1/transactions/{id}/payment': {
      post: {
        tags: ['Transactions'],
        summary: 'Generate/confirm payment (mock)',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PaymentRequest' } } }
        },
        responses: {
          200: { description: 'Updated transaction / QR generated', content: { 'application/json': { schema: { type: 'object' } } } },
          400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/transactions/{id}/status': {
      patch: {
        tags: ['Transactions'],
        summary: 'Update transaction status',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/StatusPatchRequest' } } }
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object' } } } },
          400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        parameters: [
          { in: 'query', name: 'keyword', schema: { type: 'string' } },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
          { in: 'query', name: 'per_page', schema: { type: 'integer', default: 10 } }
        ],
        responses: {
          200: { description: 'Users', content: { 'application/json': { schema: { $ref: '#/components/schemas/UsersListResponse' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      post: {
        tags: ['Users'],
        summary: 'Create user',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UserCreateRequest' } } }
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { type: 'object' } } } },
          400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          409: { description: 'Username already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/users/{id}': {
      put: {
        tags: ['Users'],
        summary: 'Update user',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/UserUpdateRequest' } } }
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          409: { description: 'Username already exists', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Deleted', content: { 'application/json': { schema: { type: 'object' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/service-pricing/config': {
      get: {
        tags: ['Service Pricing'],
        summary: 'Get pricing config',
        responses: {
          200: { description: 'Config', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Service Pricing'],
        summary: 'Update pricing config',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/service-pricing/rules': {
      post: {
        tags: ['Service Pricing'],
        summary: 'Create pricing rule',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { type: 'object' } } } },
          400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/service-pricing/rules/{id}': {
      delete: {
        tags: ['Service Pricing'],
        summary: 'Delete pricing rule',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Deleted', content: { 'application/json': { schema: { type: 'object' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/devices/config': {
      get: {
        tags: ['Devices'],
        summary: 'Get devices config',
        responses: {
          200: { description: 'Devices', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/devices': {
      post: {
        tags: ['Devices'],
        summary: 'Create device',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { type: 'object' } } } },
          400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/devices/{id}': {
      put: {
        tags: ['Devices'],
        summary: 'Update device',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Devices'],
        summary: 'Delete device',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Deleted', content: { 'application/json': { schema: { type: 'object' } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/theme': {
      get: {
        tags: ['Theme'],
        summary: 'Get theme settings and presets',
        responses: {
          200: { 
            description: 'Theme settings', 
            content: { 
              'application/json': { 
                schema: { 
                  type: 'object',
                  properties: {
                    mode: { type: 'string', description: 'preset1, preset2, preset3, preset4' },
                    themeColor: { type: 'string', description: 'The main color for the UI' },
                    logoUrl: { type: 'string', nullable: true },
                    presets: { type: 'object' }
                  }
                } 
              } 
            } 
          },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Theme'],
        summary: 'Update theme settings',
        requestBody: { 
          required: true, 
          content: { 
            'application/json': { 
              schema: { 
                type: 'object',
                properties: {
                  mode: { type: 'string', description: 'preset1, preset2, preset3, preset4' },
                  themeColor: { type: 'string', description: 'Required only if mode is preset4' },
                  logoUrl: { type: 'string' }
                }
              } 
            } 
          } 
        },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/system-settings': {
      get: {
        tags: ['System Settings'],
        summary: 'Get system settings',
        responses: {
          200: { description: 'Settings', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['System Settings'],
        summary: 'Update system settings',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
        responses: {
          200: { description: 'Updated', content: { 'application/json': { schema: { type: 'object' } } } },
          401: { description: 'Unauthorized', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/api/v1/kiosk/entry': {
      post: {
        tags: ['Devices'],
        summary: 'Create entry bill from Kiosk',
        security: [],
        requestBody: { 
          required: true, 
          content: { 
            'application/json': { 
              schema: { 
                type: 'object',
                properties: {
                  deviceId: { type: 'string' },
                  plateNo: { type: 'string' },
                  vehicleType: { type: 'string', default: 'car' }
                }
              } 
            } 
          } 
        },
        responses: {
          201: { description: 'Created', content: { 'application/json': { schema: { type: 'object' } } } },
          400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          403: { description: 'Invalid Kiosk', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    }
  }
};

module.exports = openapi;

