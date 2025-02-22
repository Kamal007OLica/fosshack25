
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, Music, BarChart, Focus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: OnboardingStep[] = [
  {
    title: "Track Your Time",
    description: "Timeaify automatically tracks your activity and shows you how you spend your time.",
    icon: Timer,
  },
  {
    title: "Focus Mode",
    description: "Use Ctrl+F to toggle focus mode and block distracting apps and websites.",
    icon: Focus,
  },
  {
    title: "Listen to Music",
    description: "Connect your Spotify account to control your music right from the dashboard.",
    icon: Music,
  },
  {
    title: "Analytics",
    description: "View detailed insights about your productivity and time usage patterns.",
    icon: BarChart,
  },
];

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("onboardingComplete", "true");
      setIsVisible(false);
      onComplete();
    }
  };

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Welcome to Timeaify</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onComplete}
              className="text-muted-foreground"
            >
              Skip
            </Button>
          </div>
          <CardDescription>Let's get you started with the basics</CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <CurrentIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground">{steps[currentStep].description}</p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
