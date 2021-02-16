const state = {
    showReasonSelection: false,
    showIntensitySelection: false,
    showCurrentLevelSelection: false,
    userInfos: null,
    firstLearningSession: null,
    anonymousProgress: null
}

const actions = {
    startRegistration({commit, state}) {
        if (!state.userInfos) {
            commit(
                'userInfosInitiated',
                {
                    reason: null,
                    intensity: null,
                    currentLevel: null,
                }
            )
        }
        commit('registrationStarted')
    },
    endReasonSelection({commit}) {
        commit('reasonSelectionEnded')
    },
    endIntensitySelection({commit}) {
        commit('intensitySelectionEnded')
    },
    endCurrentLevelSelection({commit}) {
        commit('currentLevelSelectionEnded')
    },
}

const mutations = {
    userInfosInitiated(state, userInfos) {
        state.userInfos = userInfos
    },
    registrationStarted(state) {
        state.showReasonSelection = true
        state.showIntensitySelection = false
        state.showCurrentLevelSelection = false
    },
    reasonSelectionEnded(state) {
        state.showReasonSelection = false
        state.showIntensitySelection = true
    },
    intensitySelectionEnded(state) {
        state.showIntensitySelection = false
        state.showCurrentLevelSelection = true
    },
    currentLevelSelectionEnded(state) {
        state.showCurrentLevelSelection = false
    },
}

export const registration = {
    namespaced: true,
    state,
    actions,
    mutations,
}

