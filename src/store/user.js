import { userService, progressService } from '../service'

const state = {
    'currentUser': null,
    savingProfile: false,
    profileSaveError: false,
}

const actions = {
    loadAllBookLessons({commit}) {
        bookLessonService.fetchAll()
            .then((bookLessons) => {
                commit('bookLessonsUpdated', bookLessons)
                commit('mergeProgressIntoBookLessonsIfPossible')
            })
            .catch(() => {
                commit('bookLessonsUpdateError')
            })
    },
    loadProgress({commit}) {
        progressService.get()
            .then((progress) => {
                commit('progressUpdated', progress)
                commit('mergeProgressIntoBookLessonsIfPossible')
            })
            .catch(() => {
                commit('progressUpdateError')
            })
    },
    saveProfile({commit}, user) {
        userService.put(user)
            .then((progress) => {
                commit('profileSaved')
            })
            .catch(() => {
                commit('profileSaveError')
            })
    },
}

const mutations = {
    bookLessonsUpdated(state, bookLessons) {
        state.bookLessons = bookLessons
    },
    bookLessonsUpdateError(state) {
        state.bookLessons = []
    },
    progressUpdated(state, progress) {
        state.progress = progress
    },
    mergeProgressIntoBookLessonsIfPossible(state) {
        if (!state.bookLessons || !state.progress) {
            return
        }

        state.bookLessons.forEach((bl) => {
            const correspondingProgress = state.progress.filter(
                    (p) => p.bookLessonId === bl.id
            ).pop()

            if (correspondingProgress) {
                bl.progress = correspondingProgress
            }
        })

        state.bookLessons.every((b) => {
            if (!b.progress) {
                state.lastUnlockedBookLessonId = b.id
                return false
            }

            return true
        })
    },
    savingProfile({state}) {
        state.savingProfile = true
        state.profileSaveError = false
    },
    profileSaved({state}) {
        state.savingProfile = false
    },
    profileSaveError({state}) {
        state.savingProfile = false
        state.profileSaveError = true
    },
}

export const bookLesson = {
    namespaced: true,
    state,
    actions,
    mutations,
}
