/*
 *   StudentController.ts
 *   Project: exercise_three
 *
 *   Author: Morgan Moore
 *   Created on: Feb 14, 2023
 */
import { Request, Response } from 'express';
import {
  students,
  addStudent,
  getStudent,
  getLetterGrade,
  updateStudentGrade,
} from '../models/StudentModel';

function getAllStudents(req: Request, res: Response): void {
  res.json(students);
}

function createNewStudent(req: Request, res: Response): void {
  const studentData = req.body as NewStudentRequest; // Assign `req.body` as a `NewStudentRequest`

  const didAddStudent = addStudent(studentData); // Call the `addStudent` function using the student's data

  if (!didAddStudent) {
    res.sendStatus(409);
    return;
  }
  // If the student's data was not added successfully
  // Responds with status 409 (This means 409 Conflict)
  // return from the function

  res.sendStatus(201);
  // Send status 201 (This means 201 Created)
}

function getStudentByName(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams; // Assign `req.params` as a `StudentNameParams`;
  const student = getStudent(studentName); // get the student's data using function imported from StudentModel

  if (student === undefined) {
    res.sendStatus(404);
    return;
  }

  res.json(student);
  // If `student` is undefined
  // respond with status 404 (Which means 404 Not Found)
  // return immediately

  // Respond with the student's information as json
}

function calculateFinalExamScore(
  currentAverage: number,
  finalExamWeight: number,
  targetScore: number
): number {
  // Calculate the final exam score needed to get the targetScore in the class
  const finalScore: number =
    (targetScore - (100 - finalExamWeight) * currentAverage) / finalExamWeight;
  return finalScore;
}

function getFinalExamScores(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams; // Get the student name from the path params
  const student = getStudent(studentName); // Get the student's data from the dataset
  if (student === undefined) {
    res.sendStatus(404);
    return; // If the student was not found
  } // responds with status 404 Not Found
  // terminate the function
  const studentAverage = student.currentAverage; // Get the current average and weights from the student's data
  const studentWeights = student.weights;
  const size = studentWeights.assignmentWeights.length;
  let neededA: number = 0;
  let neededB: number = 0;
  let neededC: number = 0;
  let neededD: number = 0;
  for (let i = 0; i < size; i += 1) {
    neededA = calculateFinalExamScore(
      studentAverage,
      studentWeights.assignmentWeights[i].weight,
      90
    );
    neededB = calculateFinalExamScore(
      studentAverage,
      studentWeights.assignmentWeights[i].weight,
      80
    );
    neededC = calculateFinalExamScore(
      studentAverage,
      studentWeights.assignmentWeights[i].weight,
      70
    );
    neededD = calculateFinalExamScore(
      studentAverage,
      studentWeights.assignmentWeights[i].weight,
      60
    );
    res.json(neededA);
    res.json(neededB);
    res.json(neededC);
    res.json(neededD);
  }
  // Calculate the grade needed on the final to score a 90 in the class (this is the grade needed for an A)
  // Calculate the grade needed on the final to score a 80 in the class (this is the grade needed for a B)
  // Calculate the grade needed on the final to score a 70 in the class (this is the grade needed for a C)
  // Calculate the grade needed on the final to score a 60 in the class (this is the grade needed for a D)
  // Send a JSON response with an object containing the grades needed for an A through D
}

function calcFinalScore(req: Request, res: Response): void {
  const { studentName } = req.params as StudentNameParams; // Get the student name from the path params

  const student = getStudent(studentName); // Get the student's data from the dataset

  if (student === undefined) {
    res.sendStatus(404); // If the student was not found
    return; // responds with status 404 Not Found
  } // terminate the function

  const gradeData = req.body as AssignmentGrade; // Get the grade data from the request body as the `AssignmentGrade` type

  const studentAverage = student.currentAverage; // Get the current average and weights from the student's data
  const studentWeights = student.weights;

  const overallScore = calculateFinalExamScore(
    studentAverage,
    studentWeights.assignmentWeights[0].weight,
    gradeData
  ); // Calculate the final score that would receive using their current average and the hypothetical final exam grade.
  const letterGrade = getLetterGrade(overallScore); // Get the letter grade they would receive given this score

  res.json(overallScore);
  res.json(letterGrade); // Send back a JSON response containing their `overallScore` and `letterGrade.
}

function updateGrade(req: Request, res: Response): void {
  const { name, assignment } = req.params as GradeUpdateParams; // Get the student's name and assignment name from the path parameters as a `GradeUpdateParams`
  const { grade } = req.body as AssignmentGrade; // Get the grade from the request body as an `AssignmentGrade`
  const updatedGrade = updateStudentGrade(name, assignment, grade); // Update the student's grade
  if (!updatedGrade) {
    res.sendStatus(404);
    return; // If the update did not complete (this means the student or the assignment wasn't found)
  } // respond with status 404 Not Found
  // terminate the function immediately
  res.sendStatus(200); // Respond with status 200 OK
}

export {
  getAllStudents,
  createNewStudent,
  getStudentByName,
  calculateFinalExamScore,
  getFinalExamScores,
  calcFinalScore,
  updateGrade,
};
