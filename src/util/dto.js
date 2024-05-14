export const createServerResponseDto = (
  success,
  message,
  data,
  responseCode
) => {
  return {
    success,
    message,
    data,
    responseCode,
    timestamp: new Date().toISOString(),
  };
};
