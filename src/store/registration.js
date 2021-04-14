import {registrationService} from '../service'

const state = {
    showCreateProfile: false,
    firstLearningSession: null,
    anonymousProgress: null,
    profileData: {},
    submittingProfile: false,
    workflowPosition: 1,
    workflowDirection: 'forward',
}

const actions = {
    startRegistration({commit, dispatch}) {
        localStorage.removeItem('anonymousUser')
        localStorage.removeItem('anonymousProgress')
        localStorage.removeItem('anonymousLearningSessions')
        dispatch('security/initAnonymousUser', null, {root: true})
        dispatch('security/reloadUserData', null, {root: true})
        commit('registrationStarted')
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
    goToNextPosition({state, commit, dispatch}) {
        window.console.log(state.workflowPosition)
        if (state.workflowPosition >= 3) {
            commit('allQuestionsAnswered')
            dispatch('security/putUserData', null, {root: true})
        } else {
            commit('goingToNextPosition')
        }
    },
    goToPreviousPosition({state, commit}) {
        if (state.workflowPosition <= 1) {
            commit('registrationCancelled')
        } else {
            commit('goingToPreviousPosition')
        }
    },
    submitRegistration({state, commit}) {
        return new Promise((resolve, reject) => {
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
                    resolve()
                    commit('registrationSubmitted')
                    commit('security/loginSuccess', {user, token}, {root: true})
                })
                .catch((response) => {
                    commit('registrationError', response)
                    reject()
                })
        })
    },
}

const mutations = {
    userInfosInitiated(state, userInfos) {
        state.userInfos = userInfos
    },
    registrationStarted(state) {
        state.workflowPosition = 1
    },
    allQuestionsAnswered(state) {
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
    },
    registrationError(state, response) {
        window.console.log(response)
    },
    goingToNextPosition(state) {
        state.workflowPosition ++
        state.workflowDirection = 'forward'
    },
    goingToPreviousPosition(state) {
        state.workflowPosition --
        state.workflowDirection = 'backward'
    },
    registrationCancelled(state) {
        state.workflowPosition = 1
    }
}

export const registration = {
    namespaced: true,
    state,
    actions,
    mutations,
}

