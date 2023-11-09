package io.demo.entity.dto;

import lombok.Data;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:29
 */


@Data
public class PageDto {
  protected Integer pageSize;
  protected Integer current;
  protected String sortField;
  protected String sortOrder;

  public void checkParam() {
    if (this.current == null || this.current < 0) {
      setCurrent(1);
    }
    if (this.pageSize == null || this.pageSize < 0 || this.pageSize > 100) {
      setPageSize(10);
    }
  }

  public boolean hasSort() {
    return this.sortField != null && this.sortOrder != null;
  }
}
