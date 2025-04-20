import AuthGuard from "@/components/guards/auth-guard";

export default function ProfilePage() {
    return (
        <AuthGuard>
            <section className="profile">
                asd
            </section>
        </AuthGuard>
    )
}