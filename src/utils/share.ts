
/** 获取窗口高度动态设置表格高度 */
export function getHeight (height: number): number {
  if (window.innerHeight) {
    return window.innerHeight - height;
  } else if ((document.body) && (document.body.clientHeight)) {
    return document.body.clientHeight - height;
  }
  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight - height;
  }
  return height
}