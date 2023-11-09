package io.demo.entity.dto;

import lombok.Data;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:30
 */
@Data
public class ProductInfoDto implements Serializable {
  private int id;
  @NotNull(message = "公司名称不能为空")
  private String companyName;
  @NotNull(message = "产品名称不能为空")
  private String productName;
  @NotNull(message = "产品编码不能为空")
  private String code;
  @NotNull(message = "产品价格不能为空")
  @DecimalMin("0.0")
  private BigDecimal price;
  @NotNull(message = "sku类型不能为空")
  @Min(value = 1, message = "sku类型不正确")
  private int skuType;
  @NotNull(message = "颜色类型不能为空")
  @Min(value = 1, message = "颜色类型不正确")
  private int colorType;
  @NotNull(message = "库存不能为空")
  @Min(value = 0, message = "库存不能小于0")
  private Long stock;
  @NotNull(message = "状态不能为空")
  @Min(value = 0, message = "状态不正确")
  private int status;
}
