import { apiClient } from './apiClient';
import type {
  User,
  AnxietyEvent,
  AnxietyEventBody,
  UpdateAnxietyEventBody,
} from '@katieeitak/shared';
import type { SuccessResponse } from './types';
import type { AxiosResponse } from 'axios';

interface UpdateAnxietyEventParams {
  id: string;
  body: UpdateAnxietyEventBody;
}
// TODO - Error handling
export const api = {
  completeAuth: async (signal: AbortSignal) => {
    const response = await apiClient.get<SuccessResponse<User>>('/auth', { signal });
    if (!response.data) {
      throw new Error('Auth failed, server did not return the completed user data.');
    }
    return response.data.data;
  },
  submitAnxietyEvent: async (body: AnxietyEventBody) => {
    const response = await apiClient.post<
      SuccessResponse<AnxietyEvent>,
      AxiosResponse<SuccessResponse<AnxietyEvent>>,
      AnxietyEventBody
    >('/anxiety', body);
    return response.data.data;
  },
  getAnxietyEvents: async (signal: AbortSignal) => {
    const response = await apiClient.get<SuccessResponse<AnxietyEvent[]>>('/anxiety', { signal });
    return response.data.data;
  },
  updateAnxietyEvent: async ({ id, body }: UpdateAnxietyEventParams) => {
    const response = await apiClient.patch<
      SuccessResponse<AnxietyEvent>,
      AxiosResponse<SuccessResponse<AnxietyEvent>>,
      UpdateAnxietyEventBody
    >(`/anxiety/${id}`, body);
    return response.data.data;
  },
};
