<script setup lang="ts">
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import ImportProgressModal from '@/components/ImportProgressModal.vue'

const chatStore = useChatStore()

// 应用启动时从数据库加载会话列表
onMounted(async () => {
  await chatStore.loadSessions()
})
</script>

<template>
  <UApp>
    <router-view />
    <!-- 全局导入进度弹窗 -->
    <ImportProgressModal />
  </UApp>
</template>
