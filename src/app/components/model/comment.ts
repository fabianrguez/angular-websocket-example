export class Comment {
  id: number;
  comment: string;
  timestamp: string;

  constructor(comment: string, timestamp: string) {
    this.comment = comment;
    this.timestamp = timestamp;
  }
}
