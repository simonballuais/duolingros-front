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
    showingDailyProgress: false,
    showingSerieProgress: false,
    lastSevenDaysGraph: null,
}

const actions = {
    startLearningSession({commit}, {lessonId, difficulty}) {
        commit('startingNewLearningLesson')

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
    showDailyProgress({commit}) {
        commit('dailyProgressShowed')
    },
    endDailyProgress({commit, dispatch, rootState}) {
        commit('dailyProgressEnded')

        if (rootState.security.user.learningSessionCountThatDay <= 1) {
            dispatch('showSerieProgress')
        } else {
            commit('sessionEnded')
        }
    },
    showSerieProgress({commit}) {
        commit('serieProgressShowed')
    },
    endSerieProgress({commit}) {
        commit('sessionEnded')
    },
    submitSession({commit, state, dispatch}) {
        commit('submittingSession')

        learningSessionService.submit(state.currentLearningSession.id, state.validatedAnswers)
            .then(() => {
                commit('sessionSubmitted')
                dispatch('showDailyProgress')
                dispatch('security/reloadUserData', null, {root: true})
            })
            .catch(() => commit('sessionSubmitted'))
    },
    loadLastSevenDaysGraph({commit}) {
        learningSessionService.getLastSevenDaysGraph()
            .then((lastSevenDaysGraph) => {
                commit('lastSevenDaysGraphUpdated', lastSevenDaysGraph)
            })
            .catch(() => commit('lastSevenDaysGraphFailed'))
    },
}

const mutations = {
    startingNewLearningLesson(state) {
        state.currentLearningSession = null
        state.currentExercise = null
        state.exercisesToDo = []
        state.exercisesDone = 0
        state.currentCorrection = null
        state.validatedAnswers = []
        state.targetCount = 0
        state.progress = 0
        state.submittingSession = false
    },
    startedNewLearningLesson(state, learningSession) {
        state.currentLearningSession = learningSession
        learningSession.questions.forEach((q) => {
            q.question = true
            q.type = 'question'
        })
        learningSession.translations.forEach((t) => {
            t.translation = true
            t.type = 'translation'
        })
        state.exercisesToDo = learningSession.questions.concat(learningSession.translations)
        state.targetCount = state.exercisesToDo.length
        state.progress = 15 + 85 * (state.exercisesDone / state.targetCount)
        state.validatedAnswers = []
    },
    startLearningSessionError(state) {
        state.startLearningSessionError = true
    },
    nextExerciseStarted(state) {
        state.currentExercise = state.exercisesToDo[0]
    },
    currentExerciseCorrected(state, correction) {
        state.currentCorrection = correction

        if (correction.isCorrect) {
            state.validatedAnswers.push({
                type: correction.type,
                id: correction.id,
                proposedAnswer: correction.proposedAnswer
            })
        }

        state.exercisesDone = state.validatedAnswers.length
        state.progress = 15 + 85 * (state.exercisesDone / state.targetCount)
    },
    correctionEnded(state) {
        state.exercisesToDo.shift()

        if (!state.currentCorrection.isCorrect) {
            state.exercisesToDo.push(state.currentExercise)
        }

        state.currentCorrection = null
    },
    submittingSession(state) {
        state.submittingSession = true
    },
    sessionSubmitted(state) {
        state.submittingSession = false
    },
    dailyProgressShowed(state) {
        state.showingDailyProgress = true
    },
    dailyProgressEnded(state) {
        state.showingDailyProgress = false
    },
    serieProgressShowed(state) {
        state.showingSerieProgress = true
    },
    serieProgressEnded(state) {
        state.showingSerieProgress = false
    },
    sessionEnded(state) {
        state.showingDailyProgress = false
        state.showingSerieProgress = false
    },
    lastSevenDaysGraphUpdated(state, lastSevenDaysGraph) {
        state.lastSevenDaysGraph = lastSevenDaysGraph
    },
    lastSevenDaysGraphFailed(state) {
        state.lastSevenDaysGraph = null
    },
}
export const learningSession = {
    namespaced: true,
    state,
    actions,
    mutations,
}

