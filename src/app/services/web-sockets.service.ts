import {Injectable} from '@angular/core';
import {StompConfig, StompRService} from '@stomp/ng2-stompjs';
import * as SockJS from 'sockjs-client';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class WebSocketsService {

  private config: StompConfig;
  private url: string= environment.api;

  constructor(private stomp: StompRService) {}

  public connect(uri: string): void {
    this.config = {
      url: () => new SockJS(this.url + uri),
      headers: {},
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: false
    };
    this.stomp.config = this.config;
    this.stomp.initAndConnect();
  }

  public subscribe(topic: string): Observable<any> {
    return this.stomp.subscribe(topic);
  }

  public publish(topic: string, object: any): void {
    this.stomp.publish(topic, JSON.stringify(object));
  }

}
