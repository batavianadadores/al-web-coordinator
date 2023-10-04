const Pool = require("../../pool/pool");
const Lesson = require("../../lesson/lesson");
const Student = require("../../student/student");
const Trainer = require("../../trainer/trainer");

/**
 * @typedef {Object} TrainerSurvey
 * @property {number} surveyId              - Survey Id, min 1
 * @property {number} studentId             - Student Id, min 1
 * @property {number} lessonId              - Lesson Id, min 1
 * @property {number} trainerId             - Trainer Id, min 1
 * @property {number} rate                  - Rate, min 1, max 5
 * @property {string} [comment]             - Comment, max 500 characters
 * @property {string} createdAt             - Created At, string date
 * @property {string} hash                  - Hash, fixed lenght
 * @property {string} [answerAt]            - Answer At, string date
 * @property {Lesson.Lesson} lesson         - Lesson
 * @property {Student.Student} student      - Student
 * @property {Pool.Pool} pool               - Pool
 * @property {Trainer.Trainer[]} trainers   - Trainers
 */

class TrainerSurveyModel {
    /**
     * Survey Id, min 1
     * @type {number}
     */
    surveyId;

    /**
     * Student Id, min 1
     * @type {number}
     */
    studentId;

    /**
     * Lesson Id, min 1
     * @type {number}
     */
    lessonId;

    /**
     * Trainer Id, min 1
     * @type {number}
     */
    trainerId;

    /**
     * Rate, min 1, max 5
     * @type {number}
     */
    rate;

    /**
     * Comment, max 500 characters
     * @type {string|undefined}
     */
    comment;

    /**
     * Created At, string date
     * @type {string}
     */
    createdAt;

    /**
     * Hash, fixed lenght
     * @type {string}
     */
    hash;

    /**
     * Answer At, string date
     * @type {string|undefined}
     */
    answerAt;

    /**
     * Lesson
     * @type {Lesson.Lesson|undefined}
     */
    lesson;

    /**
     * Student
     * @type {Student.Student|undefined}
     */
    student;

    /**
     * Pool
     * @type {Pool.Pool|undefined}
     */
    pool;

    /**
     * Trainers
     * @type {Trainer.Trainer|undefined}
     */
    trainers;

    /**
     * Creates a TrainerSurveyModel
     * @param {TrainerSurvey} object - Object
     * @returns {TrainerSurveyModel}
     */
    static fromSale(object) {
        return modelFromObject(object, TrainerSurveyModel);
    }
}

module.exports = { TrainerSurveyModel };
