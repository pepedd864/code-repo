package io.demo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.demo.entity.dto.PageDto;
import io.demo.entity.dto.ProductInfoDto;
import io.demo.entity.pojo.ProductInfo;
import io.demo.entity.result.Result;
import io.demo.entity.vo.PageVO;
import io.demo.mapper.ProductInfoMapper;
import io.demo.service.IProductInfoService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:13
 */
@Service
public class ProductInfoServiceImpl extends ServiceImpl<ProductInfoMapper, ProductInfo> implements IProductInfoService {


  @Override
  public Result list(PageDto dto) {
    // 1.校验参数
    dto.checkParam();
    // 2.分页查询
    Page<ProductInfo> page = Page.of(dto.getCurrent(), dto.getPageSize());
    LambdaQueryWrapper<ProductInfo> wrapper = new LambdaQueryWrapper<>();
    // 3.查询条件 sortId sortOrder
    if (dto.hasSort()) {
      // id
      if (dto.getSortField().equals("id")) {
        wrapper.orderBy(true, dto.getSortOrder().equals("ascend"), ProductInfo::getId);
      }
      // createTime
      if (dto.getSortField().equals("createTime")) {
        wrapper.orderBy(true, dto.getSortOrder().equals("ascend"), ProductInfo::getCreateTime);
      }
    }
    page = page(page, wrapper);
    // 4.组装返回值
    PageVO pageVO = PageVO.builder()
        .current(dto.getCurrent())
        .pageSize(dto.getPageSize())
        .total((int) page.getTotal())
        .build();
    pageVO.setData(page.getRecords());
    return pageVO;
  }

  @Override
  public Result delete(String ids) {
    // 1. 将ids 分割为数组
    String[] idArr = ids.split(",");
    // 2. 遍历数组，执行删除
    for (String id : idArr) {
      // 3. 查询数据是否存在
      ProductInfo productInfo = getById(id);
      if (productInfo == null) {
        throw new RuntimeException("数据不存在");
      }
      removeById(id);
    }
    // 3. 返回结果
    return Result.success("删除成功");
  }

  @Override
  public Result add(ProductInfoDto dto) {
    ProductInfo productInfo = new ProductInfo();
    BeanUtils.copyProperties(dto, productInfo);
    save(productInfo);
    return Result.success("添加成功");
  }

  @Override
  public Result update(ProductInfoDto dto) {
    ProductInfo productInfo = new ProductInfo();
    BeanUtils.copyProperties(dto, productInfo);
    updateById(productInfo);
    return Result.success("更新成功");
  }
}
