import { Logger, UseGuards } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketAuthGuard } from '../auth/websocket-auth.guard';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway')

  afterInit(server: any) {
    this.logger.log('Initialized...');
  }

 
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender:string, room:string ,message:string }) {
  
    this.wss.to(message.room).emit('chatToClient', message);
  }
/*
  @UseGuards(WebSocketAuthGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: { room: string, token: string }) {
    const { room, token } = data;
  
    // Verify the token and perform any necessary authentication checks
   console.log(client['user']);
    // If the token is valid, join the room
    client.join(room);
    client.emit('joinedRoom', room);
  }*/
  @UseGuards(WebSocketAuthGuard)
   @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, { sender, room}){
   // this.socket.chat.emit('joinRoom', { sender: this.username, room: this.activeRoom});
    console.log(sender);
    client.join(room);
    client.emit('joinedRoom',room)
   // this.wss.to(room).emit('chatToClient', {sender:"SERVER ", message: client['user'].username+' comin to the room!!! '});
    this.wss.to(room).emit("chatToClient", { sender: "SERVER", message: sender+' comin to the room!!!', room: room})
  }  

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, { sender, room}){
    client.leave(room);
    client.emit('leftRoom',room)
    this.wss.to(room).emit("chatToClient", { sender: "SERVER", message: sender+' leave  the room!!!', room: room})
  }
}
