import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public postArry: any;
  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this._postService.getAllPost().subscribe((res) => {
      this.postArry = res;
      console.log(res);
    });
  }
}
