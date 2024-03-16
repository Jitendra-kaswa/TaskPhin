import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

type GetRequest<T> = (path: string, config?: AxiosRequestConfig) => Promise<T>;
type PostRequest<T> = <D>(
  path: string,
  data: D,
  config?: AxiosRequestConfig,
) => Promise<T>;
type PutRequest<T> = <D>(
  path: string,
  data: D,
  config?: AxiosRequestConfig,
) => Promise<T>;
type DeleteRequest<T> = (
  path: string,
  config?: AxiosRequestConfig,
) => Promise<T>;

const handleRequest = async <T>(request: Promise<T>): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await request);
    } catch (error: any) {
      if (error.response) {
        reject(
          `${error.response.status} : ${error.response.data.message}` ||
            'Something went wrong',
        );
      } else if (error.request) {
        reject('No response received from server');
      } else {
        reject('Error setting up request');
      }
    }
  });
};

const createApiRequest = (): {
  get: GetRequest<any>;
  post: PostRequest<any>;
  put: PutRequest<any>;
  delete: DeleteRequest<any>;
} => {
  const instance = axios.create({
    baseURL: BASE_URL,
  });

  const get: GetRequest<any> = (path, config) =>
    handleRequest(instance.get(path, config));
  const post: PostRequest<any> = (path, data, config) =>
    handleRequest(instance.post(path, data, config));
  const put: PutRequest<any> = (path, data, config) =>
    handleRequest(instance.put(path, data, config));
  const del: DeleteRequest<any> = (path, config) =>
    handleRequest(instance.delete(path, config));
  return { get, post, put, delete: del };
};

export const ApiRequest = createApiRequest();
