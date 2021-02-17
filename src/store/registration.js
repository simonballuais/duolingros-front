const state = {
    showReasonSelection: false,
    showIntensitySelection: false,
    showCurrentLevelSelection: false,
    firstLearningSession: null,
    anonymousProgress: null
}

const actions = {
    startRegistration({commit, dispatch}) {
        dispatch('security/initAnonymousUserIfNecessary', null, {root: true})
        dispatch('security/reloadUserData', null, {root: true})
        commit('registrationStarted')
    },
    endReasonSelection({commit}) {
        commit('reasonSelectionEnded')
    },
    endIntensitySelection({commit}) {
        commit('intensitySelectionEnded')
    },
    endCurrentLevelSelection({commit, dispatch}) {
        commit('currentLevelSelectionEnded')
        dispatch('security/putUserData', null, {root: true})
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

