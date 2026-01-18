import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientSchema } from "../schema/patientSchema"
import { useSocket } from "../hooks/useSocket"

import InputField from "../components/InputField"

export default function PatientForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(patientSchema),
    })
    const { socket } = useSocket()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const onSubmit = (data) => {
        socket.emit("patient:submit", data)
        setIsSubmitted(true)
    }



    const watchedData = watch()
    useEffect(() => {
        if (isSubmitted) return

        const result = patientSchema.safeParse(watchedData)
        if (result.success) {
            socket.emit("patient:update", cleanData(result.data))
        }
    }, [watchedData, socket, isSubmitted])



    const cleanData = (data) =>
        Object.fromEntries(
            Object.entries(data).filter(
                ([_, v]) =>
                    v !== "" &&
                    v !== undefined &&
                    !(typeof v === "object" && Object.keys(v).length === 0)
            )
        )



    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow space-y-4"
            >
                <h1 className="text-2xl font-bold">Patient Information</h1>

                <div className="grid md:grid-cols-3 gap-4">
                    <InputField label="First Name" name="firstName" register={register} error={errors.firstName} disabled={isSubmitted} />
                    <InputField label="Middle Name" name="middleName" register={register} error={errors.middleName} disabled={isSubmitted} />
                    <InputField label="Last Name" name="lastName" register={register} error={errors.lastName} disabled={isSubmitted} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Date of Birth" name="dob" type="date" register={register} error={errors.dob} disabled={isSubmitted} />
                    <InputField label="Gender" name="gender" register={register} error={errors.gender} disabled={isSubmitted} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Phone" name="phone" register={register} error={errors.phone} disabled={isSubmitted} />
                    <InputField label="Email" name="email" register={register} error={errors.email} disabled={isSubmitted} />
                </div>

                <InputField label="Address" name="address" register={register} error={errors.address} disabled={isSubmitted} />

                <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Preferred Language" name="preferredLanguage" register={register} error={errors.preferredLanguage} disabled={isSubmitted} />
                    <InputField label="Nationality" name="nationality" register={register} error={errors.nationality} disabled={isSubmitted} />
                </div>

                <h2 className="font-semibold pt-4">Emergency Contact (Optional)</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <InputField label="Name" name="emergencyContact.name" register={register} disabled={isSubmitted} />
                    <InputField label="Relationship" name="emergencyContact.relationship" register={register} disabled={isSubmitted} />
                </div>

                <InputField label="Religion (Optional)" name="religion" register={register} disabled={isSubmitted} />

                {isSubmitted && (
                    <button
                        type="button"
                        onClick={() => {
                            window.location.reload()
                        }}
                        className="w-full bg-gray-500 text-white py-2 rounded"
                    >
                        New Patient
                    </button>
                )}

            </form>
        </div>
    )
}
