package com.pepedd.web.service.impl;

import com.pepedd.pojo.dto.UserDTO;
import com.pepedd.web.mapper.UserMapper;
import com.pepedd.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName UserServiceImpl
 * @Description TODO
 * @Version 1.0
 * @Date 2023/8/22 11:07
 * @Author pepedd864
 */
@Service
public class UserServiceImpl implements UserService {
  @Autowired
  private UserMapper userMapper;

  @Override
  public void insertUser(UserDTO user) {
    userMapper.insertUser(user);
  }
}
