import { apiClient } from './apiClient';
import type { User } from '@katieeitak/shared';
import type { SuccessResponse } from './types';
export const api = {
  completeAuth: async (signal: AbortSignal) => {
    const response = await apiClient.get<SuccessResponse<User>>('/auth', { signal });
    if (!response.data) {
      throw new Error('Auth failed, server did not return the completed user data.');
    }
    return response.data.data;
  },
};
