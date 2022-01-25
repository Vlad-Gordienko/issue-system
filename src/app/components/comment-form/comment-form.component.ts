import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment, Tag } from '../../comment.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentRepositoryService } from '../../services/comment-repository.service';


interface Config {
  submitBtnText: string,
}

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() onSubmit: EventEmitter<Comment> = new EventEmitter<Comment>();

  @Input() public config: Config = {
    submitBtnText: 'Submit'
  }

  public allExistingTags: Tag[] = [];

  public commentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    tags: new FormControl([]),
  });

  get tags(): Tag[] {
    return this.commentForm.controls?.tags?.value || [];
  }

  set tags(tags: Tag[]) {
    if (tags.length) {
      this.commentForm.controls.tags.patchValue(tags);
    }
  }

  constructor(private commentRepository: CommentRepositoryService) { }

  ngOnInit(): void {
    this.getTags();
    this.initComment();
  }

  private initComment(): void {
    if (this.comment?.id) {
      this.commentForm.patchValue({
        title: this.comment.title,
        text: this.comment.text,
        tags: this.comment.tags,
      });
    }
  }

  private getTags(): void {
    this.commentRepository.tags$().subscribe(tags => {
      this.allExistingTags = tags;
    })
  }

  public submit() {
    if (this.commentForm.valid) {
      this.onSubmit.emit(this.commentForm.value);
    }
  }
}
