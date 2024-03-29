import { Component, OnInit } from '@angular/core';
import { PostService } from './shared/services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Backend';
  public postArry: any;

  constructor(private _postService: PostService) {}
  ngOnInit(): void {
    this._postService.getAllPost().subscribe((res) => {
      this.postArry = res;
      console.log(res);
    });
  }
}
