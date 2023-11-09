package io.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.demo.entity.pojo.ProductInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:15
 */
@Mapper
public interface ProductInfoMapper extends BaseMapper<ProductInfo> {
}
