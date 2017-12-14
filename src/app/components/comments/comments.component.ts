import { Component, OnInit } from '@angular/core';
import {Comment} from '../model/comment';
import * as _ from 'lodash';
import {WebSocketsService} from '../../services/web-sockets.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [WebSocketsService]
})
export class CommentsComponent implements OnInit {

  public comment: string;
  public comments: Comment[] = [];

  constructor(private webSocketsService: WebSocketsService) { }

  ngOnInit() {
    this.webSocketsService.connect('/comments');
    this.webSocketsService.subscribe('/topic/comments')
      .subscribe((response) => {
        _.isArray(JSON.parse(response.body)) ? this.comments = JSON.parse(response.body) : this.comments.push(JSON.parse(response.body));
      });
    this.webSocketsService.subscribe('/topic/comments_deleted')
      .subscribe((response) => {
        this.comments.splice( _.findIndex(this.comments, JSON.parse(response.body)), 1);
      })
  }

  public sendComment(): void {
    const comment: Comment = new Comment(this.comment);
    this.comment = '';
    this.webSocketsService.publish('/app/comment/add', comment);
  }

  public eliminar(commentId: number): void {
    this.webSocketsService.publish('/app/comment/delete', commentId);
  }

}
