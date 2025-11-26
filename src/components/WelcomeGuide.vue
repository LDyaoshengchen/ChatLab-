<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const chatStore = useChatStore()
const { isImporting, importProgress } = storeToRefs(chatStore)

const importError = ref<string | null>(null)

const features = [
  {
    icon: '🏆',
    title: '活跃度分析',
    desc: '谁是群里的潜水王？',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    delay: '0ms',
  },
  {
    icon: '☁️',
    title: '词云生成',
    desc: '大家最爱说什么？',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    delay: '100ms',
  },
  {
    icon: '❤️',
    title: '情感分析',
    desc: '群聊氛围怎么样？',
    color: 'text-pink-500',
    bg: 'bg-pink-50',
    delay: '200ms',
  },
]

async function handleImport() {
  importError.value = null
  const result = await chatStore.importFile()
  if (!result.success && result.error && result.error !== '未选择文件') {
    importError.value = result.error
  }
}

function openTutorial(type: 'wechat' | 'qq') {
  // TODO: 打开教程页面
  console.log('Tutorial:', type)
}

function getProgressText(): string {
  if (!importProgress.value) return ''
  switch (importProgress.value.stage) {
    case 'reading':
      return '读取文件中...'
    case 'parsing':
      return '解析聊天记录...'
    case 'saving':
      return '保存数据...'
    case 'done':
      return '导入完成！'
    case 'error':
      return '导入失败'
    default:
      return ''
  }
}
</script>

<template>
  <div class="relative flex h-full w-full overflow-hidden bg-white dark:bg-gray-950">
    <!-- Content Container -->
    <div class="relative z-10 flex h-full w-full flex-col items-center justify-center px-4">
      <!-- Hero Section -->
      <div class="mb-12 text-center">
        <div
          class="mb-6 inline-flex items-center justify-center rounded-3xl bg-white p-4 shadow-lg shadow-purple-100 ring-1 ring-gray-100 dark:bg-gray-900 dark:shadow-purple-900/20 dark:ring-gray-800"
          :class="[isImporting ? '' : 'animate-bounce']"
        >
          <UIcon v-if="!isImporting" name="i-heroicons-sparkles" class="h-8 w-8 text-purple-500" />
          <UIcon v-else name="i-heroicons-arrow-path" class="h-8 w-8 animate-spin text-purple-500" />
        </div>
        <h1
          class="mb-4 bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl"
        >
          ChatLens
        </h1>
        <p class="text-lg font-medium text-gray-500 dark:text-gray-400">ChatLens 帮你发现那些被遗忘的有趣瞬间</p>
      </div>

      <!-- Feature Cards -->
      <div class="mb-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="group relative transform cursor-default rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 dark:border-gray-800 dark:bg-gray-900"
          :style="{ animationDelay: feature.delay }"
        >
          <div class="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
            {{ feature.icon }}
          </div>
          <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">{{ feature.title }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ feature.desc }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col items-center space-y-6">
        <!-- Import Button -->
        <button
          class="group relative inline-flex items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 disabled:cursor-not-allowed disabled:opacity-70"
          :class="[isImporting ? '' : 'hover:scale-105 hover:shadow-purple-500/50']"
          :disabled="isImporting"
          @click="handleImport"
        >
          <template v-if="isImporting">
            <UIcon name="i-heroicons-arrow-path" class="mr-2 h-5 w-5 animate-spin" />
            {{ getProgressText() }}
          </template>
          <template v-else>
            <UIcon
              name="i-heroicons-arrow-up-tray"
              class="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1"
            />
            立即导入聊天记录
          </template>
        </button>

        <!-- Progress Bar -->
        <div v-if="isImporting && importProgress" class="w-64">
          <UProgress :value="importProgress.progress" size="sm" color="purple" />
          <p class="mt-2 text-center text-xs text-gray-500">
            {{ importProgress.message }}
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="importError" class="flex items-center text-sm text-red-500">
          <UIcon name="i-heroicons-exclamation-circle" class="mr-1.5 h-4 w-4" />
          {{ importError }}
        </div>

        <!-- Tutorial Links -->
        <div class="flex items-center space-x-6 text-sm font-medium text-gray-400">
          <button
            class="flex items-center transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            @click="openTutorial('wechat')"
          >
            <UIcon name="i-simple-icons-wechat" class="mr-1.5 h-4 w-4" />
            微信导入教程
          </button>
          <span class="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          <button
            class="flex items-center transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            @click="openTutorial('qq')"
          >
            <UIcon name="i-simple-icons-tencentqq" class="mr-1.5 h-4 w-4" />
            QQ导入教程
          </button>
        </div>

        <!-- Supported Formats -->
        <p class="text-xs text-gray-400 dark:text-gray-500">支持 QQ、微信聊天记录（JSON/TXT 格式）</p>
      </div>
    </div>
  </div>
</template>
