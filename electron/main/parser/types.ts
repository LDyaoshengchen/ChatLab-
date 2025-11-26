/**
 * Parser 接口定义
 */

import type { ParseResult } from '../../../src/types/chat'

/**
 * 聊天记录解析器接口
 */
export interface ChatParser {
  /** 解析器名称 */
  name: string

  /** 支持的平台 */
  platform: string

  /**
   * 检测文件内容是否匹配该解析器
   * @param content 文件内容
   * @param filename 文件名
   */
  detect(content: string, filename: string): boolean

  /**
   * 解析文件内容
   * @param content 文件内容
   * @param filename 文件名
   */
  parse(content: string, filename: string): ParseResult
}

/**
 * 解析错误
 */
export class ParseError extends Error {
  constructor(
    message: string,
    public readonly parserName: string
  ) {
    super(message)
    this.name = 'ParseError'
  }
}

