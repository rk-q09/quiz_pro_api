import { Request } from 'express';

type queryKeys = 'title' | 'page' | 'limit';

export interface ExRequest extends Request {
  query: {
    [key in queryKeys]: string
  }
}
