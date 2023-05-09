
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { connected } from 'process';
import { Server, Socket } from 'socket.io';

import { WebSocketAuthGuard } from '../auth/websocket-auth.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({ namespace:'/alert' })
export class AlertGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;



  handleConnection(client: any, ...args: any[]) {
   
   
   this.wss.emit('alertToClient', client.id + " connected");
  }

  handleDisconnect(client: any) {
    this.wss.emit('alertToClient',client.id + " disconnected");
  }


  
  sendToAll(msg: string) {
    
    this.wss.emit('alertToClient', { type: 'Alert', message: msg})
  }


  @SubscribeMessage('alertToServer')
  handleMessage(client: Socket, message: { sender:string, message:string }) {
    this.wss.emit('alertToClient', message);
  }
}
