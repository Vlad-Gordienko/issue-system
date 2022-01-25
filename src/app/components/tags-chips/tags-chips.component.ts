import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Tag } from '../../comment.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-tags-chips',
  templateUrl: './tags-chips.component.html',
  styleUrls: ['./tags-chips.component.scss']
})
export class TagsChipsComponent {
  addOnBlur = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() allExistingTags: Tag[] = [];
  @Output() onChange: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();
  @Input() selectedTags: Tag[] = [];
  public get autocompleteTags(): Tag[] {
    return this.allExistingTags.filter(tag => !this.selectedTags.includes(tag));
  }

  public addTag(tag: Tag): void {
    tag = tag.trim();
    if (tag) {
      this.selectedTags.push(tag);
      this.emitChanges();
    }
  }

  public removeTag(tag: Tag): void {
    tag = tag.trim();
    if (tag) {
      this.selectedTags = this.selectedTags.filter(item => item !== tag);
      this.emitChanges();
    }
  }

  public onInput(event: MatChipInputEvent): void {
    this.addTag(event.value || '');
    event.chipInput!.clear();
  }

  public onAutocomplete(value: MatAutocompleteSelectedEvent) {
    this.addTag(value.option.viewValue || '')
  }

  private emitChanges(): void {
    this.onChange.emit(this.selectedTags);
  }
}
