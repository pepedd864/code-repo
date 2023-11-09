package io.demo.handler;

import io.demo.result.Result;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ValidationException;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:36
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * 处理所有不可知的异常
   */
  @ExceptionHandler
  public Result exceptionHandler(Exception ex) {
    ex.printStackTrace();
    if (ex.getMessage() != null) {
      return Result.error(ex.getMessage());
    }
    return Result.error("系统异常");
  }

  /**
   * 处理参数校验异常
   */
  @ExceptionHandler(value = {BindException.class, ValidationException.class, MethodArgumentNotValidException.class})
  public Result handleValidatorException(Exception e) {
    StringBuilder sb = new StringBuilder("校验失败:[");
    if (e instanceof BindException) {
      BindException exception = (BindException) e;
      BindingResult bindingResult = exception.getBindingResult();
      for (FieldError fieldError : bindingResult.getFieldErrors()) {
        sb.append(fieldError.getDefaultMessage()).append(";");
      }
    } else if (e instanceof ValidationException) {
      ValidationException exception = (ValidationException) e;
      sb.append(exception.getMessage());
    } else if (e instanceof MethodArgumentNotValidException) {
      MethodArgumentNotValidException exception = (MethodArgumentNotValidException) e;
      sb.append(exception.getBindingResult().getFieldError().getDefaultMessage());
    }
    sb.append("]");
    return Result.error(sb.toString());
  }

}

