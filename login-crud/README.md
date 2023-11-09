# 两小时完成SpringBoot + Vue3前后端分离项目

技术栈

java 8

redis（用户验证码校验，本教程中未实现，可自行实现）

mysql

springboot 2.5.14

mybatisplus lombok spring-validation jwt hutool

vue 3.3.4

ant-design-vue axios

这里主要讲项目的配置和一些比较好用的技术栈，项目的拓展可以留给大家自己做做

## 1. 创建工程



### 1.1 创建SpringBoot工程

1. 创建父工程

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/bc3fbf170a307d68a10dc1c45b6d1978.png" style="zoom: 67%;" />

2. 创建子模块，一般为三个模块，也可根据自身喜好选择单模块开发

<center class="half"><img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/4ee9c1be79eab1c68c8d09b86aef5a6d.png" style="zoom:67%;" /><img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/eeeb0f94ed3f91e826ee00fafd26b515.png" style="zoom:100%;" /></center>



3. 创建项目完毕，现在为项目添加依赖，首先添加`SpringBoot`父依赖

```xml
<!--引入springboot父依赖-->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.14</version>
</parent>
```

4. 可以通过`<dependencyManagement>`为所有子模块管理依赖版本，在子模块中**按需导入**，或者通过`<dependencies>`直接**为所有模块导入一样的依赖**

版本控制

```xml
<properties>
    <maven.compiler.source>8</maven.compiler.source>
    <maven.compiler.target>8</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <!--统一管理依赖-->
    <project.version>1.0.0</project.version>
    <spring-boot.version>2.5.14</spring-boot.version>
    <mysql.version>8.0.26</mysql.version>
    <mybatis-plus.version>3.4.3</mybatis-plus.version>
    <lombok.version>1.18.20</lombok.version>
    <jjwt.version>0.9.1</jjwt.version>
    <fastjson.version>1.2.78</fastjson.version>
    <hutool.version>5.7.10</hutool.version>
    <pagehelper.version>1.3.0</pagehelper.version>
</properties>
```

添加依赖

```xml
<dependencies>
    <!--web-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!--注解-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <!--redis-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <!--mysql 驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>${mysql.version}</version>
    </dependency>
    <!--mybatis-plus-->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>${mybatis-plus.version}</version>
    </dependency>
    <!--lombok-->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>${lombok.version}</version>
    </dependency>
    <!--jwt-->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt</artifactId>
        <version>${jjwt.version}</version>
    </dependency>
    <!--fastjson-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>${fastjson.version}</version>
    </dependency>
    <!--hutool-->
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>${hutool.version}</version>
    </dependency>
    <!--密码加密-->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-crypto</artifactId>
    </dependency>
    <!--分页-->
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper-spring-boot-starter</artifactId>
        <version>${pagehelper.version}</version>
    </dependency>
</dependencies>
```

5. 现在可以添加Spring Boot入口进行测试，记得刷新Maven项目加载依赖

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/513f9a5fcb83334470fcd0f5d91d9da4.png)

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/3d5d65f26e1f27a73cecc09625f12c6c.png)

6. 你会发现，第一次运行项目就会报错无法正常运行，这个时候不要慌，其实是因为引入了mybatis 没有为其设置数据库的连接导致启动失败，这个时候我们添加配置就行

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/a22e5e53f6c557e0d7f311f2d043558b.png)

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/16da892b69d58a94e03de4464b78d0d2.png)

7. 添加控制器，创建Spring Boot项目完毕

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/c59c383daecb28bedd5c42d20792cbcc.png)

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/9529ddb366f93204a77e000cf01980b3.png)



### 1.2 创建Vue工程

1. 创建Vue工程，这里推荐使用pnpm安装

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/94a5abadae959bc935ec63d2c6ef13ef.png)

2. 运行项目

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/2d661d9acf2e4cdf71217475d1022c3e.png)



## 2. 设计数据库

这里只做简单的增删改查，所以数据库只有两个，但是项目预留的添加空间非常多，可以根据自己项目的需求自行设计其他数据库表结构

### 2.1 用户表

这个是最基础的表，如果要实现登录注册效果，就需要设计用户表，同时如果需要拓展权限系统，还需要设计权限表和角色表（RBAC权限系统）

一般来讲，设计用户表需要用户名和密码，这两个字段可以是`username`和`password`，如果是电商系统，用户名则可以是账户名`account`。接着是用户的基本信息，如昵称，性别，年龄等等，然后如果要接入账号验证系统，则需要邮箱`email`或者手机号`phone`，以此来进行账号验证。最后可以是一些系统信息，如账号何时注册，何时最后一次登录，最后一次登录IP是什么等等。

最后设计的表结构如下

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/f492903d8db091a8a535fe7862bd88d6.png)

```sql
CREATE TABLE `test`.`sys_user`  (
  `user_id` int NOT NULL COMMENT '用户id',
  `user_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `nick_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `create_time` datetime NOT NULL COMMENT '创建时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;
```



### 2.2 商品表

这里只做增删改查目的，故没有设计要素

<img src="https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/054afe812248d6b6ec2c4a5dd8021aee.png" style="zoom:67%;" />

```sql
CREATE TABLE `test`.`tb_product_info`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `company_name` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '公司ID',
  `code` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品编号',
  `product_name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `price` decimal(15, 2) NULL DEFAULT NULL COMMENT '价格',
  `sku_type` tinyint NULL DEFAULT NULL COMMENT 'sku类型',
  `color_type` tinyint NULL DEFAULT NULL COMMENT '颜色类型',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `stock` bigint NULL DEFAULT NULL COMMENT '库存',
  `status` tinyint NULL DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_code`(`code` ASC) USING BTREE,
  UNIQUE INDEX `idx_sku_color`(`sku_type` ASC, `color_type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 130 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = '商品信息' ROW_FORMAT = Dynamic;
```



## 3. 系统整体架构

### 3.1 后端架构

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/12f0ac44ad62734c8975085f7d9520fe.png)

**访问服务流程**

1. 用户访问接口，来到校验拦截器。如果用户携带的token无效，则返回401
2. 通过校验拦截器，来到控制器层，如果控制器层运行出错，提交到GlobalExceptionHandler中进行处理，返回错误结果
3. 通过控制器层，来到服务层，服务层通过Mapper访问数据库（这里因为是MyBatisPlus所以省略Mapper层），如果出错转由GlobalExceptionHandler处理
4. 控制器层拿到服务器层的结果，通过Message Converters处理最后返回到用户端。



### 3.2 前端架构

**主页面**

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/34b4ae01474c4de022670934bcf3a3f2.png)

**登录页**

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/417ed8c1cf11a6b29922fda0fce87de2.png)



## 4. 后端

### 4.1 设计实体类和对应的Mapper Service

1. 根据数据库表结构设计实体类，这里直接和数据库对应即可

```java
/**
 * 用户实体类
 *
 * @Date 2023/9/14 9:08
 * @Author pepedd864
 */
@Data
@TableName(value = "sys_user", autoResultMap = true)
public class User implements Serializable {
  private int userId;
  private String userName;
  private String nickName;
  private String password;
  private String phone;
  private String email;
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @TableField(fill = FieldFill.INSERT)
  private LocalDateTime createTime;
}

/**
 * 产品信息实体类
 *
 * @Date 2023/9/14 9:08
 * @Author pepedd864
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

```

2. Mapper Service直接使用MyBatisPlus提供的基础方法即可

```java
/**
 * 用户mapper
 *
 * @Date 2023/9/14 9:28
 * @Author pepedd864
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {
}

/**
 * 用户service
 *
 * @Date 2023/9/14 9:27
 * @Author pepedd864
 */
public interface IUserService extends IService<User> {
}
```

```java
/**
 * 产品信息mapper
 *
 * @Date 2023/9/14 9:22
 * @Author pepedd864
 */
@Mapper
public interface ProductInfoMapper extends BaseMapper<ProductInfo> {
}

/**
 * 产品信息service
 *
 * @Date 2023/9/14 9:23
 * @Author pepedd864
 */
public interface IProductInfoService extends IService<ProductInfo> {
}
```



### 4.2 设计VO

先定义MyBatisPlus配置

```yml
mybatis-plus:
  #mapper配置文件
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: io.demo.entity
  configuration:
    #开启驼峰命名
    map-underscore-to-camel-case: true
```

**MyBatisPlusConfig**

```java
/**
 * MyBatisPlus配置类
 *
 * @Date 2023/9/15 20:21
 * @Author pepedd864
 */
@Configuration
@MapperScan(basePackages = {"io.demo.mapper"})
public class MyBatisPlusConfig {
  @Bean
  public MybatisPlusInterceptor mybatisPlusInterceptor() {
    MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
    interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));//如果配置多个插件,切记分页最后添加
    //interceptor.addInnerInterceptor(new PaginationInnerInterceptor()); 如果有多数据源可以不配具体类型 否则都建议配上具体的DbType
    return interceptor;
  }
}

```

VO类是接口返回的封装类，因此注意不要泄漏重要信息即可

```java
/**
 * 用户vo
 *
 * @Date 2023/9/14 9:08
 * @Author pepedd864
 */
@Data
@Builder
public class UserVO implements Serializable {
  private String userName;
  private String nickName;
  private String phone;
  private String email;
  @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime createTime;
}

/**
 * 产品信息vo
 *
 * @Date 2023/9/14 9:08
 * @Author pepedd864
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

/**
 * 登录vo
 *
 * @Date 2023/9/15 10:34
 * @Author pepedd864
 */
@Data
@Builder
public class LoginVO implements Serializable {
  private String token;
  private UserVO userVO;
}

/**
 * 分页vo
 *
 * @Date 2023/9/15 20:25
 * @Author pepedd864
 */
@Data
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

```



### 4.3 设计DTO

主要是登录DTO，分页查询DTO和产品DTO

```java
/**
 * 登录dto
 *
 * @Date 2023/9/15 10:10
 * @Author pepedd864
 */
@Data
public class LoginBodyDto implements Serializable {
  @NotBlank(message = "用户名不能为空")
  private String username;
  @NotBlank(message = "密码不能为空")
  private String password;
}

/**
 * 分页查询dto
 *
 * @Date 2023/9/15 20:24
 * @Author pepedd864
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
}

/**
 * 产品信息dto
 *
 * @Date 2023/9/18 10:02
 * @Author pepedd864
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
```



### 4.4 封装统一返回结果类

这里可以随便自己设计

```java
/**
 * 统一返回类
 *
 * @Date 2023/8/22 8:33
 * @Author pepedd864
 */
@Data
public class Result<T> implements Serializable {

  private Integer code; //编码：1成功，0和其它数字为失败
  private String msg; //错误信息
  private T data; //数据

  public Result() {
    this.code = 1;
  }

  public static <T> Result<T> success() {
    Result<T> result = new Result<T>();
    result.code = 1;
    return result;
  }

  public static <T> Result<T> success(T object) {
    Result<T> result = new Result<T>();
    result.data = object;
    result.code = 1;
    return result;
  }

  public static <T> Result<T> error(String msg) {
    Result result = new Result();
    result.msg = msg;
    result.code = 0;
    return result;
  }

  /**
   * 重写toString方法, 默认返回json字符串
   *
   * @return
   */
  @Override
  public String toString() {
    return JSONUtil.toJsonStr(this);
  }
}
```





### 4.5 使用Spring Validation校验参数

**对于程序内参数的校验，常见的可分为几种方法：**

1. 使用大量的`if...else`判断，这种方式运行效率较高，但是会导致代码臃肿，难以维护，耗费大量时间和精力，因此极不推荐
2. 使用自定义注解校验，这种方式效率适中，但是造轮子的过程比较难受，而且实际上并不好用，越是想造得通用，越要花费大量时间精力，也不是很推荐

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/19453739f5e77fb1c23e5a2fd6938b87.png)

3. 使用spring validation进行参数校验，开箱即用，配置时间短，且非常通用，可以用在实体类上，函数参数中等等，甚至可以嵌套校验，内置大量注解，可以节省非常多的时间。

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/bd1305ff31c55b2489fdd440b1ef6c78.png)



#### 4.5.1 Spring Validation介绍

**常见的参数校验框架有下面几种**

1. `Bean-Validation`：`Bean-Validation` 是一款轻量级的参数校验框架，基于 `JSR-303` 标准，可以实现对 `Java Bean` 属性的校验，支持多种校验注解和自定义校验规则。

2. `Hibernate Validator` ：`Hibernate Validator` 是一个基于 `Bean Validation` 标准的参数校验框架，可以实现对 `Java Bean` 属性的校验，支持多种校验注解和自定义校验规则。

3. `Spring Validation` ：`Spring Validation` 是 `Spring` 框架提供的参数校验框架，基于 `Bean Validation` 标准，可以实现对 `Java Bean` 属性和方法参数的校验，支持多种校验注解和自定义校验规则。

4. `Apache Commons Validator` ：`Apache Commons Validator` 是一个通用的参数校验框架，支持多种校验规则和自定义校验规则，可以实现对字符串、数字、日期等数据类型的校验。

可以看到`Spring Validation`在其中还是有非常强大的优势，最为强大的就是其是`Spring`家族中的一员，对于`Spring`程序有更好的兼容性



#### 4.5.2 使用

1. 引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

2. 设计全局异常处理器，这里照着我这个抄就行了，有能力可以自己研究一下

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
  /**
   * 处理参数校验异常
   */
  @ExceptionHandler(value = {BindException.class, ValidationException.class, MethodArgumentNotValidException.class})
  public Result handleValidatorException(Exception e) {
    StringBuilder sb = new StringBuilder("校验失败:[");
    if (e instanceof BindException) {
      BindException exception = (BindException) e;
      BindingResult bindingResult = exception.getBindingResult();
      for (FieldError fieldError : bindingResult.getFieldErrors()) {
        sb.append(fieldError.getDefaultMessage()).append(";");
      }
    } else if (e instanceof ValidationException) {
      ValidationException exception = (ValidationException) e;
      sb.append(exception.getMessage());
    } else if (e instanceof MethodArgumentNotValidException) {
      MethodArgumentNotValidException exception = (MethodArgumentNotValidException) e;
      sb.append(exception.getBindingResult().getFieldError().getDefaultMessage());
    }
    sb.append("]");
    return Result.error(sb.toString());
  }

}

```

3. 在实体类上使用，在需要校验的函数参数上需要加上`@Validated`注解

```java
/**
 * 登录dto
 *
 * @Date 2023/9/15 10:10
 * @Author pepedd864
 */
@Data
public class LoginBodyDto implements Serializable {
  @NotBlank(message = "用户名不能为空")
  private String username;
  @NotBlank(message = "密码不能为空")
  private String password;
}
```

```java
@PostMapping("/login")
public Result login(@RequestBody @Validated LoginBodyDto loginBodyDto) {
  return userService.login(loginBodyDto);
}
```

4. 这样当参数校验失败时，就会有对应的错误提示

```java
{
    "code": 0,
    "msg": "校验失败:[密码不能为空;用户名不能为空;]",
    "data": null
}
```



5. 同时，这个注解也可以在函数参数上使用，但是需要在函数的类上加上`@Validated`注解

```java
@PostMapping("/delete")
public Result delete(@NotNull(message = "删除数组不能为空") String ids) {
  return productInfoService.delete(ids);
}
```

```java
@RestController
@Validated // 开启校验
public class IndexController {
	...
}
```



6. 同样的，你还可以对注解要生效的范围进行分组，比如在更新时生效

```java
@Data
public class User {

    @NotBlank(message = "用户名不能为空", groups = {Create.class, Update.class})
    private String username;

    @NotBlank(message = "密码不能为空", groups = {Create.class})
    private String password;

    @NotBlank(message = "手机号不能为空", groups = {Create.class})
    private String mobile;
}

```



7. 你还可以自定义注解，这里就不详细讲了，感兴趣的可以自行查阅

#### 4.5.3 内置校验注解

Bean Validation 中内置的 constraint

| 注解                        | 作用                                                     |
| --------------------------- | -------------------------------------------------------- |
| @Valid                      | 被注释的元素是一个对象，需要检查此对象的所有字段值       |
| @Null                       | 被注释的元素必须为 null                                  |
| @NotNull                    | 被注释的元素必须不为 null                                |
| @AssertTrue                 | 被注释的元素必须为 true                                  |
| @AssertFalse                | 被注释的元素必须为 false                                 |
| @Min(value)                 | 被注释的元素必须是一个数字，其值必须大于等于指定的最小值 |
| @Max(value)                 | 被注释的元素必须是一个数字，其值必须小于等于指定的最大值 |
| @DecimalMin(value)          | 被注释的元素必须是一个数字，其值必须大于等于指定的最小值 |
| @DecimalMax(value)          | 被注释的元素必须是一个数字，其值必须小于等于指定的最大值 |
| @Size(max, min)             | 被注释的元素的大小必须在指定的范围内                     |
| @Digits (integer, fraction) | 被注释的元素必须是一个数字，其值必须在可接受的范围内     |
| @Past                       | 被注释的元素必须是一个过去的日期                         |
| @Future                     | 被注释的元素必须是一个将来的日期                         |
| @Pattern(value)             | 被注释的元素必须符合指定的正则表达式                     |

Hibernate Validator 附加的 constraint

| 注解                                          | 作用                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| @Email                                        | 被注释的元素必须是电子邮箱地址                               |
| @Length(min=, max=)                           | 被注释的字符串的大小必须在指定的范围内                       |
| @NotEmpty                                     | 被注释的字符串的必须非空                                     |
| @Range(min=, max=)                            | 被注释的元素必须在合适的范围内                               |
| @NotBlank                                     | 被注释的字符串的必须非空                                     |
| @URL(protocol=,host=, port=, regexp=, flags=) | 被注释的字符串必须是一个有效的url                            |
| @CreditCardNumber                             | 被注释的字符串必须通过Luhn校验算法，银行卡，信用卡等号码一般都用Luhn计算合法性 |
| @ScriptAssert(lang=, script=, alias=)         | 要有Java Scripting API 即JSR 223("Scripting for the JavaTM Platform")的实现 |
| @SafeHtml(whitelistType=,additionalTags=)     | classpath中要有jsoup包                                       |

### 4.6 全局异常处理器

当程序运行出错时，可以根据错误类型为前端返回对应的结果，方便处理，这里设计了一个简单的异常处理器，直接抄就行了

```java
/**
 * 全局异常处理器
 *
 * @Date 2023/8/22 8:36
 * @Author pepedd864
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * 处理所有不可知的异常
   */
  @ExceptionHandler
  public Result exceptionHandler(Exception ex) {
    ex.printStackTrace();
    if (ex.getMessage() != null) {
      return Result.error(ex.getMessage());
    }
    return Result.error("系统异常");
  }

  /**
   * 处理参数校验异常
   */
  ...见上
}
```



### 4.7 全局请求拦截器

在编写拦截器前，需要先定义几个配置

```yml
demo:
  jwt:
    user-secret-key: pepedd
    user-ttl: 6000000 # 60*1000
    user-token-name: authentication
```

对应的Bean

```java
/**
 * jwt配置
 *
 * @Date 2023/9/15 9:25
 * @Author pepedd864
 */
@Component
@ConfigurationProperties(prefix = "demo.jwt")
@Data
public class JwtProperties {
  private String userSecretKey;
  private long userTtl;
  private String userTokenName;
}
```

同时给到JWT中存储信息的常量

```java
/**
 * jwt常量
 *
 * @Date 2023/9/15 9:48
 * @Author pepedd864
 */
public class JwtClaimsConstant {

  public static final String USER_ID = "userId";
  public static final String USERNAME = "username";
  public static final String NICKNAME = "nickname";
}
```

最后是拦截器内容

```java
/**
 * 全局请求拦截器
 *
 * @Date 2023/9/15 9:22
 * @Author pepedd864
 */
@Component
@Slf4j
public class JwtUserInterceptor implements HandlerInterceptor {
  @Autowired
  private JwtProperties jwtProperties;

  /**
   * 请求拦截器，校验jwt
   *
   * @param request
   * @param response
   * @param handler
   * @return
   * @throws Exception
   */
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    //判断当前拦截的是controller的方法还是其他资源
    if (!(handler instanceof HandlerMethod)) {
      // 不是动态方法，直接放行
      return true;
    }

    // 获取令牌
    String token = request.getHeader(jwtProperties.getUserTokenName());

    // 校验jwt
    try {
      log.info("校验jwt:{}", token);
      Claims claims = JwtUtil.parseJWT(jwtProperties.getUserSecretKey(), token);
      Long userId = Long.valueOf(claims.get(JwtClaimsConstant.USER_ID).toString());
      log.info("当前用户:{}", userId);
      return true;
    } catch (Exception e) {
      response.setStatus(401);
      response.setContentType("text/html;charset=utf-8");
      PrintWriter out = response.getWriter();
      out.println(Result.error("用户信息已失效"));
      return false;
    }
  }
}

```



### 4.8 添加拦截器和消息转换器

先添加一个JSON转换器

```java
/**
 * 对象映射器:基于jackson将Java对象转为json，或者将json转为Java对象
 * 将JSON解析为Java对象的过程称为 [从JSON反序列化Java对象]
 * 从Java对象生成JSON的过程称为 [序列化Java对象到JSON]
 */
public class JacksonObjectMapper extends ObjectMapper {

  public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
  //public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
  public static final String DEFAULT_DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";
  public static final String DEFAULT_TIME_FORMAT = "HH:mm:ss";

  public JacksonObjectMapper() {
    super();
    //收到未知属性时不报异常
    this.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

    //反序列化时，属性不存在的兼容处理
    this.getDeserializationConfig().withoutFeatures(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

    // 这里对时间的转换进行处理
    SimpleModule simpleModule = new SimpleModule()
        .addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
        .addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
        .addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)))
        .addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_TIME_FORMAT)))
        .addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT)))
        .addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern(DEFAULT_TIME_FORMAT)));

    //注册功能模块 例如，可以添加自定义序列化器和反序列化器
    this.registerModule(simpleModule);
  }
}

```

 再添加一个时间转换器

```java
@Component
@Slf4j
public class LocalDateTimeConverters implements Converter<String, LocalDateTime> {
  @Override
  public LocalDateTime convert(String source) {
    log.info("StringConverters.convert source:{}", source);
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    return LocalDateTime.parse(source, formatter);
  }
}
```



WebMVC配置类

```java
/**
 * 配置类，注册web层相关组件
 *
 * @Date 2023/9/15 9:23
 * @Author pepedd864
 */
@Configuration
@Slf4j
public class WebMvcConfig extends WebMvcConfigurationSupport {

  @Autowired
  private JwtUserInterceptor jwtUserInterceptor;
  @Autowired
  private LocalDateTimeConverters localDateTimeConverters;


  /**
   * 注册自定义拦截器
   *
   * @param registry
   */
  @Override
  protected void addInterceptors(InterceptorRegistry registry) {
    log.info("开始注册自定义拦截器...");
    registry.addInterceptor(jwtUserInterceptor)
        .addPathPatterns("/**")
        .excludePathPatterns("/")
        .excludePathPatterns("/user/login")
        .excludePathPatterns("/user/register");
  }

  /**
   * 拓展Spring MVC消息转换器
   * 处理一些特殊的返回值在序列化时的问题
   *
   * @param converters
   */
  protected void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
    MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
    converter.setObjectMapper(new JacksonObjectMapper());
    converters.add(0, converter);
  }


  /**
   * 添加自定义转换器
   *
   * @param registry
   */
  @Override
  protected void addFormatters(FormatterRegistry registry) {
    registry.addConverter(localDateTimeConverters);
  }
}
```



### 4.9 添加工具类

#### 4.9.1 JWT工具类

没啥好说的，自己看看JWT教程吧

```java
/**
 * jwt工具类
 *
 * @Date 2023/9/15 9:44
 * @Author pepedd864
 */

public class JwtUtil {
  /**
   * 生成jwt
   * 使用Hs256算法, 私匙使用固定秘钥
   *
   * @param secretKey jwt秘钥
   * @param ttlMillis jwt过期时间(毫秒)
   * @param claims    设置的信息
   * @return
   */
  public static String createJWT(String secretKey, long ttlMillis, Map<String, Object> claims) {
    // 指定签名的时候使用的签名算法，也就是header那部分
    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

    // 生成JWT的时间
    long expMillis = System.currentTimeMillis() + ttlMillis;
    Date exp = new Date(expMillis);

    // 设置jwt的body
    JwtBuilder builder = Jwts.builder()
        // 如果有私有声明，一定要先设置这个自己创建的私有的声明，这个是给builder的claim赋值，一旦写在标准的声明赋值之后，就是覆盖了那些标准的声明的
        .setClaims(claims)
        // 设置签名使用的签名算法和签名使用的秘钥
        .signWith(signatureAlgorithm, secretKey.getBytes(StandardCharsets.UTF_8))
        // 设置过期时间
        .setExpiration(exp);

    return builder.compact();
  }

  /**
   * Token解密
   *
   * @param secretKey jwt秘钥 此秘钥一定要保留好在服务端, 不能暴露出去, 否则sign就可以被伪造, 如果对接多个客户端建议改造成多个
   * @param token     加密后的token
   * @return
   */
  public static Claims parseJWT(String secretKey, String token) {
    // 得到DefaultJwtParser
    Claims claims = Jwts.parser()
        // 设置签名的秘钥
        .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
        // 设置需要解析的jwt
        .parseClaimsJws(token).getBody();
    return claims;
  }
}

```



#### 4.9.2 BCrypt工具类

常见的密码加密有MD5加盐加密的方法，但是这样需要单独存储一个盐的字段，并不友好，而且MD5的加密性也不是太好，因此我推荐使用BCrypt加密密码的方式。

BCrypt加密一段字符串，得到一段唯一的字符串，这个字符串只能用于验证密码是否正确而不能反推密码，并且每次经过BCrypt加密的字符串都不一样。

```java
public static void main(String[] args) {
  System.out.println(encryptPassword("R769UqF0M2"));
  System.out.println(matchesPassword("R769UqF0M2", "$2a$10$HI2nRLS.KC/A2AMHd/tPBufnVS2UOPRmkodfRyFH7v04UOjFfRNhG"));
}
```

```
$2a$10$vYbveH2a1tIVld0Fv8rNZ.SdrRnbdD8DGtOGES6uo91q9tqv1lFXi
true
```

可以看到，对一个字符串进行加密得到的是不同的字符串，而每一个经过加密的字符串都能通过matches方法与原字符串进行匹配，这就是BCrypt的加密方式。

**使用BCrypt的方法**

1. 引入依赖

```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-crypto</artifactId>
</dependency>
```

2. 编写工具类

```java
/**
 * BCrypt密码加密
 *
 * @Date 2023/9/15 10:24
 * @Author pepedd864
 */
public class BCryptUtil {
  /**
   * 生成BCryptPasswordEncoder密码
   *
   * @param rawPassword 真实密码
   * @return 加密字符串
   */
  public static String encryptPassword(String rawPassword) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.encode(rawPassword);
  }

  /**
   * 判断密码是否相同
   *
   * @param rawPassword     真实密码
   * @param encodedPassword 加密字符串
   * @return 结果
   */
  public static boolean matchesPassword(String rawPassword, String encodedPassword) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.matches(rawPassword, encodedPassword);
  }
}
```



### 4.10 字段自动填充

配置 `Mybatis Plus` 自动填充来实现对`create_time`、`update_time`的值自动插入和更新。可以减少Mapper层的代码量，使代码更加简洁

1. 新建`handler.mybatisplus.MyMetaObjectHandler`类
2. 该类实现`MetaObjectHandler`接口
3. 并重写`insertFille`和`updateFill`方法

**MyMetaObjectHandler**

```java
/**
 * 自动填充字段
 *
 * @author pepedd864
 * @since 2023/10/2 20:41
 */
@Component
@Slf4j
public class MyMetaObjectHandler implements MetaObjectHandler {
  @Override
  public void insertFill(MetaObject metaObject) {
    log.info("start insert fill ...");
    strictInsertFill(metaObject, "createTime", LocalDateTime.class, LocalDateTime.now());
    strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
  }

  @Override
  public void updateFill(MetaObject metaObject) {
    log.info("start update fill ...");
    strictInsertFill(metaObject, "updateTime", LocalDateTime.class, LocalDateTime.now());
  }
}
```

注意一定要配置Bean，处理器才会生效

同时在实体类中需要添加`@TableField`注解

```java
@TableField(fill = FieldFill.INSERT)
private LocalDateTime createTime;
```

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/b655b300bf99930493b972f3285d553a.png)

### 4.11 编写控制器类和服务

到这一步，后端的配置已经基本完毕了，就是配置增删改查的事情了



#### 4.11.1 校验控制器

因为我们之前定义了JWT的拦截器，所以我们先写登录接口，注意加上`@Validated`dto中的校验才会生效

```java
/**
 * 校验控制器
 *
 * @Date 2023/9/15 10:08
 * @Author pepedd864
 */
@RestController
@RequestMapping("/user")
public class AuthController {
  @Autowired
  private IUserService userService;


  @PostMapping("/login")
  public Result login(@RequestBody @Validated LoginBodyDto loginBodyDto) {
    return userService.login(loginBodyDto);
  }
}

```

在用户服务实现类中编写逻辑

```java
/**
 * 用户服务实现类
 *
 * @Date 2023/9/14 9:28
 * @Author pepedd864
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
  @Autowired
  private JwtProperties jwtProperties;

  /**
   * 登录
   *
   * @param loginBodyDto
   * @return
   */
  @Override
  public Result login(LoginBodyDto loginBodyDto) {
    // 1. 校验密码
    User user = getOne(Wrappers.<User>lambdaQuery().eq(User::getUserName, loginBodyDto.getUsername()));
    if (user == null) {
      throw new RuntimeException("用户不存在");
    }
    if (!BCryptUtil.matchesPassword(loginBodyDto.getPassword(), user.getPassword())) {
      throw new RuntimeException("密码错误");
    }
    // 2. 生成token
    Map map = new HashMap<>();
    map.put(JwtClaimsConstant.USER_ID, user.getUserId());
    map.put(JwtClaimsConstant.USERNAME, user.getUserName());
    map.put(JwtClaimsConstant.NICKNAME, user.getNickName());
    String token = JwtUtil.createJWT(jwtProperties.getUserSecretKey(), jwtProperties.getUserTtl(), map);
    // 3. 返回结果
    UserVO userVO = UserVO.builder()
        .userName(user.getUserName())
        .email(user.getEmail())
        .phone(user.getPhone())
        .nickName(user.getNickName())
        .createTime(user.getCreateTime())
        .build();
    LoginVO loginVO = LoginVO.builder()
        .token(token)
        .userVO(userVO)
        .build();
    return Result.success(loginVO);
  }
}
```

通过接口测试软件测试接口

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/ba5280d104e1e405cff685bb613f6add.png)



#### 4.11.2 分页查询接口

控制器

```java
@PostMapping("/list")
public Result list(@RequestBody PageDto dto) {
  return productInfoService.list(dto);
}
```

分页接口实现类

```java
/**
 * 分页查询
 *
 * @param dto
 * @return
 */
@Override
public PageVO list(PageDto dto) {
  // 1. 检查参数
  dto.checkParam();
  // 2. 分页查询
  Page<ProductInfo> page = Page.of(dto.getCurrent(), dto.getPageSize());
  LambdaQueryWrapper<ProductInfo> wrapper = new LambdaQueryWrapper<>();
  // 3. 查询条件 sortId sortOrder
  if (dto.getSortField() != null && dto.getSortOrder() != null && dto.getSortField().equals("id")) {
    wrapper.orderBy(true, dto.getSortOrder().equals("ascend"), ProductInfo::getId);
  }
  if (dto.getSortField() != null && dto.getSortOrder() != null && dto.getSortField().equals("createTime")) {
    wrapper.orderBy(true, dto.getSortOrder().equals("ascend"), ProductInfo::getCreateTime);
  }
  // 执行查询
  page = page(page, wrapper); // wrapper
  // 4. 组装返回值
  PageVO pageVO = PageVO.builder()
      .current(dto.getCurrent())
      .pageSize(dto.getPageSize())
      .total((int) page.getTotal())
      .build();
  pageVO.setData(page.getRecords());
  return pageVO;
}
```

测试接口

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/dc990a43c1ac66a7b3bfeb03be67c653.png)



#### 4.11.3 删除接口

控制器

```java
@PostMapping("/delete")
public Result delete(@NotNull(message = "删除数组不能为空") String ids) {
  return productInfoService.delete(ids);
}
```

实现类

```java
/**
 * 删除
 *
 * @param ids
 * @return
 */
@Override
@Transactional(rollbackFor = Exception.class)
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
```

测试

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/4960cca10e4ab848b9e48a8146814d71.png)



#### 4.11.4 新增修改接口

**新增接口**

控制器

```java
@PostMapping("/add")
public Result add(@RequestBody @Validated ProductInfoDto productInfoDto) {
  return productInfoService.add(productInfoDto);
}
```

服务实现类

```java
/**
 * 添加
 *
 * @param productInfoDto
 * @return
 */
@Override
public Result add(ProductInfoDto productInfoDto) {
  // 1. 将dto转换为pojo
  ProductInfo productInfo = new ProductInfo();
  BeanUtils.copyProperties(productInfoDto, productInfo);
  // 2. 执行添加
  save(productInfo);
  // 3. 返回结果
  return Result.success("添加成功");
}
```



**修改接口**

控制器

```java
@PostMapping("/update")
public Result update(@RequestBody @Validated ProductInfoDto productInfoDto) {
  return productInfoService.update(productInfoDto);
}
```

服务实现类

```java
/**
 * 修改
 *
 * @param productInfoDto
 * @return
 */
@Override
public Result update(ProductInfoDto productInfoDto) {
  // 1. 将dto转换为pojo
  ProductInfo productInfo = new ProductInfo();
  BeanUtils.copyProperties(productInfoDto, productInfo);
  // 2. 执行修改
  updateById(productInfo);
  // 3. 返回结果
  return Result.success("修改成功");
}
```



## 5. 前端

### 5.1 安装依赖

根据[前端架构](### 3.2 前端架构)中的图可以看出这是一个常见的后台管理系统的样子，因此，依赖也大差不差

```json
"dependencies": {
  "@ant-design/icons-vue": "^6.1.0",
  "ant-design-vue": "4.x",
  "axios": "^1.5.0",
  "lodash-es": "^4.17.21",
  "pinia": "^2.1.6",
  "pinia-plugin-persistedstate": "^3.2.0",
  "sass": "^1.66.1",
  "vue": "^3.3.4",
  "vue-request": "^2.0.3",
  "vue-router": "^4.2.4"
},
"devDependencies": {
  "@vitejs/plugin-vue": "^4.2.3",
  "prettier": "^3.0.3",
  "unplugin-vue-components": "^0.25.2",
  "vite": "^4.4.5"
}
```

**安装依赖**

- 将上述内容粘贴到package.json中

```bash
pnpm install
```

### 5.2 配置vite.config.js

```js
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          // 自动导入组件
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 为 @ 设置别名
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 后端服务实际地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```



### 5.3 导入一些基础的组件和工具

**style.scss**

- 这里可以写一些初始样式

```scss
* {
  padding: 0;
  margin: 0;
}
```

**components/Icon/Icon.vue**

- 这个可以让我们在使用UI库的Icon组件时更加灵活

```vue
<script setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
})
</script>
<template>
  <component
    v-if="icon"
    :is="icon"
    :style="{ 'font-size': `${size ? size : null}px` }"
  />
</template>
```

**layouts/BasicLayout.vue**

```vue
<script setup>
import layout from '@/components/layout/Layout.vue'
</script>
<template>
  <layout>
    <router-view />
  </layout>
</template>

<style lang="scss" scoped></style>
```

**layouts/UserLayout.vue**

```vue
<template>
  <div id="user-layout">
    <div class="container">
      <router-view class="user-form" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#user-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#user-layout .container {
  width: 350px;
  margin-left: auto;
  margin-right: auto;
}

#user-layout .container .user-form {
  padding: 20px;
  border-radius: 10px;
}
</style>
```

**App.vue**

```vue
<script setup></script>

<template>
  <router-view />
</template>

<style scoped></style>
```

**main.js**

```js
import './style.scss'
import { createApp } from 'vue'
// 引入andv icon
import * as Icons from '@ant-design/icons-vue'
import Icon from '@/components/Icon/Icon.vue'
import router from './router'
import App from './App.vue'
import pinia from '@/stores/index.js'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component(Icon)
// 注册全局图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key])
})

app.mount('#app')
```



### 5.4 创建页面并配置路由

**创建页面**

三个页面

![](https://picgo-img-repo.oss-cn-beijing.aliyuncs.com/img/71f84bccd4f5b600a256f399d53c5e3b.png)

创建对应的vue文件即可

**配置路由**

**config/router.config.js**

```js
import BasicLayout from '@/layouts/BasicLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'

export const constantRouterMap = [
  {
    name: 'basicLayout',
    path: '/',
    redirect: '/list',
    component: BasicLayout,
    children: [],
  },
  {
    name: 'userLayout',
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        name: 'login',
        path: '/user/login',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/user/login/index.vue'),
      },
    ],
  },
]

export function getAsyncRouterMap() { // 此处是作为动态路由向后端请求路由的异步方法，这里就写死路由了
  return [
    {
      name: '产品列表',
      path: '/list',
      meta: {
        icon: 'TaobaoCircleOutlined',
      },
      component: import('@/pages/list/index.vue'),
    },
    {
      name: '路由1',
      path: '/router1',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
      children: [
        {
          name: '路由1-1',
          path: '/router1-1',
          meta: {
            icon: 'EditOutlined',
          },
          component: import('@/pages/test/index.vue'),
        },
        {
          name: '路由1-2',
          path: '/router1-2',
          meta: {
            icon: 'EditOutlined',
          },
          component: import('@/pages/test/index.vue'),
        },
      ],
    },
    {
      name: '路由2',
      path: '/router2',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
    },
    {
      name: '路由3',
      path: '/router3',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
    },
    {
      name: '路由4',
      path: '/router4',
      meta: {
        icon: 'EditOutlined',
      },
      component: import('@/pages/test/index.vue'),
    },
  ]
}
```

**router/index.js**

```js
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import { constantRouterMap, getAsyncRouterMap } from '@/config/router.config.js'

export const asyncRouterMap = ref([])

// 将异步路由添加到路由表
function syncRouterMap() {
  asyncRouterMap.value = getAsyncRouterMap()
  constantRouterMap[0].children = asyncRouterMap.value
}

syncRouterMap()
export default createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: constantRouterMap,
})
```



### 5.5 配置store

这里使用的是pinia，个人认为比vuex不是好用了一星半点

**stores/index.js**

```js
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 创建 pinia 实例
const pinia = createPinia()
// 使用持久化存储插件
pinia.use(persist)

// 默认导出，给 main.ts 使用
export default pinia

export * from './modules/user'
```

**stores/modules/user.js**

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const token = ref('')
    const userInfo = ref({})
    const logout = () => {
      token.value = ''
      userInfo.value = {}
    }
    return {
      token,
      userInfo,
      logout
    }
  },
  {
    persist: true,
  },
)
```



### 5.6 网络请求工具的配置

首先定义错误代码，这个应该和后端对应，因为我的后端比较简单，所以错误代码也很简单

```js
const errCode = {
  401: '登录失效，请重新登录',
  403: '没有权限',
  404: '请求地址错误',
  500: '服务器错误',
}
```

创建request对象

```js
const request = axios.create({
  baseURL: '/api/', // 这里可以同环境变量中拿，
   //参考`.env` `.env.development`或者`.env.production`文件的使用
  timeout: 10 * 1000,
})
```

因为我们使用token进行登录校验，所以在请求时请求头需要加上token（这里埋个小坑：token过期如何自动续签，提示：使用双token），所以我们需要加上拦截器

```js
/**
 * 请求前拦截
 */
request.interceptors.request.use((config) => {
  const token = userStore.token
  if (token) {
    config.headers['authentication'] = `${token}`
  }
  return config
})
```

同时，我们也需要对响应结果进行处理，如果出错，需要显示错误信息，使用ant-design的message提示消息

```js
/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const response = error.response
    const status = response.status
    const msg = response.data.msg || errCode[status] || response.statusText

    // 判断错误类型
    if (status === 401) {
      userStore.logout()
      router.push('/user/login')
    }

    message.error(msg)
  },
)
```

最后导出request对象

```js
export default request
```



### 5.7 Layout组件的配置

这个组件基本就是固定的，可以参考我写的

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { asyncRouterMap } from '@/router'
import Icon from '@/components/Icon/Icon.vue'

const menuList = asyncRouterMap
const route = useRoute()
const router = useRouter()
const selectedKeys = ref(['1'])
const init = () => {
  const path = router.currentRoute.value.path
  const item = menuList.value.find((item) => item.path === path)
  if (item) {
    selectedKeys.value = [item.path]
  }
}
onMounted(() => {
  init()
})
</script>

<template>
  <div class="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider theme="light" :collapsible="true">
        <div class="logo">
          <span>Logo</span>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <template v-for="item in menuList" :key="item.path">
            <a-sub-menu v-if="'children' in item" :key="item.path">
              <template #title>
                <Icon :icon="item.meta.icon" />
                <span>{{ item.name }}</span>
              </template>
              <a-menu-item v-for="subItem in item.children" :key="subItem.path">
                <router-link :to="subItem.path">
                  <Icon :icon="item.meta.icon" />
                  <span>{{ subItem.name }}</span>
                </router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item :key="item.path" v-else>
              <router-link :to="item.path">
                <Icon :icon="item.meta.icon" />
                <span>{{ item.name }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <span>
            <Icon :icon="route.meta?.icon" />
            {{ route.name }}
          </span>
        </a-layout-header>
        <a-layout-content>
          <slot></slot>
        </a-layout-content>
        <a-layout-footer style=""> Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.basic-layout {
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    margin: 16px;
    background: rgba(205, 205, 205, 0.3);
    color: #000;
  }

  .ant-layout {
    --footer-padding: 10px;

    .ant-layout-header {
      background: #fff;
      color: #000;
    }

    .ant-layout-content {
      margin: 20px 16px;
      overflow: auto;
      max-height: calc(100vh - 70px - var(--footer-padding) * 2 - 20px - 40px);
    }

    .ant-layout-footer {
      text-align: center;
      padding: var(--footer-padding) 50px;
    }
  }
}
</style>

```



### 5.8 登录页

这里没有做验证码的功能，可以作为拓展功能添加，故表单项就两个

```js
const form = ref({
  username: 'zfa',
  password: 'R769UqF0M2',
  // uuid: '',
})
const rules = ref({
  username: [{ required: true, message: '请输入帐户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
```

主体和框架

```vue
<template>
  <div class="main-user">
    <div class="title">登录</div>
    <a-form id="login-form" ref="formRef" :model="form" :rules="rules">
      <a-form-item name="username">
        <a-input
          v-model:value="form.username"
          size="large"
          placeholder="账户: admin"
        >
          <template #prefix>
            <Icon icon="UserOutlined" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="form.password"
          size="large"
          placeholder="密码: admin123"
        >
          <template #prefix>
            <Icon icon="LockOutlined" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="rememberMe">
        <div class="user-login-other">
          <a-checkbox :checked="form.rememberMe" @change="rememberMe">
            记住密码
          </a-checkbox>
        </div>
      </a-form-item>
      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          html-type="submit"
          class="login-button"
          :loading="logining"
          :disabled="logining"
          @click="handleSubmit"
        >
          确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.main-user {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;

  .title {
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 24px;
  }
}

#login-form {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    line-height: 22px;

    .register {
      float: right;
    }
  }
}
</style>
```

提交表单

```js
const handleSubmit = () => {
  formRef.value.validate().then(async () => {
    logining.value = true
    const { data } = await request.post('/user/login', form.value)
    if (data.code === 0) {
      message.error(data.msg)
      logining.value = false
      return
    }
    userStore.token = data.data.token
    userStore.userInfo = data.data.userVO
    logining.value = false
    message.success('登录成功')
    router.push('/')
  })
}
```



### 5.9 列表页

这个页面主要是查询商品项，并附有新增修改删除功能

**分页逻辑**

- 分页使用了ant-design官方文档中推荐的`vue-request`进行分页

```vue
<script setup>
import { computed, reactive, ref } from 'vue'
import request from '@/utils/request.js'
import { usePagination } from 'vue-request'
import { message } from 'ant-design-vue'

const columns = ref(null)
// 获取数据
const getData = async (params) => {
  const { data } = await request.post('/list', {
    current: params?.current,
    pageSize: params?.pageSize,
    sortField: params?.sortField,
    sortOrder: params?.sortOrder,
  })
  if (data.code === 0) {
    return
  }
  dataSource.value = data.data
  // 从数据中获取表头
  columns.value = Object.keys(data.data[0]).map((item) => ({
    title: item,
    dataIndex: item,
    sorter: item === 'id' || item === 'createTime',
  }))
  //添加操作列
  columns.value.push({
    title: '操作',
    dataIndex: 'action',
  })
  return data
}

const { data, run, loading, current, pageSize, total } = usePagination(
  getData,
  {
    pagination: {
      currentKey: 'current',
      pageSizeKey: 'pageSize',
      totalKey: 'total',
      sortFieldKey: 'sortField',
      sortOrderKey: 'sortOrder',
    },
  },
)
const dataSource = ref(data.data)
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}))
const handleTableChange = (pag, filters, sorter) => {
  console.log(pag, filters, sorter)
  run({
    pageSize: pag.pageSize,
    current: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  })
}
</script>
<template>
<a-table
      :data-source="dataSource"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      bordered
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-button-group>
            <a-button type="link" @click="editData(record)"> 编辑</a-button>
            <a-popconfirm
              title="确定要删除么？"
              @confirm="confirmDelete(record)"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </a-button-group>
        </template>
      </template>
    </a-table>
</template>
```



**删除**

```js
// 删除
const confirmDelete = async (record) => {
  let formData = new FormData()
  formData.append('ids', [record.id])
  const {data} = await request.post('/delete', formData)
  if (data.code === 0) {
    message.error(data.msg)
    return
  }
  message.success('删除成功')
  // 重新获取数据
  await run()
}
```



**新增/修改**

- 这里需要使用模态框进行输入，可以自己封装一个模态框，我这里使用ant-design的模态框进行输入

```vue
<a-modal
  v-model:open="modalState.open"
  :title="modalState.title"
  @ok="modalState.handleOk"
  @cancel="modalState.handleCancel"
  destroy-on-close
>
  <a-form
    ref="formRef"
    :model="modalState.data"
    :rules="modalState.rules"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
  >
    <a-form-item label="companyName" name="companyName">
      <a-input v-model:value="modalState.data.companyName" />
    </a-form-item>
    <a-form-item label="productName" name="productName">
      <a-input v-model:value="modalState.data.productName" />
    </a-form-item>
    <a-form-item label="code" name="code">
      <a-input v-model:value="modalState.data.code" />
    </a-form-item>
    <a-form-item label="price" name="price">
      <a-input v-model:value="modalState.data.price" />
    </a-form-item>
    <a-form-item label="skuType" name="skuType">
      <a-input v-model:value="modalState.data.skuType" />
    </a-form-item>
    <a-form-item label="colorType" name="colorType">
      <a-input v-model:value="modalState.data.colorType" />
    </a-form-item>
    <a-form-item label="stock" name="stock">
      <a-input v-model:value="modalState.data.stock" />
    </a-form-item>
    <a-form-item label="status" name="status">
      <a-input v-model:value="modalState.data.status" />
    </a-form-item>
  </a-form>
</a-modal>
```

这里是表单ref和模态框的状态对象

```js
const formRef = ref()
const modalState = reactive({
  open: false,
  title: '',
  data: {},
  rules: {
    companyName: [{ required: true, message: '请输入公司名称' }],
    productName: [{ required: true, message: '请输入产品名称' }],
    code: [{ required: true, message: '请输入产品代码' }],
    price: [{ required: true, message: '请输入产品价格' }],
    skuType: [{ required: true, message: '请输入sku类型' }],
    colorType: [{ required: true, message: '请输入颜色类型' }],
    stock: [{ required: true, message: '请输入库存' }],
    status: [{ required: true, message: '请输入状态' }],
  },
  handleOk: () => {},
  handleCancel: () => {},
})
```

修改/新增逻辑

```js
// 修改
const editData = (record) => {
  modalState.title = '编辑'
  // 浅拷贝
  modalState.data = { ...record }
  modalState.open = true
  modalState.handleOk = async () => {
    formRef.value.validate().then(async () => {
      modalState.open = false
      const { data } = await request.post('/update', modalState.data)
      if (data.code === 0) {
        message.error(data.msg)
        return
      }
      message.success('编辑成功')
      run()
    })
  }
}
// 新增
const addData = () => {
  modalState.title = '新增'
  modalState.data = {}
  modalState.open = true
  modalState.handleOk = async () => {
    formRef.value.validate().then(async () => {
      modalState.open = false
      const { data } = await request.post('/add', modalState.data)
      if (data.code === 0) {
        message.error(data.msg)
        return
      }
      message.success('新增成功')
      run()
    })
  }
}
```



## 6. 拓展

在这个项目中还有许多可以拓展的部分，如

1. 登录的验证码功能
2. 记住我功能
3. 注册功能
4. 双Token，实现Token刷新功能
5. 实现RABC权限系统
6. 等等

欢迎根据自己进行项目的定制开发拓展