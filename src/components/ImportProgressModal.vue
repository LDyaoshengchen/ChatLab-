<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const chatStore = useChatStore()
const { isImporting, importProgress } = storeToRefs(chatStore)

const isOpen = computed(() => isImporting.value)

const statusIcon = computed(() => {
  if (!importProgress.value) return 'i-heroicons-arrow-path'
  switch (importProgress.value.stage) {
    case 'done':
      return 'i-heroicons-check-circle'
    case 'error':
      return 'i-heroicons-exclamation-circle'
    default:
      return 'i-heroicons-arrow-path'
  }
})

const statusColor = computed(() => {
  if (!importProgress.value) return 'text-purple-500'
  switch (importProgress.value.stage) {
    case 'done':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    default:
      return 'text-purple-500'
  }
})

const isSpinning = computed(() => {
  if (!importProgress.value) return true
  return !['done', 'error'].includes(importProgress.value.stage)
})

function getStageText(): string {
  if (!importProgress.value) return '准备中...'
  switch (importProgress.value.stage) {
    case 'reading':
      return '读取文件'
    case 'parsing':
      return '解析数据'
    case 'saving':
      return '保存数据'
    case 'done':
      return '导入完成'
    case 'error':
      return '导入失败'
    default:
      return '处理中'
  }
}
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ width: 'sm:max-w-md' }">
    <template #content>
      <div class="p-6 text-center">
        <!-- Icon -->
        <div class="mb-4 flex justify-center">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
          >
            <UIcon
              :name="statusIcon"
              class="h-8 w-8"
              :class="[statusColor, isSpinning ? 'animate-spin' : '']"
            />
          </div>
        </div>

        <!-- Title -->
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {{ getStageText() }}
        </h3>

        <!-- Progress -->
        <div v-if="importProgress" class="mb-4">
          <UProgress
            :value="importProgress.progress"
            size="sm"
            :color="importProgress.stage === 'error' ? 'red' : 'purple'"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {{ importProgress.message }}
          </p>
        </div>

        <!-- Hint -->
        <p v-if="isSpinning" class="text-xs text-gray-400">
          请稍候，正在处理您的聊天记录...
        </p>
      </div>
    </template>
  </UModal>
</template>

