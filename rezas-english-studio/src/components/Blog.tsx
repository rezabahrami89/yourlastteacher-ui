import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { blogPosts, categories, tags, type BlogPost } from '@/data/blogPosts'
import { Calendar, Clock, Search, Tag, TrendingUp, BookOpen, User } from 'lucide-react'
import { format } from 'date-fns'

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    let filtered = blogPosts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag))
    }

    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [searchTerm, selectedCategory, selectedTag])

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3)
  const recentPosts = blogPosts.slice(0, 5)

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            English Learning <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover expert tips, learning strategies, and insights to improve your English skills.
            Written by Reza, your professional English teacher.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-8 border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Find the perfect article
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles, topics, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-5">
                    {categories.map((category) => (
                      <TabsTrigger key={category} value={category} className="text-xs">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>

                {selectedTag && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Filtered by tag:</span>
                    <Badge variant="secondary" className="gap-1">
                      <Tag className="h-3 w-3" />
                      {selectedTag}
                      <button
                        onClick={() => setSelectedTag(null)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Featured Posts */}
            {selectedCategory === 'All' && !searchTerm && !selectedTag && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300 cursor-pointer">
                      <CardHeader>
                        <Badge className="w-fit bg-primary/20 text-primary border-primary/50">Featured</Badge>
                        <CardTitle className="line-clamp-2">
                          <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {post.readTime} min read
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-primary/20"
                              onClick={() => setSelectedTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Separator className="my-12" />
              </div>
            )}

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
                  <span className="text-muted-foreground ml-2">({filteredPosts.length})</span>
                </h2>
              </div>

              {filteredPosts.length === 0 ? (
                <Card className="border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="py-12 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      onTagClick={setSelectedTag}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About the Author */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  About the Author
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://ugc.same-assets.com/ai6TgITjxdHUL2Tc-yI7hupbSqTnrnp7.jpeg" />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Reza</h3>
                    <p className="text-sm text-muted-foreground">Professional English Teacher</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/80">
                  With 8+ years of teaching experience, Reza helps students master English through
                  innovative methods and personalized approaches. Specializing in IELTS preparation
                  and conversation skills.
                </p>
                <Link to="/#contact">
                  <Button size="sm" className="w-full">
                    Book a Class with Reza
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="space-y-2">
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(post.publishedAt), 'MMM d')}
                      <Clock className="h-3 w-3 ml-2" />
                      {post.readTime}m
                    </div>
                    {post !== recentPosts[recentPosts.length - 1] && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary/20"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Get Learning Tips</CardTitle>
                <CardDescription>
                  Subscribe to receive weekly English learning tips and new articles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Enter your email" type="email" />
                <Button className="w-full">Subscribe</Button>
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

interface BlogPostCardProps {
  post: BlogPost
  onTagClick: (tag: string) => void
}

function BlogPostCard({ post, onTagClick }: BlogPostCardProps) {
  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm hover:glow-effect transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{post.category}</Badge>
          {post.featured && (
            <Badge className="bg-primary/20 text-primary border-primary/50">Featured</Badge>
          )}
        </div>
        <CardTitle className="text-xl">
          <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://ugc.same-assets.com/ai6TgITjxdHUL2Tc-yI7hupbSqTnrnp7.jpeg" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} min read
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs cursor-pointer hover:bg-primary/20"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
