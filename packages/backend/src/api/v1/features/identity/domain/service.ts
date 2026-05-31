import withTransaction from '@/utils/withTransaction/withTransaction.js';
import { IdentityRepository } from '@/api/v1/features/identity/data-access/repository.js';
import { AppError } from '@/api/v1/errors/AppError.js';
import { ERROR_NAMES } from '@/api/v1/constants/errors.js';

export const IdentityService = {
  completeAuth: async (auth0_id: string) => {
    return withTransaction(async (client) => {
      const existingUser = await IdentityRepository.findUserByAuthId(auth0_id, client);
      if (existingUser) return existingUser;
      const newUser = await IdentityRepository.createUser(auth0_id, client);
      if (!newUser) {
        throw new AppError({
          message:
            'No user ID found and inserting new user record did not return an ID or was unsuccessful.',
          isOperational: false,
          statusCode: 500,
          name: ERROR_NAMES.DB_QUERY_ERROR,
          safeMessage: 'Internal Server Error',
        });
      }
      return newUser;
    });
  },
  translateAuthId: async (auth0_sub: string) => {
    const user = await IdentityRepository.findUserByAuthId(auth0_sub);
    if (!user) {
      throw new AppError({
        message: 'No user ID found with given auth0_sub.',
        isOperational: false,
        statusCode: 500,
        name: ERROR_NAMES.DB_QUERY_ERROR,
        safeMessage: 'Internal Server Error',
      });
    }
    return user;
  },
} as const;
