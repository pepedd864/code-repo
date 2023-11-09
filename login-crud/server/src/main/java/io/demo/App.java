package io.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 8:51
 */
@SpringBootApplication(scanBasePackages = {"io.demo"})
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }
}
