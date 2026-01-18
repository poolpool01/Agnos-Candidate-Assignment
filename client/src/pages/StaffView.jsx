import { useSocket } from "../hooks/useSocket"
import InfoRow from "../components/InfoRow"

export default function StaffView() {
    const { data } = useSocket()

    return (
        <div className="min-h-screen bg-slate-100 p-4">
            <div className="max-w-5xl mx-auto space-y-6">

                <h1 className="text-2xl font-bold">Live Patient Monitor</h1>

                {data.status && (
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                        {data.status}
                    </span>
                )}

                {/* Personal Info */}
                <section className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-lg mb-2">Personal Information</h2>
                    <InfoRow label="First Name" value={data.firstName} />
                    <InfoRow label="Middle Name" value={data.middleName} />
                    <InfoRow label="Last Name" value={data.lastName} />
                    <InfoRow label="Date of Birth" value={data.dob} />
                    <InfoRow label="Gender" value={data.gender} />
                    <InfoRow label="Nationality" value={data.nationality} />
                </section>

                {/* Contact Info */}
                <section className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-lg mb-2">Contact Information</h2>
                    <InfoRow label="Phone" value={data.phone} />
                    <InfoRow label="Email" value={data.email} />
                    <InfoRow label="Address" value={data.address} />
                </section>

                {/* Additional Info */}
                <section className="bg-white rounded-lg shadow p-4">
                    <h2 className="font-semibold text-lg mb-2">Additional Information</h2>
                    <InfoRow label="Preferred Language" value={data.preferredLanguage} />
                    <InfoRow label="Religion" value={data.religion} />
                </section>

                {/* Emergency Contact */}
                {data.emergencyContact && (
                    <section className="bg-white rounded-lg shadow p-4">
                        <h2 className="font-semibold text-lg mb-2">Emergency Contact</h2>
                        <InfoRow
                            label="Name"
                            value={data.emergencyContact?.name}
                        />
                        <InfoRow
                            label="Relationship"
                            value={data.emergencyContact?.relationship}
                        />
                    </section>
                )}
            </div>
        </div>
    )
}
