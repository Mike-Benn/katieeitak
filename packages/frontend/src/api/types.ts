export type SuccessResponse<T> = {
  message: string;
  data: T;
  status: 'success';
};

export type FailResponse = {
  message: string;
  data: Record<string, unknown>;
  status: 'fail';
};

export type ErrorResponse = {
  message: string;
  status: 'error';
};
