<script setup lang="ts">
import { ref } from 'vue'
import { SubTabs } from '@/components/UI'
import { CatchphraseTab, HotRepeatTab, KeywordAnalysis } from '@/components/analysis/quotes'

interface TimeFilter {
  startTs?: number
  endTs?: number
}

const props = defineProps<{
  sessionId: string
  timeFilter?: TimeFilter
}>()

// 子 Tab 配置
const subTabs = [
  { id: 'catchphrase', label: '口头禅', icon: 'i-heroicons-chat-bubble-bottom-center-text' },
  { id: 'hot-repeat', label: '最火复读', icon: 'i-heroicons-fire' },
  { id: 'keyword', label: '关键词分析', icon: 'i-heroicons-magnifying-glass' },
]

const activeSubTab = ref('catchphrase')
</script>

<template>
  <div class="flex h-full flex-col">
    <!-- 子 Tab 导航 -->
    <SubTabs v-model="activeSubTab" :items="subTabs" />

    <!-- 子 Tab 内容 -->
    <div class="flex-1 min-h-0 overflow-auto">
      <Transition name="fade" mode="out-in">
        <!-- 口头禅分析 -->
        <CatchphraseTab
          v-if="activeSubTab === 'catchphrase'"
          :session-id="props.sessionId"
          :time-filter="props.timeFilter"
        />

        <!-- 最火复读内容 -->
        <HotRepeatTab
          v-else-if="activeSubTab === 'hot-repeat'"
          :session-id="props.sessionId"
          :time-filter="props.timeFilter"
        />

        <!-- 关键词分析 -->
        <div v-else-if="activeSubTab === 'keyword'" class="main-content mx-auto max-w-3xl p-6">
          <KeywordAnalysis :session-id="props.sessionId" :time-filter="props.timeFilter" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

