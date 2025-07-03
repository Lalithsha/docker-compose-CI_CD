import {prismaClient}from '@repo/db/client'

Bun.serve({
    port:8081,
    fetch:(req, server)=>{
         // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Hello from WebSocket server!", {status:500});
    },
    websocket:{
        message(ws,message){
            prismaClient.user.create({
                data:{
                    username: Math.random().toString(),
                    password:Math.random().toString()
                }
            })
            ws.send(`Received message: ${message}`);
        },
    },
})
