package io.demo.config.converters;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:59
 */
@Component
@Slf4j
public class LocalDateTimeConverters implements Converter<String, LocalDateTime> {
  @Override
  public LocalDateTime convert(String source) {
    log.info("StringConverters.convert source:{}", source);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    return LocalDateTime.parse(source, formatter);
  }
}
