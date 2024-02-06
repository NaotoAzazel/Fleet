import AuthCard from '../cards/AuthCard';

function AuthPage() {
  return (
    <main className="bg-background">
      <div className="grid min-h-screen place-items-center text-white container">
        <AuthCard />
      </div>
    </main>
  )
}

export default AuthPage;