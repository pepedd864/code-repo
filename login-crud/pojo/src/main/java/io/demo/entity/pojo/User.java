package io.demo.entity.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:09
 */
@Data
@TableName(value = "sys_user", autoResultMap = true)
public class User implements Serializable {
  private int userId;
  private String userName;
  private String nickName;
  private String password;
  private String phone;
  private String email;
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @TableField(fill = FieldFill.INSERT)
  private LocalDateTime createTime;
}
