package io.demo.entity.vo;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:23
 */
@Data
@Builder
public class LoginVO implements Serializable {
  private String token;
  private UserVO userVO;
}
