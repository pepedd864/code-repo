package io.demo.entity.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:22
 */
@Data
public class ProductInfoVO implements Serializable {
  private int id;
  private String companyName;
  private String productName;
  private String code;
  private BigDecimal price;
  private int skuType;
  private int colorType;
  private LocalDateTime createTime;
  private Long stock;
  private int status;
}
