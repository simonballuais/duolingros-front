import { learningSessionService, questionCorrector, translationCorrector } from '../service'

const state = {
    currentLearningSession: null,
    startLearningSessionError: false,
    currentExercise: null,
    exercisesToDo: [],
    exercisesDone: 0,
    currentCorrection: null,
    validatedAnswers: [],
    targetCount: 0,
    progress: 0,
    submittingSession: false,
}

const actions = {
    startLearningSession({commit}, {lessonId, difficulty}) {
        learningSessionService.start(lessonId, difficulty)
            .then((learningSession) => {
                commit('startedNewLearningLesson', learningSession)
                commit('nextExerciseStarted')
            })
            .catch(() => commit('startLearningSessionError'))
    },
    submitAnswer({commit, state}, {answer}) {
        let corrector

        if (state.currentExercise.question) {
            corrector = questionCorrector
        }

        if (state.currentExercise.translation) {
            corrector = translationCorrector
        }

        const correction = corrector.correct(
            state.currentExercise,
            answer
        )

        commit('currentExerciseCorrected', correction)
    },
    endCorrection({commit, dispatch}) {
        commit('correctionEnded')

        if (!state.exercisesToDo?.length) {
            return dispatch('submitSession')
        }

        commit('nextExerciseStarted')
    },
    submitSession({commit, state}) {
        commit('submittingSession')

        learningSessionService.submit(state.currentLearningSession.id, state.validatedAnswers)
            .then(() => {
                commit('sessionSubmitted')
            })
            .catch(() => commit('sessionSubmitted'))
    },
}

const mutations = {
    startedNewLearningLesson(state, learningSession) {
        state.currentLearningSession = learningSession
        learningSession.questions.forEach((q) => q.question = true)
        learningSession.translations.forEach((t) => t.translation = true)
        state.exercisesToDo = learningSession.questions.concat(learningSession.translations)
        state.exercisesToDo = learningSession.questions
        state.targetCount = state.exercisesToDo.length
        state.progress = 15 + 85 * (state.exercisesDone / state.targetCount)
        state.validatedAnswers = []
    },
    startLearningSessionError(state) {
        state.startLearningSessionError = true
    },
    nextExerciseStarted(state) {
        state.currentExercise = state.exercisesToDo.shift()
    },
    currentExerciseCorrected(state, correction) {
        state.currentCorrection = correction

        if (correction.isCorrect) {
            state.validatedAnswers.push({
                type: correction.type,
                id: correction.id,
                proposedAnswer: correction.proposedAnswer
            })
        } else {
            state.exercisesToDo.push(state.currentExercise)
        }

        state.exercisesDone = state.validatedAnswers.length
        state.progress = 15 + 85 * (state.exercisesDone / state.targetCount)
    },
    correctionEnded(state) {
        state.currentCorrection = null
    },
    submittingSession(state) {
        state.submittingSession = true
    },
    sessionSubmitted(state) {
        state.submittingSession = true
    },
}
export const learningSession = {
    namespaced: true,
    state,
    actions,
    mutations,
}

