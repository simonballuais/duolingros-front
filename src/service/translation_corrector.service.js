const levenshtein = require('js-levenshtein')

const THRESHOLD_FOR_GUESSING = 15
const THRESHOLD_FOR_ACCEPTING = 1

export const translationCorrector = {
    correct,
}

function correct(translation, proposedAnswer) {
    const answers = translation.answers
    window.console.log("Début de correction de proposition")

    let correction = {
        type: 'translation',
        id: translation.id,
        isCorrect: false,
        correctAnswer: '',
        proposedAnswer: proposedAnswer,
        remark: '',
    }

    const purifiedProposition = purifyString(proposedAnswer)
    window.console.log("Proposition analysée : " + purifiedProposition)

    answers.forEach((answer) => {
        const purifiedAnswer = purifyString(answer)
        window.console.log("Réponse envisagée : " + purifiedAnswer)
        const regex = new RegExp('^' + purifiedProposition, 'i')

        if (purifiedAnswer.match(regex)) {
            window.console.log("Match parfait trouvé")
            return correction
        }
    })

    window.console.log("Aucun match parfait trouvé")

    const closestGoodAnswer = findClosestCandidate(
        proposedAnswer,
        answers
    )

    correction.correctAnswer = closestGoodAnswer
    const purifiedAnswer = purifyString(closestGoodAnswer)
    window.console.log("Réponse la plus proche de la proposition" + purifiedAnswer)

    const distance = levenshtein(purifiedAnswer, purifiedProposition)
    window.console.log("Distance avec la proposition :" + distance)

    if (distance <= THRESHOLD_FOR_ACCEPTING) {
        window.console.log("Réponse acceptée malgré la distance")
        correction.isCorrect = true
    }

    if (distance != 0) {
        if (distance <= THRESHOLD_FOR_GUESSING) {
            const correctedAnswer = generateCorrectedAnswer(
                proposedAnswer,
                closestGoodAnswer
            )

            correction.remark = "Vouliez-vous dire " + correctedAnswer + " ?"
        }
        else {
            correction.addRemark("On aurait pu dire : <strong>" + closestGoodAnswer + "</strong> ?")
        }
    }

    return correction
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
    window.console.log("Génération d'une proposition corrigée", submitted, expected)
    let correctedAnswer = ""
    let submittedWords = submitted.split(' ')
    let expectedWords = expected.split(' ')

    window.console.log(expectedWords)
    window.console.log(submittedWords)

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

        window.console.log("Comparaison de expectedWord vs submittedWord")

        if (expectedWord != submittedWord) {
            window.console.log("Échec de la comparaison")

            if (submittedWord == nextExpectedWord) {
                correctedAnswer += "<strong>expectedWord</strong> "
                window.console.log(expectedWord +" On le met en gras")

                submittedWordSelectionOffset --

                continue
            }

            if (nextSubmittedWord == expectedWord) {
                correctedAnswer += "<strike>" + submittedWord + "</strike>"
                window.console.log(submittedWord + ". On raye le mot actuel")

                submittedWordSelectionOffset ++

                continue
            }

            correctedAnswer += "<strike>" + submittedWord + "</strike> <strong>" + expectedWord+ "</strong>"
            window.console.log("Erreur simple. Rayage et remplacement")
        }
        else {
            correctedAnswer += submittedWord + ""
        }

        correctedAnswer += " "
    }

    correctedAnswer = correctedAnswer.trim()
    window.console.log("Réponse corrigée : " + correctedAnswer)

    return correctedAnswer
}
