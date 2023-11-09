package com.pepedd.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 * @Description TODO
 * @Date 2023/8/28 10:38
 * @Author pepedd864
 */
@Data
@TableName("tb_user")
public class User {
  private Long userId;
  private String userName;
  private String password;
}
