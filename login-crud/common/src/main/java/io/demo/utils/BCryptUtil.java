package io.demo.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * BCrypt密码加密
 *
 * @Date 2023/9/15 10:24
 * @Author pepedd864
 */
public class BCryptUtil {
  /**
   * 生成BCryptPasswordEncoder密码
   *
   * @param rawPassword 真实密码
   * @return 加密字符串
   */
  public static String encryptPassword(String rawPassword) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.encode(rawPassword);
  }

  /**
   * 判断密码是否相同
   *
   * @param rawPassword     真实密码
   * @param encodedPassword 加密字符串
   * @return 结果
   */
  public static boolean matchesPassword(String rawPassword, String encodedPassword) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.matches(rawPassword, encodedPassword);
  }
}
