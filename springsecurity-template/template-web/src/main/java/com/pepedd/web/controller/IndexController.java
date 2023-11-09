package com.pepedd.web.controller;

import com.pepedd.common.result.Result;
import com.pepedd.pojo.dto.UserDTO;
import com.pepedd.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @ClassName IndexController
 * @Description TODO
 * @Version 1.0
 * @Date 2023/8/22 8:40
 * @Author pepedd864
 */
@RestController
public class IndexController {
  @Autowired
  private UserService userService;

  @GetMapping("/")
  public String index() {
    return "Hello World!";
  }

  @PostMapping("/insert")
  public Result insertUser(@Validated UserDTO user) {
    userService.insertUser(user);
    return Result.success(null);
  }
}
