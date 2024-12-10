import { z } from "zod";


const PreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
  });
  
  const createCourseValidationSchema = z.object({
    body: z.object({
      title: z.string(),
      prefix: z.string(),
      code: z.number(),
      credit: z.number(),
      PreRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
      isDeleted: z.boolean().optional(),
    }),
  });

  export const CourseValidations={
    createCourseValidationSchema
  }