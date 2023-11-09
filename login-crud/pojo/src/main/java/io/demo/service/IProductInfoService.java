package io.demo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.demo.entity.dto.PageDto;
import io.demo.entity.dto.ProductInfoDto;
import io.demo.entity.pojo.ProductInfo;
import io.demo.entity.result.Result;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:12
 */
public interface IProductInfoService extends IService<ProductInfo> {

  Result list(PageDto dto);

  Result delete(String ids);

  Result add(ProductInfoDto dto);

  Result update(ProductInfoDto dto);
}
