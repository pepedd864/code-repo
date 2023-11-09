package io.demo.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:53
 */
@Component
@ConfigurationProperties(prefix = "demo.jwt")
@Data
public class JwtProperties {
  private String userSecretKey;
  private long userTtl;
  private String userTokenName;
}
