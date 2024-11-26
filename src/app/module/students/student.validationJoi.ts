//    creating a schema validation using joi

import Joi from 'joi';

// Joi schema for UserName
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base':
        'First name must start with a capital letter and have only lowercase letters after.',
      'string.max': 'First name can have a maximum length of 20 characters.',
    }),
  middleName: Joi.string().trim().allow(null, ''),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base':
        'Last name must contain only alphabetic characters.',
    }),
});

// Joi schema for Guardian
const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'any.required': "Father's name is required.",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'any.required': "Father's occupation is required.",
  }),
  fatherContact: Joi.string().trim().required().messages({
    'any.required': "Father's contact number is required.",
  }),
  motherName: Joi.string().trim().required().messages({
    'any.required': "Mother's name is required.",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'any.required': "Mother's occupation is required.",
  }),
  motherContact: Joi.string().trim().required().messages({
    'any.required': "Mother's contact number is required.",
  }),
});

// Joi schema for LocalGuardian
const localGuardianSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Local guardian name is required.',
  }),
  occupation: Joi.string().trim().required().messages({
    'any.required': 'Local guardian occupation is required.',
  }),
  contact: Joi.string().trim().required().messages({
    'any.required': 'Local guardian contact is required.',
  }),
  address: Joi.string().trim().required().messages({
    'any.required': 'Local guardian address is required.',
  }),
});

// Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'any.required': 'Student ID is required.',
  }),
  name: userNameSchema.required().messages({
    'any.required': 'Student name is required.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required.',
    'any.only':
      "Gender must be one of the following: 'male', 'female', or 'other'.",
  }),
  dateOfBirth: Joi.string().isoDate().optional().messages({
    'string.isoDate': 'Date of birth must be a valid ISO date.',
  }),
  email: Joi.string().trim().required().email().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required.',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'any.required': 'Emergency contact number is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only':
        "Blood group must be one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
    }),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required.',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required.',
  }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required.',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local guardian information is required.',
  }),
  profileImage: Joi.string().uri().optional().messages({
    'string.uri': 'Profile image must be a valid URI.',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': "'isActive' must be either 'active' or 'blocked'.",
  }),
});

export default studentValidationSchema;
