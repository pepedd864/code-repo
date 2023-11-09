package io.demo.controller;

import io.demo.entity.dto.PageDto;
import io.demo.entity.dto.ProductInfoDto;
import io.demo.entity.result.Result;
import io.demo.service.IProductInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 8:52
 */
@RestController
public class IndexConroller {
  @Autowired
  private IProductInfoService productInfoService;

  @GetMapping("/")
  public String index() {
    return "hello world";
  }

  @PostMapping("/list")
  public Result list(@RequestBody PageDto dto) {
    return productInfoService.list(dto);
  }

  @PostMapping("/delete")
  public Result delete(@NotNull(message = "删除数组不能为空") String ids) {
    return productInfoService.delete(ids);
  }

  @PostMapping("/add")
  public Result add(@RequestBody ProductInfoDto dto) {
    return productInfoService.add(dto);
  }

  @PostMapping("/update")
  public Result update(@RequestBody ProductInfoDto dto) {
    return productInfoService.update(dto);
  }
}
