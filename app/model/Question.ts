// Question Model
export interface Question {
    questionId: number;
    questionText: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correctAnswer: number;
    createdAt: string; 
    updatedAt: string;
}
