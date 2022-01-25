import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { Comment, Tag } from '../comment.interface';

export type CommentsQueryParams = {
  tags?: Tag[];
  [param: string]: (string | string[] | number) | any;
};

let mockComments: Comment[] = [
  {
    id: '1',
    title: 'This is an item',
    text: `This is a description of the item, it might describe a bug/task/comment, it can also display <a href='https://www.google.com'>Links</a>`,
    tags: ['bug', 'issue', 'etc'],
  },
  {
    id: '2',
    title: 'To be or not to be',
    text: 'I am not sure if we need this, but too scared to delete',
    tags: [],
  },
  {
    id: '3',
    title: '\\O_o/',
    text: '<h1>When I wrote this, only God and I understood what I was doing. Now, God only knows</h1>',
    tags: ['bug', 'etc'],
  },
  {
    id: '4',
    title: 'Hard worker',
    text: '<b>Hello Wor....</b>',
    tags: ['issue', 'etc'],
  },
  {
    id: '5',
    title: 'Responsible coder',
    text: `I am not responsible of this code. They made me write it, against my will.`,
    tags: ['issue'],
  }
];

@Injectable({
  providedIn: 'root'
})
export class CommentRepositoryService {

  constructor(private httpClient: HttpClient) { }

  public getAll$(params?: CommentsQueryParams): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>('api/comments/?size=2222', {
      params: params,
    }).pipe(
      catchError(() => {
        let _mockComments = [...mockComments];
        if (params?.tags) {
          _mockComments = mockComments.filter(comment => {
            return new Set(comment.tags).size === new Set([...comment.tags, ...params.tags || []]).size;
          })
        }
        return of(_mockComments);
      })
    )
  }

  public get$(id: string): Observable<Comment | undefined> {
    return this.httpClient.get<Comment>(`api/comments/${id}/`).pipe(
      catchError(() => {
        const comment = mockComments.find(comment => comment.id === id);
        return of(comment);
      })
    )
  }

  public create$(comment: Comment): Observable<Object> {
    return this.httpClient.post<Object>('api/comments/', comment).pipe(
      catchError(() => {
        comment.id = (
          Number(mockComments[mockComments.length - 1].id) + 1
        ).toString();
        mockComments.unshift(comment);
        return of({});
      })
    )
  }

  public update$(comment: Comment): Observable<Object> {
    return this.httpClient.put<Object>(`api/comments/${comment.id}`, comment).pipe(
      catchError(() => {
        const index = mockComments.findIndex(item => item.id === comment.id);
        if (index !== -1) {
          mockComments[index] = comment;
        }
        return of({});
      })
    )
  }

  public delete$(id: string): Observable<Object> {
    return this.httpClient.delete(`api/comments/${id}/delete/`).pipe(
      catchError(() => {
        mockComments = mockComments.filter(comment => comment.id !== id);
        return of({})
      })
    )
  }

  public tags$(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>('api/comments/tags/').pipe(
      catchError(() => {
        const arrayOfTags: Tag[][] = _.map(mockComments, (comment: Comment) => {
          return comment.tags
        });
        const tags: Tag[] = _.concat(...arrayOfTags)
        const uniqTags: Tag[] = new Array(...new Set(tags))
        return of(uniqTags);
      })
    )
  }
}
