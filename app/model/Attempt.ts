export interface Attempt{
    attemptId:number,
    userId:number,
    questionId:number,
    answer:number,
    isCorrect:boolean,
    createdAt:string,
    updatedAt:string
}