import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../../services/header.service.client';
import {PostService} from '../../../services/post.service.client';
import {SharedService} from '../../../services/shared.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../../services/comment.service.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  userId;
  user: {type: ''};
  postId;
  comments = [];

  constructor(public header: HeaderService, private postService: PostService, private sharedService: SharedService, private router: Router, private commentService: CommentService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.header.show();
    this.user = this.sharedService.user;
    this.route.params.subscribe((params) => {
      this.postId = params['pid'];
    });
    this.commentService.findAllCommentsForPost(this.postId).subscribe((comments) => {
      this.comments = comments;
      // console.log(this.comments);
    });
  }

  onGetUserPosts(postId) {
    this.postService.findPostById(postId).subscribe(post => {
      this.userId = post.userId;
    });
    this.postService.findPostsByUser(this.userId)
      .subscribe(posts => {
        this.postService.userPosts = posts;
        this.router.navigate(['/user/posts']);
      });
  }

  onDelete(commentId) {
    this.commentService.deleteComment(commentId).subscribe();
    this.router.navigate(['/stream']);
  }

}
