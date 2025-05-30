<template>
  <q-card class="results-card q-ma-md">
    <q-card-section>
      <div class="text-h5 text-center q-mb-lg">
        クイズ結果
      </div>
      
      <div class="text-center q-mb-lg">
        <q-circular-progress
          :value="scorePercentage"
          size="120px"
          :thickness="0.2"
          color="primary"
          center-color="grey-2"
          track-color="grey-3"
          class="q-ma-md"
        >
          <div class="text-h4 text-primary">{{ scorePercentage }}%</div>
        </q-circular-progress>
      </div>
      
      <div class="text-center q-mb-lg">
        <div class="text-h6">
          {{ correctAnswers }} / {{ totalQuestions }} 問正解
        </div>
        <div class="text-subtitle1 q-mt-sm" :class="getScoreColorClass()">
          {{ getScoreMessage() }}
        </div>
      </div>
      
      <q-separator class="q-my-lg" />
      
      <div class="text-h6 q-mb-md">詳細結果</div>
      
      <q-list separator>
        <q-item
          v-for="(result, index) in results"
          :key="result.questionId"
          class="q-py-md"
        >
          <q-item-section>
            <q-item-label class="text-weight-medium">
              問題 {{ index + 1 }}
            </q-item-label>
            <q-item-label caption lines="2">
              {{ getQuestionText(result.questionId) }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon
              :name="result.isCorrect ? 'check_circle' : 'cancel'"
              :color="result.isCorrect ? 'green' : 'red'"
              size="24px"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    
    <q-card-actions align="center">
      <q-btn
        color="primary"
        label="もう一度挑戦"
        @click="restart"
        class="q-ma-sm"
      />
      <q-btn
        color="secondary"
        label="ホームに戻る"
        @click="goHome"
        class="q-ma-sm"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { quizData } from '~/data/quizData'

interface QuizResult {
  questionId: number
  selectedAnswer: number
  isCorrect: boolean
}

interface Props {
  results: QuizResult[]
  totalQuestions: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  restart: []
  home: []
}>()

const correctAnswers = computed(() => 
  props.results.filter(result => result.isCorrect).length
)

const scorePercentage = computed(() => 
  Math.round((correctAnswers.value / props.totalQuestions) * 100)
)

const getScoreMessage = () => {
  const percentage = scorePercentage.value
  if (percentage >= 90) {
    return '素晴らしい！遺失物法の専門家レベルです！'
  } else if (percentage >= 70) {
    return 'よくできました！遺失物法の基本は理解されています。'
  } else if (percentage >= 50) {
    return 'もう少し！基本的な内容を復習してみましょう。'
  } else {
    return '頑張りましょう！遺失物法の学習を続けてください。'
  }
}

const getScoreColorClass = () => {
  const percentage = scorePercentage.value
  if (percentage >= 70) {
    return 'text-green'
  } else if (percentage >= 50) {
    return 'text-orange'
  } else {
    return 'text-red'
  }
}

const getQuestionText = (questionId: number) => {
  const question = quizData.find(q => q.id === questionId)
  return question?.question || ''
}

const restart = () => {
  emit('restart')
}

const goHome = () => {
  emit('home')
}
</script>

<style scoped>
.results-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>