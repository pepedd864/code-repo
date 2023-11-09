package io.demo.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:29
 */
@Data
public class LoginBodyDto implements Serializable {
  @NotBlank(message = "用户名不能为空")
  private String username;
  @NotBlank(message = "密码不能为空")
  private String password;
}
