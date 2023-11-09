package io.demo.config;

import io.demo.config.converters.LocalDateTimeConverters;
import io.demo.interceptor.JwtUserInterceptor;
import io.demo.json.JacksonObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

import java.util.List;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 10:01
 */
@Configuration
@Slf4j
public class WebMvcConfig extends WebMvcConfigurationSupport {

  @Autowired
  private JwtUserInterceptor jwtUserInterceptor;
  @Autowired
  private LocalDateTimeConverters localDateTimeConverters;


  /**
   * 注册自定义拦截器
   *
   * @param registry
   */
  @Override
  protected void addInterceptors(InterceptorRegistry registry) {
    log.info("开始注册自定义拦截器...");
    registry.addInterceptor(jwtUserInterceptor)
        .addPathPatterns("/**")
        .excludePathPatterns("/")
        .excludePathPatterns("/user/login")
        .excludePathPatterns("/user/register");
  }

  /**
   * 拓展Spring MVC消息转换器
   * 处理一些特殊的返回值在序列化时的问题
   *
   * @param converters
   */
  protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    converter.setObjectMapper(new JacksonObjectMapper());
    converters.add(0, converter);
  }


  /**
   * 添加自定义转换器
   *
   * @param registry
   */
  @Override
  protected void addFormatters(FormatterRegistry registry) {
    registry.addConverter(localDateTimeConverters);
  }
}
