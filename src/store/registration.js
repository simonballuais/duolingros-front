import {registrationService} from '../service'

const state = {
    showReasonSelection: false,
    showIntensitySelection: false,
    showCurrentLevelSelection: false,
    showCreateProfile: false,
    firstLearningSession: null,
    anonymousProgress: null,
    profileData: {},
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
    showCreateProfile({commit}) {
        commit('showingCreateProfile')
    },
    cancelCreateProfile({commit}) {
        commit('endShowingCreateProfile')
    },
    submitRegistration({state, commit}) {
        registrationService.register(
            state.profileData.email,
            state.profileData.username,
            state.profileData.password,
            JSON.parse(localStorage.getItem('anonymousLearningSessions'))
        )
            .then(() => commit('registrationSubmitted'))
            .catch((response) => commit('registrationError', response))
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
        localStorage.removeItem('anonymousUser')
        localStorage.removeItem('anonymousProgress')
        localStorage.removeItem('anonymousLearningSessions')
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
    showingCreateProfile(state) {
        state.showCreateProfile = true
    },
    endShowingCreateProfile(state) {
        state.showCreateProfile = false
    },
    registrationSubmitted() {
        window.console.log('registered')
    },
    registrationError(state, response) {
        window.console.log('registrationerror', response)
        state
    },
}

export const registration = {
    namespaced: true,
    state,
    actions,
    mutations,
}

