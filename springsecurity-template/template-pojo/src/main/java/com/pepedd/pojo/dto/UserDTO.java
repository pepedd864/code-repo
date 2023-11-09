package com.pepedd.pojo.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

/**
 * @ClassName UserDTO
 * @Description TODO
 * @Version 1.0
 * @Date 2023/8/22 8:29
 * @Author pepedd864
 */
@Data
public class UserDTO {
  @NotNull(message = "用户ID不能为空")
  private Long userId;
  @NotBlank(message = "用户名不能为空")
  @Length(min = 2, max = 20, message = "用户名长度必须在2-20之间")
  @Pattern(regexp = "^[\\u4E00-\\u9FA5A-Za-z0-9\\*]*$", message = "用户昵称限制：最多20字符，包含文字、字母和数字")
  private String username;
  @NotBlank(message = "手机号不能为空")
  @Pattern(regexp = "^[1][3,4,5,6,7,8,9][0-9]{9}$", message = "手机号格式有误")
  private String mobile;
  @NotBlank(message = "联系邮箱不能为空")
  @Email(message = "邮箱格式不对")
  private String email;
  @Past(message = "时间必须是过去时间")
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private LocalDate createTime;
}
