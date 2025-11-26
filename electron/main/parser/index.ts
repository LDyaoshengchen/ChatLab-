/**
 * Parser 模块入口
 * 自动检测文件格式并使用对应的解析器
 */

import * as fs from 'fs'
import type { ChatParser } from './types'
import { qqJsonParser } from './qqJsonParser'
import { qqTxtParser } from './qqTxtParser'
import type { ParseResult } from '../../../src/types/chat'

// 注册所有解析器（按优先级排序）
const parsers: ChatParser[] = [
  qqJsonParser, // JSON 格式优先
  qqTxtParser // TXT 格式兜底
]

/**
 * 自动检测文件格式并解析
 * @param filePath 文件路径
 * @returns 解析结果
 */
export function parseFile(filePath: string): ParseResult {
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf-8')
  const filename = filePath.split(/[/\\]/).pop() || ''

  // 尝试每个解析器
  for (const parser of parsers) {
    if (parser.detect(content, filename)) {
      console.log(`使用解析器: ${parser.name}`)
      return parser.parse(content, filename)
    }
  }

  throw new Error(`无法识别文件格式: ${filename}`)
}

/**
 * 检测文件格式
 * @param filePath 文件路径
 * @returns 解析器名称，如果无法识别则返回 null
 */
export function detectFormat(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const filename = filePath.split(/[/\\]/).pop() || ''

    for (const parser of parsers) {
      if (parser.detect(content, filename)) {
        return parser.name
      }
    }
  } catch {
    // 文件读取失败
  }

  return null
}

/**
 * 获取支持的格式列表
 */
export function getSupportedFormats(): Array<{ name: string; platform: string }> {
  return parsers.map((p) => ({
    name: p.name,
    platform: p.platform
  }))
}

// 导出类型
export type { ChatParser, ParseError } from './types'

