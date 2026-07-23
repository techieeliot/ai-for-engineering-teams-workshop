import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CustomerCardDemo } from './_components/CustomerCardDemo';
import { DashboardWidgetDemo } from './_components/DashboardWidgetDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="mb-2 font-heading text-4xl font-bold text-foreground">
          Customer Intelligence Dashboard
        </h1>
        <p className="text-muted-foreground">
          AI for Engineering Teams Workshop - Your Progress
        </p>
      </header>

      {/* Progress Indicator */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Workshop Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="text-foreground">✅ Setup Complete - Next.js app is running</p>
          <p className="text-foreground">✅ Exercise 3: CustomerCard component implemented</p>
          <p>⏳ Exercise 4: CustomerSelector integration</p>
          <p>⏳ Exercise 5: Domain Health widget</p>
          <p>⏳ Exercise 9: Production-ready features</p>
        </CardContent>
      </Card>

      {/* Component Showcase Area */}
      <div className="space-y-8">
        {/* CustomerCard Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">CustomerCard Component</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerCardDemo />
          </CardContent>
        </Card>

        {/* Dashboard Widgets Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dashboard Widgets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <DashboardWidgetDemo widgetName="Domain Health Widget" exerciseNumber={5} />
              <DashboardWidgetDemo widgetName="Market Intelligence" exerciseNumber={6} />
              <DashboardWidgetDemo widgetName="Predictive Alerts" exerciseNumber={8} />
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="bg-accent text-accent-foreground">
          <CardHeader>
            <CardTitle className="text-lg">Ready to Start Building?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Follow along with the workshop exercises to see this dashboard come to life with AI-generated components.
            </p>
            <div className="text-sm text-muted-foreground">
              <p className="mb-1"><strong className="text-foreground">Next:</strong> Exercise 1 - Create your first specification</p>
              <p className="mb-1"><strong className="text-foreground">Then:</strong> Exercise 3 - Generate your first component</p>
              <p className="text-xs">💡 Tip: Refresh this page after completing exercises to see your progress!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
