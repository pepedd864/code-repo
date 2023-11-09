package com.pepedd.controller;

import com.pepedd.websocket.WebSocketServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Description TODO
 * @Date 2023/8/28 10:37
 * @Author pepedd864
 */
@RestController
public class IndexController {
  @Autowired
  private WebSocketServer webSocketServer;

  @GetMapping("/")
  public String index() {
    return "Hello Spring Boot!";
  }

  @PostMapping("/sendAll")
  public String send(String msg) {
    webSocketServer.sendToAllClient(msg);
    return "success";
  }

  @PostMapping("/send")
  public String send(String msg,String clientId) {
    webSocketServer.sendToClient(msg, clientId);
    return "success";
  }
}
