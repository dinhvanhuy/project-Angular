import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tags } from 'src/app/models/tags';

@Component({
  selector: 'app-home-tag-list',
  templateUrl: './home-tag-list.component.html',
  styleUrls: ['./home-tag-list.component.css']
})
export class HomeTagListComponent implements OnInit {
  tags: string[];

  constructor(private tagService: TagService) { 
    this.tagService.getTags()
      .subscribe((tags: Tags) => {
        // console.log(tags.tags);
        this.tags = tags.tags
      })
  }

  ngOnInit() {
  }
  
  onClickTag(tag: string) {
    this.tagService.onClickedTag.emit(tag);
  }

}
