package io.demo.interceptor;

import io.demo.constants.JwtClaimsConstant;
import io.demo.entity.result.Result;
import io.demo.properties.JwtProperties;
import io.demo.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:55
 */
@Component
@Slf4j
public class JwtUserInterceptor implements HandlerInterceptor {
  @Autowired
  private JwtProperties jwtProperties;

  /**
   * 请求拦截器，校验jwt
   *
   * @param request
   * @param response
   * @param handler
   * @return
   * @throws Exception
   */
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    //判断当前拦截的是controller的方法还是其他资源
    if (!(handler instanceof HandlerMethod)) {
      // 不是动态方法，直接放行
      return true;
    }

    // 获取令牌
    String token = request.getHeader(jwtProperties.getUserTokenName());

    // 校验jwt
    try {
      log.info("校验jwt:{}", token);
      Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
      Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
      log.info("当前用户:{}", userId);
      return true;
    } catch (Exception e) {
      response.setStatus(401);
      response.setContentType("text/html;charset=utf-8");
      PrintWriter out = response.getWriter();
      out.println(Result.error("用户信息已失效"));
      return false;
    }
  }
}
