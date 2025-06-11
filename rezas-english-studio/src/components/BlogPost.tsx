import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { blogPosts } from '@/data/blogPosts'
import {
  Calendar, Clock, ArrowLeft, Share2, BookOpen,
  User, ChevronLeft, ChevronRight, Tag
} from 'lucide-react'
import { format } from 'date-fns'
import { useEffect } from 'react'

export function BlogPost() {
  const { id } = useParams()
  const navigate = useNavigate()

  const post = blogPosts.find(p => p.id === id)

  useEffect(() => {
    if (!post) {
      navigate('/blog')
    }
  }, [post, navigate])

  if (!post) {
    return null
  }

  const currentIndex = blogPosts.findIndex(p => p.id === id)
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null
  const relatedPosts = blogPosts
    .filter(p => p.id !== id && (
      p.category === post.category ||
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3)

  // Format content for display - simple approach without HTML injection
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mb-6 mt-8 first:mt-0">{line.slice(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mb-4 mt-6">{line.slice(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold mb-3 mt-5">{line.slice(4)}</h3>
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-semibold mb-2">{line.slice(2, -2)}</p>
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="mb-1 ml-6 list-disc">{line.slice(2)}</li>
        }
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>
      })
  }

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{post.category}</Badge>
              {post.featured && (
                <Badge className="bg-primary/20 text-primary border-primary/50">Featured</Badge>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://ugc.same-assets.com/ai6TgITjxdHUL2Tc-yI7hupbSqTnrnp7.jpeg" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} min read
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={sharePost}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} to={`/blog?tag=${tag}`}>
                  <Badge variant="outline" className="hover:bg-primary/20 cursor-pointer">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </header>

          <Separator />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6 text-foreground">
              {formatContent(post.content)}
            </div>
          </div>

          <Separator />

          {/* Author Bio */}
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                About the Author
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://ugc.same-assets.com/ai6TgITjxdHUL2Tc-yI7hupbSqTnrnp7.jpeg" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">Reza</h3>
                  <p className="text-muted-foreground">Professional English Teacher</p>
                </div>
              </div>
              <p className="text-foreground/80">
                Reza is a professional English teacher with over 8 years of experience helping students
                master the English language. He specializes in IELTS preparation, conversation skills,
                and innovative teaching methodologies. Reza has helped over 500 students from 50+ countries
                achieve their English learning goals.
              </p>
              <Link to="/#contact">
                <Button className="glow-effect">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Book a Class with Reza
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="grid md:grid-cols-2 gap-4">
            {previousPost && (
              <Link to={`/blog/${previousPost.id}`}>
                <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <ChevronLeft className="h-5 w-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Previous Article</span>
                    </div>
                    <h3 className="font-semibold line-clamp-2">{previousPost.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            )}

            {nextPost && (
              <Link to={`/blog/${nextPost.id}`}>
                <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-end gap-3 mb-3">
                      <span className="text-sm text-muted-foreground">Next Article</span>
                      <ChevronRight className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-right line-clamp-2">{nextPost.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                    <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer h-full">
                      <CardHeader>
                        <Badge variant="outline" className="w-fit">{relatedPost.category}</Badge>
                        <CardTitle className="text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(relatedPost.publishedAt), 'MMM d')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {relatedPost.readTime}m
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <Card className="border-border bg-primary/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Improve Your English?</h3>
              <p className="text-muted-foreground">
                Get personalized English lessons with Reza and accelerate your learning journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact">
                  <Button size="lg" className="glow-effect">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Book a Free Consultation
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button size="lg" variant="outline">
                    Read More Articles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  )
}
