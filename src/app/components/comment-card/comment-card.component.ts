import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../comment.interface';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss'],
})
export class CommentCardComponent {

  @Input() comment!: Comment;

  @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();

  public removeComment(id: string) {
    this.onRemove.emit(id);
  }
}
