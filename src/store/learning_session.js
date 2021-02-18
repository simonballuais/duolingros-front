import {
    learningSessionService,
    questionCorrector,
    translationCorrector,
} from '../service'

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
    showingEndOfDifficulty: false,
    lastSevenDaysGraph: null,
}

const actions = {
    startLearningSession({commit, rootState, dispatch}, {lessonId, difficulty}) {
        commit('startingNewLearningLesson')

        if (rootState.isLoggedIn) {
            dispatch('startRegularLesson', {lessonId, difficulty})
        } else {
            dispatch('startAnonymousLesson', {lessonId, difficulty})
        }
    },
    startRegularLesson({commit}, {lessonId, difficulty}) {
        learningSessionService.start(lessonId, difficulty)
            .then((learningSession) => {
                commit('startedNewLearningLesson', learningSession)
                commit('nextExerciseStarted')
            })
            .catch(() => commit('startLearningSessionError'))
    },
    startAnonymousLesson({commit, dispatch}, {lessonId, difficulty}) {
        dispatch('bookLesson/loadAllBookLessons', null, {root: true})

        learningSessionService.startAnonymous(lessonId, difficulty)
            .then((learningSession) => {
                commit('startedNewLearningLesson', learningSession)
                commit('nextExerciseStarted')
            })
            .catch(() => commit('startLearningSessionError'))
    },
    submitAnswer({commit}, {answer}) {
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
        const user = rootState.security.user

        if (!rootState.security.isLoggedIn) {
            dispatch(
                'security/anonymousDailyCountIncremented',
                null,
                {root: true}
            )
        }

        if (state.currentLearningSession.lastLesson) {
            dispatch('showEndOfDifficulty')
        } else if (user.learningSessionCountThatDay <= 1) {
            dispatch('showSerieProgress')
        } else {
            commit('sessionEnded')
        }
    },
    showEndOfDifficulty({commit}) {
        commit('endOfDifficultyShowed')
    },
    endEndOfDifficulty({commit, dispatch, rootState}) {
        commit('endOfDifficultyEnded')

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
    submitSession({commit, state, rootState, dispatch}) {
        commit('submittingSession')

        if (rootState.security.isLoggedIn) {
            learningSessionService.submit(state.currentLearningSession.id, state.validatedAnswers)
                .then(() => {
                    commit('sessionSubmitted')
                    dispatch('showDailyProgress')
                    dispatch('security/reloadUserData', null, {root: true})
                })
                .catch(() => commit('sessionSubmitted'))
        } else {
            learningSessionService.submitAnonymous(
                state.currentLearningSession.id,
                state.validatedAnswers
            )
                .then(() => {
                    dispatch(
                        'bookLesson/moveAnonymousProgressForward',
                        {bookLesson: state.currentLearningSession.bookLesson},
                        {root: true}
                    )

                    dispatch('security/putUserData', null, {root: true})
                    commit('sessionSubmitted')
                    dispatch('showDailyProgress')

                    let currentlySavedAnonymousLearningSessions =
                        JSON.parse(localStorage.getItem('anonymousLearningSessions'))

                    if (!currentlySavedAnonymousLearningSessions) {
                        currentlySavedAnonymousLearningSessions = []
                    }

                    currentlySavedAnonymousLearningSessions.push({
                        learningSessionId: state.currentLearningSession.id,
                        validatedAnswers: state.validatedAnswers
                    })

                    localStorage.setItem(
                        'anonymousLearningSessions',
                        JSON.stringify(currentlySavedAnonymousLearningSessions)
                    )
                })
                .catch(() => commit('sessionSubmitted'))
        }
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
    endOfDifficultyShowed(state) {
        state.showingEndOfDifficulty = true
    },
    endOfDifficultyEnded(state) {
        state.showingEndOfDifficulty = false
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

