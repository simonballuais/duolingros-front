export const questionCorrector = {
    correct,
}

function correct(question, proposedAnswer) {
    return {
        type: 'question',
        id: question.id,
        isCorrect: question.answer.id === proposedAnswer,
        correctAnswer: question.answer.id,
        proposedAnswer: proposedAnswer,
        remark: question.answer.text,
    }
}

