import { Component, OnInit } from '@angular/core';
import { CommentRepositoryService, CommentsQueryParams } from '../services/comment-repository.service';
import { Comment, Tag } from '../comment.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public comments: Comment[] = []
  public tags: Tag[] = []

  constructor(private commentRepository: CommentRepositoryService) { }

  ngOnInit(): void {
    this.getComments();
    this.getTags();
  }

  private getComments(params?: CommentsQueryParams): void {
    this.commentRepository.getAll$(params).subscribe(comments => {
      this.comments = comments;
    })
  }

  public removeComment(id: string) {
    this.commentRepository.delete$(id).subscribe(() => {
      this.comments = this.comments.filter(comment => comment.id !== id);
    })
  }

  private getTags(): void {
    this.commentRepository.tags$().subscribe(tags => {
      this.tags = tags;
    })
  }

  public filterByTags(tags: Tag[]) {
    this.getComments({tags});
  }
}
