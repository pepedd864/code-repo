package io.demo.controller;

import io.demo.entity.dto.LoginBodyDto;
import io.demo.entity.result.Result;
import io.demo.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 10:05
 */
@RestController
@RequestMapping("/user")
public class AuthController {
  @Autowired
  private IUserService userService;


  @PostMapping("/login")
  public Result login(@RequestBody @Validated LoginBodyDto loginBodyDto) {
    return userService.login(loginBodyDto);
  }
}
