package io.demo.entity.pojo;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:09
 */
@Data
@TableName(value = "tb_product_info", autoResultMap = true)
public class ProductInfo implements Serializable {
  private int id;
  private String companyName;
  private String productName;
  private String code;
  private BigDecimal price;
  private int skuType;
  private int colorType;
  @TableField(fill = FieldFill.INSERT)
  private LocalDateTime createTime;
  private Long stock;
  private int status;
}
