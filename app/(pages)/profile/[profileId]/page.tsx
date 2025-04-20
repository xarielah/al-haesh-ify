import AuthGuard from "@/components/guards/auth-guard";

export default function ProfileDetails() {
    return (
        <AuthGuard>
            <section className="profile-details">
                someones profiles
            </section>
        </AuthGuard>
    )
}