import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Package, Star, Clock, Globe, ChevronRight, PlayCircle, Calendar, CreditCard } from 'lucide-react'
import { BookingModal } from '@/components/BookingModal'
import { Blog } from '@/components/Blog'
import { BlogPost } from '@/components/BlogPost'
import { StudentPortal } from '@/components/StudentPortal'
import { Toaster } from '@/components/ui/sonner'

function HomePage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedClassType, setSelectedClassType] = useState<'private' | 'group' | 'offline' | null>(null)

  const openBookingModal = (classType: 'private' | 'group' | 'offline') => {
    setSelectedClassType(classType)
    setBookingModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">Reza's English Studio</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
              <a href="#methods" className="text-foreground/80 hover:text-primary transition-colors">Teaching Methods</a>
              <a href="/blog" className="text-foreground/80 hover:text-primary transition-colors">Blog</a>
              <a href="/portal" className="text-foreground/80 hover:text-primary transition-colors">Student Portal</a>
              <a href="#testimonials" className="text-foreground/80 hover:text-primary transition-colors">Testimonials</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors">Contact</a>
              <Button className="glow-effect" onClick={() => openBookingModal('private')}>Book a Class</Button>
            </div>
          </div>
        </div>
      </nav>
      <section className="pt-24 pb-16 relative">
        <div className="hero-glow absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Master English with
                <span className="gradient-text block">Reza's Expert Guidance</span>
              </h1>
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Transform your English skills with personalized lessons from a super professional teacher.
                Choose from private classes, group sessions, or comprehensive offline packages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="glow-effect text-lg px-8 py-6" onClick={() => openBookingModal('private')}>
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your First Class
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>500+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>50+ Countries</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img  
  src="/myphoto.png"  
  alt="Reza - Professional English Teacher"  
  className="rounded-full w-full max-w-lg mx-auto"  
  style={{  
    boxShadow: "0 0 30px 5px rgba(147, 112, 219, 0.8)",
    borderRadius: "50%"
  }}  
/>
                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 glow-effect">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Available for classes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">About Reza</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              A dedicated English educator with years of experience in transforming students' language skills
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Professional Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Master's degree in English Literature with specialized training in ESL teaching methodologies.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Teaching Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Over 8 years of experience teaching students from beginner to advanced levels across all age groups.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Global Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Successfully taught students from 50+ countries with customized approaches for different learning styles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="methods" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Three flexible options designed to match your schedule, budget, and learning preferences
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Private Classes */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMethod('private')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary/20 text-primary border-primary/50">Most Popular</Badge>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Private Classes</CardTitle>
                <CardDescription>One-on-one personalized English lessons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">$45<span className="text-lg font-normal text-foreground/60">/hour</span></div>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Customized curriculum for your goals
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Flexible scheduling
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Real-time feedback and correction
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Focus on speaking confidence
                  </li>
                </ul>
                <Button className="w-full glow-effect" onClick={() => openBookingModal('private')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Private Class
                </Button>
              </CardContent>
            </Card>

            {/* Group Classes */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMethod('group')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/50 text-primary">Great Value</Badge>
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Group Classes</CardTitle>
                <CardDescription>Small group sessions (3-5 students)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">$20<span className="text-lg font-normal text-foreground/60">/hour</span></div>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Interactive group discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Learn from peer interactions
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Structured lesson plans
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Cost-effective learning
                  </li>
                </ul>
                <Button className="w-full glow-effect" onClick={() => openBookingModal('group')}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Join Group Class
                </Button>
              </CardContent>
            </Card>

            {/* Offline Packages */}
            <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedMethod('offline')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-primary/50 text-primary">Self-Paced</Badge>
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Offline Packages</CardTitle>
                <CardDescription>Comprehensive self-study materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">$199<span className="text-lg font-normal text-foreground/60">/package</span></div>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Downloadable course materials
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Audio exercises and examples
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Progress tracking worksheets
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    Lifetime access
                  </li>
                </ul>
                <Button className="w-full glow-effect" onClick={() => openBookingModal('offline')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Purchase Package
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Hear from students who have transformed their English skills with Reza's guidance
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">SA</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Ahmed</CardTitle>
                    <CardDescription>Business Professional</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={`sarah-star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80">
                  "Reza's teaching method is exceptional. In just 3 months, my confidence in speaking English improved dramatically. Highly recommended!"
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">MK</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Mohammad Khan</CardTitle>
                    <CardDescription>University Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={`mohammad-star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80">
                  "The offline package was perfect for my busy schedule. Comprehensive materials and clear explanations helped me ace my IELTS exam."
                </p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">LR</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Lisa Rodriguez</CardTitle>
                    <CardDescription>Marketing Manager</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={`lisa-star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80">
                  "Group classes were amazing! Learning with others made it fun and engaging. Reza creates such a supportive learning environment."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="contact" className="py-16 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your English Journey?</h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Contact me today to discuss your learning goals and find the perfect program for you
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <Button size="lg" className="glow-effect text-lg px-8 py-6" onClick={() => openBookingModal('private')}>
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Globe className="mr-2 h-5 w-5" />
              View All Programs
            </Button>
          </div>
          <div className="mt-12 text-center text-foreground/60">
            <p>📧 reza@englishstudio.com | 📱 +1 (555) 123-4567 | 🌐 Available worldwide via online classes</p>
          </div>
        </div>
      </section>
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center text-foreground/60">
            <p>&copy; 2025 Reza's English Studio. All rights reserved. Transform your English, transform your future.</p>
          </div>
        </div>
      </footer>
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        classType={selectedClassType}
      />
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/portal" element={<StudentPortal />} />
      </Routes>
    </div>
  )
}

export default App
