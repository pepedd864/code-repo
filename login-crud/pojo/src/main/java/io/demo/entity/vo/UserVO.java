package io.demo.entity.vo;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:21
 */
@Data
@Builder
public class UserVO implements Serializable {
  private String userName;
  private String nickName;
  private String phone;
  private String email;
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime createTime;
}
