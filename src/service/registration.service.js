import Urls from '../urls'

export const registrationService = {
    register,
}

function register(
    email,
    username,
    password,
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
