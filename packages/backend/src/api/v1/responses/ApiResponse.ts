interface SuccessParams<T> {
  data: T;
  message?: string;
}

interface FailParams<T> {
  data: T;
  message?: string;
}

interface ErrorParams {
  message: string;
}

export const ApiResponse = {
  success: <T>({ data, message }: SuccessParams<T>) => {
    return {
      status: 'success' as const,
      message: message ?? null,
      data,
    };
  },
  fail: <T>({ data, message }: FailParams<T>) => {
    return {
      status: 'fail' as const,
      message: message ?? null,
      data,
    };
  },
  error: ({ message }: ErrorParams) => {
    return {
      status: 'error' as const,
      message,
    };
  },
};
