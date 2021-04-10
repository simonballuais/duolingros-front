const levenshtein = require('js-levenshtein')

const DEBUG = false
const THRESHOLD_FOR_GUESSING = 15
const THRESHOLD_FOR_ACCEPTING = 1
const NOT_A_GROUP_DELIMITER = '[^({[]'
const OPTION_GROUP_REGEX = new RegExp(
    '\\(' + NOT_A_GROUP_DELIMITER + '*?(?:\\|' + NOT_A_GROUP_DELIMITER + '*?)\\)',
    'i'
)

export const translationCorrector = {
    correct,
}

function correct(translation, proposedAnswer) {
    const answers = getConcreteAnswers(translation.answers)
    log("Début de correction de proposition")

    let correction = {
        type: 'translation',
        id: translation.id,
        isCorrect: false,
        correctAnswerText: '',
        proposedAnswer: proposedAnswer,
        remark: '',
    }

    const purifiedProposition = purifyString(proposedAnswer)
    log("Proposition analysée : " + purifiedProposition)

    answers.forEach((answer) => {
        const purifiedAnswer = purifyString(answer)
        log("Réponse envisagée : " + purifiedAnswer)
        const regex = new RegExp('^' + purifiedProposition, 'i')

        if (purifiedAnswer.match(regex)) {
            log("Match parfait trouvé")
            return correction
        }
    })

    log("Aucun match parfait trouvé")

    const closestGoodAnswer = findClosestCandidate(
        proposedAnswer,
        answers
    )

    correction.correctAnswerText = "«&nbsp;" + closestGoodAnswer + "&nbsp;»"
    const purifiedAnswer = purifyString(closestGoodAnswer)
    log("Réponse la plus proche de la proposition" + purifiedAnswer)

    const distance = levenshtein(purifiedAnswer, purifiedProposition)
    log("Distance avec la proposition :" + distance)

    if (distance <= THRESHOLD_FOR_ACCEPTING) {
        log("Réponse acceptée malgré la distance")
        correction.isCorrect = true
    }

    if (distance != 0) {
        if (distance <= THRESHOLD_FOR_GUESSING) {
            const correctedAnswer = generateCorrectedAnswer(
                proposedAnswer,
                closestGoodAnswer
            )

            if (correction.isCorrect) {
                correction.remark = "Vouliez-vous dire&nbsp;:&nbsp;«&nbsp;" + correctedAnswer + "&nbsp;»&nbsp;?"
            } else {
                correction.remark = "«&nbsp;" + correctedAnswer + "&nbsp;»"
            }
        }
    }

    return correction
}

function getConcreteAnswers(answers)
{
    let concreteAnswers = []

    answers.forEach((a) => {
        concreteAnswers = concreteAnswers.concat(concretiseAnswer(a))
    })

    return concreteAnswers
}

function concretiseAnswer(answers)
{
    if (!Array.isArray(answers)) {
        answers = [answers]
    }

    let concretisedAnswers = []

    answers.forEach((answer) => {
        let finalOptionGroups = findFinalOptionGroups(answer)
        let probablyConcretisedAnswers = distributeOptionGroups(answer, finalOptionGroups)

        probablyConcretisedAnswers.forEach((probablyConcretisedAnswer) => {
            let finalOptionGroups = findFinalOptionGroups(probablyConcretisedAnswer)

            if (finalOptionGroups.length) {
                let actuallyConcretisedAnswers = concretiseAnswer(probablyConcretisedAnswer)
                concretisedAnswers = concretisedAnswers.concat(actuallyConcretisedAnswers)
            }
            else {
                concretisedAnswers.push(probablyConcretisedAnswer.trim())
            }
        })
    })

    return concretisedAnswers
}

function findFinalOptionGroups(candidate)
{
    let result = candidate.match(OPTION_GROUP_REGEX)
        log(candidate, result, OPTION_GROUP_REGEX)

    if (result) {
        return result.reverse()
    }

    return []
}

function distributeOptionGroups(answer, optionGroups)
{
    return recursiveDistribution([answer], optionGroups)
}

function recursiveDistribution(answers, optionGroups)
{
    if (!optionGroups || !optionGroups.length) {
        return answers
    }

    let distributedAnswers = []
    let optionGroup = optionGroups.pop()
    let options = optionGroup
            .replace(')', '')
            .replace('(', '')
            .split('|')
    let replaceTarget = optionGroup
        .replace('|', '\\|')
        .replace('(', '\\(')
        .replace(')', '\\)')

    answers.forEach((distributableAnswer) =>
        options.forEach((option) => {
            log(distributableAnswer, replaceTarget, option, distributableAnswer.replace(optionGroup, option))
            distributedAnswers.push(distributableAnswer.replace(optionGroup, option))
        })
    )

    if (optionGroups.length) {
        return recursiveDistribution(distributedAnswers, optionGroups)
    }

    return distributedAnswers
}






function purifyString(subject)
{
    if (!subject) {
        return subject
    }

    return (subject.toLowerCase()
        .replace(/[.,:\-;?']/, ' ')
        .replace(/ {2}/, ' ')
        .replace(/ {2}/, ' ')
        .replace(/ {2}/, ' ')
        .replace(/ {2}/, ' ')
        .replace(/ {2}/, ' ')
        .replace(/^/, '')
        .replace(/[éèê]/, 'e')
        .replace(/[àâ]/, 'a')
        .replace(/[îï]/, 'i')
        .replace(/[îï]/, 'i')
        .trim()
    )
}

function findClosestCandidate(model, candidates)
{
    if (!candidates[0]) {
        return ''
    }

    let bestCandidate = candidates[0]
    let bestScore = levenshtein(model, bestCandidate)

    candidates.forEach((candidate) => {
        const score = levenshtein(model, candidate)

        if (score < bestScore) {
            bestCandidate = candidate
            bestScore = score
        }
    })

    return bestCandidate
}

function generateCorrectedAnswer(submitted, expected)
{
    log("Génération d'une proposition corrigée", submitted, expected)
    let correctedAnswer = ""
    let submittedWords = submitted.split(' ')
    let expectedWords = expected.split(' ')

    log(expectedWords)
    log(submittedWords)

    let submittedWordSelectionOffset = 0

    for (var index = 0; index < expectedWords.length; ++index) {
        let expectedWord = expectedWords[index]
        let submittedWord = ""

        if (submittedWords[index + submittedWordSelectionOffset]) {
            submittedWord = submittedWords[index + submittedWordSelectionOffset]
        }

        let nextSubmittedWord = ""

        if (submittedWords[index + submittedWordSelectionOffset + 1]) {
            nextSubmittedWord = submittedWords[index + submittedWordSelectionOffset + 1]
        }

        let nextExpectedWord = ""

        if (expectedWords[index + 1]) {
            nextExpectedWord = expectedWords[index + 1]
        }

        log("Comparaison de expectedWord vs submittedWord")

        if (expectedWord != submittedWord) {
            log("Échec de la comparaison")

            if (submittedWord == nextExpectedWord) {
                correctedAnswer += "<strong>" + expectedWord + "</strong> "
                log(expectedWord +" On le met en gras")

                submittedWordSelectionOffset --

                continue
            }

            if (nextSubmittedWord == expectedWord) {
                correctedAnswer += "<strike>" + submittedWord + "</strike>"
                log(submittedWord + ". On raye le mot actuel")

                submittedWordSelectionOffset ++

                continue
            }

            correctedAnswer += "<strike>" + submittedWord + "</strike> <strong>" + expectedWord+ "</strong>"
            log("Erreur simple. Rayage et remplacement")
        }
        else {
            correctedAnswer += submittedWord + ""
        }

        correctedAnswer += " "
    }

    correctedAnswer = correctedAnswer.trim()
    log("Réponse corrigée : " + correctedAnswer)

    return correctedAnswer
}

function log(text) {
    if (DEBUG) {
        window.console.log(text)
    }
}
