import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container px-4 md:px-6 py-12 md:py-24 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Manage Tasks with Ease
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Your simple, powerful task management solution. Stay organized and
          boost productivity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg">Get Started Free</Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 md:px-6 py-12 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to stay organized
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Quick Sign-In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Simple and secure authentication. Get started in seconds with
                your favorite social accounts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Easy Task Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create, organize, and track tasks effortlessly. Set priorities
                and deadlines with just a few clicks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Progress Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor your productivity with visual progress indicators and
                completion statistics.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container px-4 md:px-6 py-12 space-y-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold">1. Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account in seconds using your email or social
                accounts
              </p>
            </div>
            <Separator className="hidden md:block" orientation="vertical" />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold">2. Add Tasks</h3>
              <p className="text-muted-foreground">
                Quickly add and organize your tasks with our intuitive interface
              </p>
            </div>
            <Separator className="hidden md:block" orientation="vertical" />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold">3. Get Things Done</h3>
              <p className="text-muted-foreground">
                Track progress and celebrate completing your tasks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6 py-12">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col items-center gap-4 p-8">
            <h2 className="text-3xl font-bold text-center">
              Ready to boost your productivity?
            </h2>
            <p className="text-center max-w-[600px]">
              Join thousands of users who are already managing their tasks
              effectively
            </p>
            <Button size="lg" variant="secondary">
              Start For Free
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
