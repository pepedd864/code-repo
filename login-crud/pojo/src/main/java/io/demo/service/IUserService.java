package io.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.demo.entity.dto.LoginBodyDto;
import io.demo.entity.pojo.User;
import io.demo.entity.result.Result;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:12
 */
public interface IUserService extends IService<User> {
  Result login(LoginBodyDto loginBodyDto);
}
