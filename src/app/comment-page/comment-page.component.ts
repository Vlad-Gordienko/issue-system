import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { CommentRepositoryService } from '../services/comment-repository.service';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.scss']
})
export class CommentPageComponent implements OnInit {
  public comment!: Comment;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private commentRepositoryService: CommentRepositoryService) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      filter((params: Params) => !!params['id']),
      switchMap((params: Params) => {
        return this.commentRepositoryService.get$(params['id'])
      }),
    ).subscribe((comment: Comment | undefined) => {
      if (comment?.id) {
        this.comment = comment;
      }
    });
  }


  update(comment: Comment) {
    this.commentRepositoryService.update$(comment).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  create(comment: Comment) {
    this.commentRepositoryService.create$(comment).subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}
