package com.pepedd.web.service;

import com.pepedd.pojo.dto.UserDTO;
import org.springframework.stereotype.Service;

/**
 * @ClassName UserService
 * @Description TODO
 * @Version 1.0
 * @Date 2023/8/22 11:05
 * @Author pepedd864
 */
@Service
public interface UserService {
  void insertUser(UserDTO user);
}
