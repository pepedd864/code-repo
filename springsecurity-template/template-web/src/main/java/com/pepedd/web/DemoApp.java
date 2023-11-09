package com.pepedd.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @ClassName DemoApp
 * @Description TODO
 * @Version 1.0
 * @Date 2023/8/22 8:27
 * @Author pepedd864
 */
@SpringBootApplication(scanBasePackages = {"com.pepedd"})
public class DemoApp {
  public static void main(String[] args) {
    SpringApplication.run(DemoApp.class, args);
  }
}
