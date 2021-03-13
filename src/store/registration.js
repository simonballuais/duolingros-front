import {registrationService} from '../service'

const state = {
    showReasonSelection: false,
    showIntensitySelection: false,
    showCurrentLevelSelection: false,
    showCreateProfile: false,
    firstLearningSession: null,
    anonymousProgress: null,
    profileData: {},
    submittingProfile: false,
    showingProfileCreated: false,
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
    endShowingCreatedProfile({commit}) {
        commit('endShowingCreatedProfile')
    },
    submitRegistration({state, commit}) {
        commit('submittingProfile')
        const anonymousUser = JSON.parse(localStorage.getItem('anonymousUser'))
        registrationService.register(
            state.profileData.email,
            state.profileData.username,
            state.profileData.password,
            anonymousUser.reason,
            anonymousUser.currentLevel,
            anonymousUser.dailyObjective,
            JSON.parse(localStorage.getItem('anonymousLearningSessions'))
        )
            .then(({user, token}) => {
                commit('registrationSubmitted')
                commit('security/loginSuccess', {user, token}, {root: true})
            })
            .catch((response) => commit('registrationError', response))
    },
}

const mutations = {
    userInfosInitiated(state, userInfos) {
        state.userInfos = userInfos
    },
    registrationStarted(state) {
        window.console.log('starting registration')
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
    submittingProfile(state) {
        state.submittingProfile = true
    },
    registrationSubmitted(state) {
        state.showCreateProfile = false
        setTimeout(() => state.showingProfileCreated = true, 500)
    },
    endShowingCreatedProfile(state) {
        state.showingProfileCreated = false
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

