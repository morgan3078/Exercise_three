/*
 *   StudentModel.ts
 *   Project: exercise_three
 *
 *   Author: Morgan Moore
 *   Created on: Feb 14, 2023
 */
const students: StudentManager = {};

function calculateAverage(weights: CourseGrades): number {
  let average: number = 0;
  let weightedGrade: number;
  const size: number = weights.assignmentWeights.length;
  for (let i = 0; i < size; i += 1) {
    weightedGrade =
      weights.assignmentWeights[i].grade * (weights.assignmentWeights[i].weight / 100);
    average += weightedGrade;
  }
  return average;
}

function addStudent(newStudentData: NewStudentRequest): boolean {
  // Destructure the name and weights
  const { name, weights } = newStudentData;

  // the the name is already in `students`
  // then return false
  if (name in students) {
    return false;
  }
  // Calculate the student's current average (use the function previously defined)
  const average: number = calculateAverage(weights);
  const newStudent: Student = {
    name,
    weights,
    currentAverage: average,
  }; // Create a `Student` object using the `name`, `weights` and `currentAverage
  students[name] = newStudent;
  return true;
}

function getStudent(studentName: string): Student | undefined {
  // If the student's name is not in `students`
  if (!(studentName in students)) {
    return undefined;
  } // then return undefined
  return students[studentName];
  // Return the student's information (their name is the key for `students`)
}

function getLetterGrade(score: number): string {
  if (score >= 90) {
    return 'A';
  }
  if (score >= 80) {
    return 'B';
  }
  if (score >= 70) {
    return 'C';
  }
  if (score >= 60) {
    return 'D';
  }
  return 'F';

  // Return the appropriate letter grade
}

function updateStudentGrade(
  studentName: string,
  assignmentName: string,
  newGrade: number
): boolean {
  const student = getStudent(studentName); // Get the student's data from the dataset

  if (student === undefined) {
    return false; // If the student was not found
  } // return false

  const assignment = student.weights.assignmentWeights.find(({ name }) => name === assignmentName); // Search the student's `assignmentWeights` and find the assignment with the matching name using the .find() method

  if (assignment === undefined) {
    return false; // If the assignment was not found
  } // return false

  assignment.grade = newGrade; // Set the assignment's grade to the newGrade

  student.currentAverage = calculateAverage(student.weights); // Then recalculate the student's currentAverage
  return true; // return true since the update completed successfully
}

export { students, addStudent, getStudent, getLetterGrade, updateStudentGrade };
