/*
 *   index.ts
 *   Project: Exercise_three
 *
 *   Author: Morgan Moore
 *   Created on: Feb 14, 2023
 */
import express, { Express } from 'express';
import { StudentController } from './controllers/StudentController';

const app: Express = express();
const PORT = 8091;

app.use(express.json());

app.post('/api/students', StudentController.createNewStudent);
app.get('/api/students/:studentName', StudentController.getStudentByName);
app.get('/api/students/:studentName/finalExam', StudentController.getFinalExamScores);
app.post('/api/students/:studentName/finalExam', StudentController.calcFinalScore);
app.post('/api/students/:studentName/grades/:assignmentName', StudentController.updateGrade);
// function handleListen(): void {
//  console.log(`Server listening on http://localhost:${PORT}`);
// }

// app.listen(PORT, handleListen);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
