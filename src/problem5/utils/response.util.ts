
type SuccessResponse<T> = {
  status: 'success';
  data: T;
};


type FailResponse<T = undefined> = {
  status: 'fail';
  message: string;
  data?: T; 
};


type ErrorResponse<T = undefined> = {
  status: 'error';
  message: string;
  data?: T; 
};


function success<T>(
  data: T | null = null,
  metadata?: any
): {
  status: 'success';
  data: T | null;
  metadata?: any;
} {
  const response: any = {
    status: 'success',
    data,
  };

  if (metadata) {
    response.metadata = metadata;
  }

  return response;
}



function fail<T>(message: string, data: T | null = null): FailResponse<T | undefined> {
  if (data !== null) {
    return {
      status: 'fail',
      message,
      data: data,
    };
  }
  return {
    status: 'fail',
    message,
  };
}


function error<T>(message: string, data: T | null = null): ErrorResponse<T | undefined> {
  if (data !== null) {
    return {
      status: 'error',
      message,
      data,
    };
  };
  return {
    status: 'error',
    message,
  };
}


export default {
  success,
  fail,
  error,
};

