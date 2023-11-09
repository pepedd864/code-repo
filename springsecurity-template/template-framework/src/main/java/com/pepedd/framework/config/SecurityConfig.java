package com.pepedd.framework.config;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @Description TODO
 * @Date 2023/8/27 16:11
 * @Author pepedd864
 */
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    http.csrf().disable()
//        .authorizeRequests()
//        .anyRequest()
//        .authenticated();
//  }
}

