<template>
  <div>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            遺失物法クイズ
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <!-- Welcome Screen -->
          <div v-if="!quizStarted && !showResults" class="text-center q-pa-lg">
            <q-card class="welcome-card q-ma-md">
              <q-card-section>
                <div class="text-h4 q-mb-lg">遺失物法クイズ</div>
                <div class="text-h6 q-mb-md">日本の遺失物法について学ぼう！</div>
                <div class="text-body1 q-mb-lg">
                  このクイズでは、遺失物法に関する基本的な知識を確認できます。<br>
                  全{{ totalQuestions }}問の選択式問題です。
                </div>
                <q-btn
                  color="primary"
                  size="lg"
                  label="クイズを始める"
                  @click="startQuiz"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Quiz Screen -->
          <div v-if="quizStarted && !showResults">
            <QuizCard
              :question="currentQuestion"
              :current-question-index="currentQuestionIndex"
              :total-questions="totalQuestions"
              @answer="handleAnswer"
              @next="nextQuestion"
              @finish="finishQuiz"
            />
          </div>

          <!-- Results Screen -->
          <div v-if="showResults">
            <QuizResults
              :results="quizResults"
              :total-questions="totalQuestions"
              @restart="restartQuiz"
              @home="goHome"
            />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { quizData } from '~/data/quizData'

const quizStarted = ref(false)
const showResults = ref(false)
const currentQuestionIndex = ref(0)
const quizResults = ref([])

const totalQuestions = computed(() => quizData.length)
const currentQuestion = computed(() => quizData[currentQuestionIndex.value])

const startQuiz = () => {
  quizStarted.value = true
  currentQuestionIndex.value = 0
  quizResults.value = []
}

const handleAnswer = (questionId, selectedAnswer, isCorrect) => {
  quizResults.value.push({
    questionId,
    selectedAnswer,
    isCorrect
  })
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
  }
}

const finishQuiz = () => {
  showResults.value = true
  quizStarted.value = false
}

const restartQuiz = () => {
  showResults.value = false
  startQuiz()
}

const goHome = () => {
  showResults.value = false
  quizStarted.value = false
  currentQuestionIndex.value = 0
  quizResults.value = []
}
</script>

<style scoped>
.welcome-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
