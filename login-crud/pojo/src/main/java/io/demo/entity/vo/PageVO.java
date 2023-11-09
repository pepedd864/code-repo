package io.demo.entity.vo;

import io.demo.entity.result.Result;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:24
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Builder
public class PageVO extends Result implements Serializable {
  private static final long serialVersionUID = 1L;
  private Integer current;
  private Integer pageSize;
  private Integer total;

  public PageVO(Integer current, Integer pageSize, Integer total) {
    this.current = current;
    this.pageSize = pageSize;
    this.total = total;
  }

  public PageVO() {
  }
}
