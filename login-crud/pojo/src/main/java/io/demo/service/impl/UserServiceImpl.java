package io.demo.service.impl;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.demo.constants.JwtClaimsConstant;
import io.demo.entity.dto.LoginBodyDto;
import io.demo.entity.pojo.User;
import io.demo.entity.result.Result;
import io.demo.entity.vo.LoginVO;
import io.demo.entity.vo.UserVO;
import io.demo.mapper.UserMapper;
import io.demo.properties.JwtProperties;
import io.demo.service.IUserService;
import io.demo.utils.BCryptUtil;
import io.demo.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:13
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
  @Autowired
  private JwtProperties jwtProperties;

  @Override
  public Result login(LoginBodyDto loginBodyDto) {
    // 1.校验密码
    User user = getOne(Wrappers.<User>lambdaQuery().eq(User::getUserName, loginBodyDto.getUsername()));
    if (user == null) {
      throw new RuntimeException("用户不存在");
    }
    if (!BCryptUtil.matchesPassword(loginBodyDto.getPassword(), user.getPassword())) {
      throw new RuntimeException("密码错误");
    }
    // 2.生成token
    Map map = new HashMap<>();
    map.put(JwtClaimsConstant.USER_ID, user.getUserId());
    map.put(JwtClaimsConstant.USERNAME, user.getUserName());
    map.put(JwtClaimsConstant.NICKNAME, user.getNickName());
    String token = JwtUtil.createJWT(jwtProperties.getUserSecretKey(), jwtProperties.getUserTtl(), map);
    // 3.返回结果
    UserVO userVO = UserVO.builder()
        .userName(user.getUserName())
        .email(user.getEmail())
        .phone(user.getPhone())
        .nickName(user.getNickName())
        .createTime(user.getCreateTime())
        .build();
    LoginVO loginVO = LoginVO.builder()
        .token(token)
        .userVO(userVO)
        .build();
    return Result.success(loginVO);
  }
}
