/**
 * 对文件进行分片操作
 * @param file
 * @returns {Promise<{
 *     fileId: string,
 *     ext: string,
 *     chunks:Blob[],
 *     time:number
 * }>}
 */
async function spiltFile(file) {
  return new Promise((resolve) => {
    /**
     * 读取下一个分片
     */
    function loadNext() {
      const start = chunkIndex * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(file.slice(start, end));
    }

    /**
     * 获取文件的后缀名
     * @param filename
     */
    function extName(filename) {
      const i = filename.lastIndexOf('.');
      if (i < 0) {
        return '';
      }
      return filename.substr(i);
    }

    const currentTime = new Date().getTime();
    // 分片尺寸（5M）
    const chunkSize = 1024 * 1024 * 5;
    // 分片数量
    const chunkCount = Math.ceil(file.size / chunkSize);
    // 当前chunk的下标
    let chunkIndex = 0;
    // 使用ArrayBuffer完成文件MD5编码
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader(); // 文件读取器
    const chunks = []; // 分片信息数组
    // 读取第一个分片
    loadNext()
    // 读取一个分片后的回调
    fileReader.onload = function (e) {
      spark.append(e.target.result) // 分片数据追加到MD5编码器中
      // 当前分片单独的MD5
      const chunkMD5 = SparkMD5.ArrayBuffer.hash(e.target.result) + chunkIndex;
      chunkIndex++;
      chunks.push({
        id: chunkMD5,
        content: new Blob([e.target.result])
      });
      if (chunkIndex < chunkCount) {
        loadNext(); // 继续读取下一个分片
      } else {
        // 读取完成
        const fileId = spark.end();
        const endTime = new Date().getTime();
        resolve({
          fileId,
          ext: extName(file.name),
          chunks,
          time: endTime - currentTime
        })
      }
    }
  })
}

/**
 * 上传文件
 * @param fileInfo {{
 *    fileId: string,
 *    ext: string,
 *    chunks:Blob[],
 *    time: number,
 *    }}
 * @param needs
 * @param paused
 * @param updateFn
 * @param callback
 * @returns {Promise<void>}
 */
async function uploadPiece(
  fileInfo,
  needs,
  paused,
  updateFn = () => null,
  callback = () => null) {
  // 如果没有传入 needs 或者 paused 直接停止
  if (!needs || paused) {
    return;
  }
  // 如果 needs长度为0 说明已经把所有分片都上传了，调用回调
  if (needs.length === 0) {
    callback();
    return;
  }
  // 下一个要上传的 块
  const nextChunkId = needs[0];
  // 从chunks中找到这个块
  const file = fileInfo.chunks.find(it => it.id === nextChunkId);
  const formData = new FormData();
  formData.append('chunkId', nextChunkId);
  formData.append('fileId', fileInfo.fileId);
  formData.append('file', file.content);
  const resp = await fetch('http://localhost:8000/api/upload', {
    method: 'POST',
    body: formData
  }).then(resp => resp.json());
  // 更新 needs
  needs = resp.data;
  // await 可以将异步的代码当作同步代码来执行, 所以这里实现了sleep的效果
  await new Promise(resolve => setTimeout(resolve, 200))
  // 更新进度
  const progress = (1 - needs.length / fileInfo.chunks.length) * 100
  updateFn(progress);
  await uploadPiece(fileInfo, needs, paused, updateFn, callback);
}

export default class BreakpointUpload {
  constructor(file) {
    this.file = file
    this.paused = false;
    this.needs = [];
    this.fileInfo = null;

  }

  pause() {

  }

}

class PieceUpload{
  constructor() {

  }

}
