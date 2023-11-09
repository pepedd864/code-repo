package io.demo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.demo.entity.pojo.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * TODO
 *
 * @author pepedd864
 * @since 2023/10/3 9:14
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
}
