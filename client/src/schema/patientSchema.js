import { z } from "zod"

export const patientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().regex(/^[0-9]{9,10}$/, "Invalid phone number"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  preferredLanguage: z.string().min(1, "Preferred language is required"),
  nationality: z.string().min(1, "Nationality is required"),
  emergencyContact: z.object({
    name: z.string().optional(),
    relationship: z.string().optional(),
  }).optional(),
  religion: z.string().optional(),
})
