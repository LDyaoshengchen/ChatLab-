<script setup lang="ts">
import { computed, ref } from 'vue'
import type { MemberActivity } from '@/types/chat'
import { MemberRankList } from '@/components/charts'
import type { MemberRankItem } from '@/components/charts'

const props = defineProps<{
  memberActivity: MemberActivity[]
}>()

// Top 10 排行榜数据
const top10RankData = computed<MemberRankItem[]>(() => {
  return props.memberActivity.slice(0, 10).map((m) => ({
    id: m.memberId.toString(),
    name: m.name,
    value: m.messageCount,
    percentage: m.percentage,
  }))
})

// 完整排行榜数据
const fullRankData = computed<MemberRankItem[]>(() => {
  return props.memberActivity.map((m) => ({
    id: m.memberId.toString(),
    name: m.name,
    value: m.messageCount,
    percentage: m.percentage,
  }))
})

const isOpen = ref(false)
</script>

<template>
  <div class="space-y-6">
    <!-- 标题 -->
    <div class="flex items-center justify-between">
      <div>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">共 {{ memberActivity.length }} 位成员参与聊天</p>
      </div>
    </div>

    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
        <h3 class="font-semibold text-gray-900 dark:text-white">成员活跃度排行</h3>
        <!-- 完整排行榜 Dialog -->
        <UModal v-model:open="isOpen" :ui="{ width: 'max-w-3xl' }">
          <UButton v-if="memberActivity.length > 10" icon="i-heroicons-list-bullet" color="gray" variant="ghost">
            查看完整排行
          </UButton>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">完整成员排行榜</h3>
              <span>（共 {{ memberActivity.length }} 位成员）</span>
            </div>
          </template>
          <template #body>
            <div class="max-h-[60vh] overflow-y-auto">
              <MemberRankList :members="fullRankData" />
            </div>
          </template>
        </UModal>
      </div>

      <MemberRankList :members="top10RankData" />
    </div>
  </div>
</template>
