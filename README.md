## 此仓库为我个人的代码仓库，记录学习的代码

1. 如何下载这里的代码

> 你可以选择克隆整个仓库，但随着视频的更新，仓库大小肯定会越来越大

```bash
# 克隆整个仓库
git clone https://github.com/pepedd864/code-repo.git
```

2. 下载单独的一个文件或者文件夹

> 首先是使用sparse clone 命令下载仓库的元数据，然后可以根据需要下载文件或文件夹

```bash
# 下载元数据
git clone --filter=blob:none --sparse https://github.com/pepedd864/code-repo.git
```

> 然后使用sparse checkout命令，下载特定的文件或文件夹

```bash
# 下载文件夹
git sparse-checkout add login-crud
```

> 如果你不需要这个文件夹了，还可以使用set命令切换到另一个文件夹

```bash
git sparse-checkout set antdv-theme-mgr
```

