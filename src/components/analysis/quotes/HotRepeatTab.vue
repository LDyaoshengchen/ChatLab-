<script setup lang="ts">
import { ref, watch } from 'vue'
import type { RepeatAnalysis } from '@/types/chat'
import { ListPro } from '@/components/charts'
import { LoadingState, EmptyState, SectionCard } from '@/components/UI'
import { formatDate, getRankBadgeClass } from '@/utils'

interface TimeFilter {
  startTs?: number
  endTs?: number
}

const props = defineProps<{
  sessionId: string
  timeFilter?: TimeFilter
}>()

// ==================== 最火复读内容 ====================
const repeatAnalysis = ref<RepeatAnalysis | null>(null)
const isLoading = ref(false)

async function loadRepeatAnalysis() {
  if (!props.sessionId) return
  isLoading.value = true
  try {
    repeatAnalysis.value = await window.chatApi.getRepeatAnalysis(props.sessionId, props.timeFilter)
  } catch (error) {
    console.error('加载复读分析失败:', error)
  } finally {
    isLoading.value = false
  }
}

function truncateContent(content: string, maxLength = 30): string {
  if (content.length <= maxLength) return content
  return content.slice(0, maxLength) + '...'
}

// 监听 sessionId 和 timeFilter 变化
watch(
  () => [props.sessionId, props.timeFilter],
  () => {
    loadRepeatAnalysis()
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="main-content mx-auto max-w-3xl p-6">
    <!-- 加载中 -->
    <LoadingState v-if="isLoading" text="正在加载复读数据..." />

    <!-- 最火复读内容列表 -->
    <ListPro
      v-else-if="repeatAnalysis && repeatAnalysis.hotContents.length > 0"
      :items="repeatAnalysis.hotContents"
      title="🔥 最火复读内容"
      description="单次复读参与人数最多的内容"
      :topN="10"
      countTemplate="共 {count} 条热门复读"
    >
      <template #item="{ item, index }">
        <div class="flex items-center gap-3">
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            :class="getRankBadgeClass(index)"
          >
            {{ index + 1 }}
          </span>
          <span class="shrink-0 text-lg font-bold text-pink-600">{{ item.maxChainLength }}人</span>
          <div class="flex flex-1 items-center gap-1 overflow-hidden text-sm">
            <span class="shrink-0 font-medium text-gray-900 dark:text-white">{{ item.originatorName }}：</span>
            <span class="truncate text-gray-600 dark:text-gray-400" :title="item.content">
              {{ truncateContent(item.content) }}
            </span>
          </div>
          <div class="flex shrink-0 items-center gap-2 text-xs text-gray-500">
            <span>{{ item.count }} 次</span>
            <span class="text-gray-300 dark:text-gray-600">|</span>
            <span>{{ formatDate(item.lastTs) }}</span>
          </div>
        </div>
      </template>
    </ListPro>

    <!-- 空状态 -->
    <SectionCard v-else title="🔥 最火复读内容">
      <EmptyState text="暂无复读数据" />
    </SectionCard>
  </div>
</template>
