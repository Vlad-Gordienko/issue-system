import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment.interface';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {
  comment: Comment = {
    id: '343',
    title: 'sdsdfsdf',
    text: 'sdfsdf',
    tags: ['bug', 'sdfsd']
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(comment: Comment) {
    console.log(comment);
  }
}
