import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { prisma } from '@/lib/prisma';

const getBlogPosts = async () => {
  try {
    const blogPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 3,
    });
    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
export async function BlogSection() {
  const blogPosts = await getBlogPosts();
  return (
    <section id="blog" className="py-24 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-primary">
            Insights & Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing my thoughts on web development, technical leadership, 
            and the evolving landscape of technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group border-border hover:border-teal-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-teal-primary bg-teal-primary/10 px-2 py-1 rounded">
                    {post.tags[0]}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.createdAt.toDateString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-teal-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {/* {post.readTime} */} 10 min
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-primary hover:text-teal-secondary hover:bg-teal-primary/10 p-0 h-auto group/btn"
                    asChild
                  >
                    <a href={`/blog/${post.slug}`}>
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-teal-primary text-teal-primary hover:bg-teal-primary hover:text-black"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}