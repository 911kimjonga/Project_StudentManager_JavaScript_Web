import { Student } from "./student.js";
import { StudentRepository } from "./student-repository.js";
import { EventHandler } from "./event-handler.js";

let studentRepository = new StudentRepository();

let eventHandler = new EventHandler();
eventHandler.eventRegist();

export { studentRepository }