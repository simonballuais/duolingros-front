import Urls from '../urls'

export const registrationService = {
    register,
}

function register(
    email,
    username,
    password,
    reason,
    currentLevel,
    dailyObjective,
    anonymousLearningSessions,
) {
    return new Promise((resolve, reject) => {
        Urls.getAxios()
            .post(
                Urls.get('submit_profile'),
                {
                    email,
                    username,
                    password,
                    reason,
                    currentLevel,
                    dailyObjective,
                    anonymousLearningSessions
                }
            ).then((response) => {
                resolve(response.data)
            }).catch((data) => {
                window.console.error(data);
                reject()
            })
    });
}
