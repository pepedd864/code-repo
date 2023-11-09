package com.pepedd.web.mapper;

import com.pepedd.pojo.dto.UserDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

/**
 * @ClassName UserMapper
 * @Description TODO
 * @Version 1.0
 * @Date 2023/8/22 11:07
 * @Author pepedd864
 */
@Mapper
public interface UserMapper {
  @Insert("insert into user (user_id, username, mobile, email, create_time) values (#{userId}, #{username}, #{mobile}, #{email}, #{createTime})")
  void insertUser(UserDTO user);
}
