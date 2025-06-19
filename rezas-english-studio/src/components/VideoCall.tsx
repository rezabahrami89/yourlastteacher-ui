import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Monitor,
  Users,
  Calendar,
  Clock,
  Settings,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface VideoCallProps {
  classData: {
    id: string;
    title: string;
    date: string;
    time: string;
    duration: number;
    type: "zoom" | "meet";
    teacher: string;
    student: string;
    meetingUrl?: string;
    meetingId?: string;
    password?: string;
  };
}

export function VideoCall({ classData }: VideoCallProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const joinCall = async () => {
    setIsConnecting(true);

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (classData.meetingUrl) {
      // In a real implementation, you would integrate with actual video calling APIs
      window.open(classData.meetingUrl, "_blank");
      setIsCallActive(true);
      toast.success("Joining video call...");
    } else {
      toast.error("Meeting link not available");
    }

    setIsConnecting(false);
  };

  const endCall = () => {
    setIsCallActive(false);
    toast.info("Call ended");
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast.info(videoEnabled ? "Video disabled" : "Video enabled");
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toast.info(audioEnabled ? "Microphone muted" : "Microphone unmuted");
  };

  const generateMeetingDetails = () => {
    // Mock meeting details - in a real app, these would come from your backend
    const baseUrl =
      classData.type === "zoom"
        ? "https://zoom.us/j/"
        : "https://meet.google.com/";

    return {
      url:
        classData.meetingUrl ||
        `${baseUrl}${Math.random().toString(36).substr(2, 10)}`,
      id: classData.meetingId || Math.random().toString().substr(2, 10),
      password: classData.password || Math.random().toString(36).substr(2, 6),
    };
  };

  const meetingDetails = generateMeetingDetails();

  return (
    <div className="space-y-6">
      {/* Class Information */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                {classData.title}
              </CardTitle>
              <CardDescription>
                {classData.date} at {classData.time} • {classData.duration}{" "}
                minutes
              </CardDescription>
            </div>
            <Badge variant="outline" className="capitalize">
              {classData.type === "zoom" ? "Zoom" : "Google Meet"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Teacher: {classData.teacher}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{classData.duration} minutes</span>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="p-4 bg-secondary/20 rounded-lg space-y-3">
            <h4 className="font-semibold">Meeting Details</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Meeting URL:</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    {meetingDetails.url.substring(0, 30)}...
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(meetingDetails.url, "Meeting URL")
                    }
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Meeting ID:</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    {meetingDetails.id}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(meetingDetails.id, "Meeting ID")
                    }
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Password:</span>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-background px-2 py-1 rounded">
                    {meetingDetails.password}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(meetingDetails.password, "Password")
                    }
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              onClick={joinCall}
              disabled={isConnecting || isCallActive}
              className="flex-1 glow-effect"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Connecting...
                </>
              ) : isCallActive ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  In Call
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Join Call
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open(meetingDetails.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Call Controls (shown when call is active) */}
      {isCallActive && (
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Call Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={audioEnabled ? "default" : "destructive"}
                size="lg"
                onClick={toggleAudio}
                className="rounded-full w-12 h-12"
              >
                {audioEnabled ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant={videoEnabled ? "default" : "destructive"}
                size="lg"
                onClick={toggleVideo}
                className="rounded-full w-12 h-12"
              >
                {videoEnabled ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <VideoOff className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="destructive"
                size="lg"
                onClick={endCall}
                className="rounded-full w-12 h-12"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Call duration:{" "}
                {/* In a real app, you'd track actual call time */}
                <span className="font-mono">00:05:32</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Instructions */}
      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Before Your Class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Technical Requirements:</strong> Make sure you have a
              stable internet connection, a working camera and microphone, and
              the latest version of your browser.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-semibold">Quick Setup Tips:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Test your camera and microphone 5 minutes before class
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Find a quiet, well-lit space for your lesson</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Have your learning materials ready</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Join 2-3 minutes early to ensure everything works</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-3 border border-border rounded-lg">
              <h5 className="font-semibold text-sm mb-2">Need Help?</h5>
              <p className="text-xs text-muted-foreground mb-3">
                Having technical issues? Contact support for assistance.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>

            <div className="p-3 border border-border rounded-lg">
              <h5 className="font-semibold text-sm mb-2">Reschedule</h5>
              <p className="text-xs text-muted-foreground mb-3">
                Need to change your class time? Reschedule up to 24 hours in
                advance.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Reschedule Class
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Example usage component
export function VideoCallExample() {
  const mockClassData = {
    id: "class_001",
    title: "Business English Presentation Skills",
    date: "2025-01-15",
    time: "14:00",
    duration: 60,
    type: "zoom" as const,
    teacher: "Reza",
    student: "Student Name",
    meetingUrl: "https://zoom.us/j/1234567890",
    meetingId: "123 456 7890",
    password: "english123",
  };

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Join Your <span className="gradient-text">English Class</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get ready for your one-on-one lesson with Reza
          </p>
        </div>

        <VideoCall classData={mockClassData} />
      </div>
    </div>
  );
}
