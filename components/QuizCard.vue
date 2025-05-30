<template>
  <q-card class="quiz-card q-ma-md">
    <q-card-section>
      <div class="text-h6 q-mb-md">
        問題 {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}
      </div>
      <div class="text-body1 q-mb-lg">
        {{ currentQuestion.question }}
      </div>
      
      <q-list>
        <q-item
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          tag="label"
          clickable
          v-ripple
          @click="selectAnswer(index)"
          :class="getOptionClass(index)"
        >
          <q-item-section avatar>
            <q-radio
              v-model="selectedAnswer"
              :val="index"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ option }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      
      <div v-if="showExplanation" class="q-mt-lg q-pa-md bg-blue-1 rounded-borders">
        <div class="text-subtitle2 text-primary q-mb-sm">解説</div>
        <div class="text-body2">{{ currentQuestion.explanation }}</div>
      </div>
    </q-card-section>
    
    <q-card-actions align="right">
      <q-btn
        v-if="!answered"
        :disable="selectedAnswer === null"
        color="primary"
        label="回答"
        @click="submitAnswer"
      />
      <q-btn
        v-if="answered && !isLastQuestion"
        color="primary"
        label="次の問題"
        @click="nextQuestion"
      />
      <q-btn
        v-if="answered && isLastQuestion"
        color="secondary"
        label="結果を見る"
        @click="showResults"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/data/quizData'

interface Props {
  question: QuizQuestion
  currentQuestionIndex: number
  totalQuestions: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  answer: [questionId: number, selectedAnswer: number, isCorrect: boolean]
  next: []
  finish: []
}>()

const selectedAnswer = ref<number | null>(null)
const answered = ref(false)
const showExplanation = ref(false)

const currentQuestion = computed(() => props.question)
const isLastQuestion = computed(() => props.currentQuestionIndex === props.totalQuestions - 1)

const selectAnswer = (index: number) => {
  if (!answered.value) {
    selectedAnswer.value = index
  }
}

const submitAnswer = () => {
  if (selectedAnswer.value !== null) {
    answered.value = true
    showExplanation.value = true
    const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
    emit('answer', currentQuestion.value.id, selectedAnswer.value, isCorrect)
  }
}

const nextQuestion = () => {
  resetQuestion()
  emit('next')
}

const showResults = () => {
  emit('finish')
}

const resetQuestion = () => {
  selectedAnswer.value = null
  answered.value = false
  showExplanation.value = false
}

const getOptionClass = (index: number) => {
  if (!answered.value) return ''
  
  if (index === currentQuestion.value.correctAnswer) {
    return 'bg-green-1 text-green-8'
  } else if (index === selectedAnswer.value && index !== currentQuestion.value.correctAnswer) {
    return 'bg-red-1 text-red-8'
  }
  return ''
}

// Reset when question changes
watch(() => props.question.id, () => {
  resetQuestion()
})
</script>

<style scoped>
.quiz-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>