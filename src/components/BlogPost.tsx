import { ArrowLeft, Calendar, Clock, User, Share2, Heart, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Newsletter } from './Newsletter';

interface BlogPostProps {
  post: {
    id: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    author: string;
    tags: string[];
  };
  onBack: () => void;
  onSelectPost?: (postId: string) => void;
}

export function BlogPost({ post, onBack, onSelectPost }: BlogPostProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Anxietate": return "bg-[#f87171]/20 text-[#f87171] border border-[#f87171]/30";
      case "Relații": return "bg-[#c4b5fd]/20 text-[#c4b5fd] border border-[#c4b5fd]/30";
      case "Mindfulness": return "bg-[#9db098]/20 text-[#9db098] border border-[#9db098]/30";
      case "Dezvoltare Personală": return "bg-[#a594f9]/20 text-[#a594f9] border border-[#a594f9]/30";
      case "Comunicare": return "bg-[#b8e6b8]/20 text-[#b8e6b8] border border-[#b8e6b8]/30";
      case "Sănătate Mentală": return "bg-[#d4a5f9]/20 text-[#d4a5f9] border border-[#d4a5f9]/30";
      default: return "bg-[#b8b4d1]/20 text-[#b8b4d1] border border-[#b8b4d1]/30";
    }
  };

  const getRelatedPosts = (currentPostId: string) => {
    const allPosts = [
      { id: "anxietate-schimbari", title: "Cum să gestionezi anxietatea în timpul schimbărilor majore din viață", category: "Anxietate", readTime: "5 min citire" },
      { id: "granite-relatii", title: "Importanța stabilirii granițelor sănătoase în relații", category: "Relații", readTime: "7 min citire" },
      { id: "mindfulness-digital", title: "Mindfulness în era digitală: găsirea echilibrului", category: "Mindfulness", readTime: "6 min citire" },
      { id: "perfectionism-toxic", title: "Depășirea perfecționismului: când standardele înalte devin toxice", category: "Dezvoltare Personală", readTime: "8 min citire" },
      { id: "comunicare-asertiva", title: "Comunicarea asertivă: cum să îți exprimi nevoile fără conflict", category: "Comunicare", readTime: "4 min citire" },
      { id: "somn-sanatate-mentala", title: "Rolul somnului în sănătatea mentală", category: "Sănătate Mentală", readTime: "6 min citire" }
    ];
    
    return allPosts.filter(p => p.id !== currentPostId).slice(0, 3);
  };

  const relatedPosts = getRelatedPosts(post.id);

  return (
    <article className="py-16 sm:py-20 bg-[#1a1a2e] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#b8b4d1] hover:text-[#a594f9] transition-colors group mb-8"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Înapoi la Blog</span>
        </button>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-[#9db098] text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#e8e6f7] mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-[#b8b4d1] leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Featured Image */}
          <div className="w-full h-64 sm:h-80 lg:h-96 bg-[#2d2d50] rounded-2xl overflow-hidden mb-8 border border-[#a594f9]/20">
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-[#e8e6f7] leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-[#a594f9]/20">
          <h3 className="text-[#a594f9] font-medium mb-4">Etichete:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#2d2d50] border border-[#a594f9]/20 rounded-full text-sm text-[#b8b4d1] hover:border-[#a594f9]/40 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Social Actions */}
        <div className="mt-8 pt-8 border-t border-[#a594f9]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[#9db098] hover:text-[#b8e6b8] transition-colors">
                <Heart size={20} />
                <span className="text-sm">32 aprecieri</span>
              </button>
              <button className="flex items-center gap-2 text-[#9db098] hover:text-[#b8e6b8] transition-colors">
                <MessageCircle size={20} />
                <span className="text-sm">8 comentarii</span>
              </button>
            </div>
            <button className="flex items-center gap-2 text-[#a594f9] hover:text-[#c4b5fd] transition-colors">
              <Share2 size={20} />
              <span className="text-sm">Distribuie</span>
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-[#242444] border border-[#a594f9]/20 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#a594f9] to-[#c4b5fd] rounded-full flex items-center justify-center">
              <span className="text-[#1a1a2e] font-medium text-lg">MT</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[#e8e6f7] font-medium mb-2">Molnar Timea Noemi</h4>
              <p className="text-[#b8b4d1] text-sm leading-relaxed">
                Consilier de dezvoltare personală și consilier vocațional cu experiență în lucrul cu persoane care se confruntă cu anxietatea, stresul și provocările vieții cotidiene.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-xl font-medium text-[#a594f9] mb-8">Articole Similare</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <div
                key={index}
                onClick={() => onSelectPost?.(relatedPost.id)}
                className="bg-[#242444] border border-[#a594f9]/20 rounded-2xl p-6 hover:border-[#a594f9]/40 transition-all duration-300 cursor-pointer group"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedPost.category)}`}>
                  {relatedPost.category}
                </span>
                <h4 className="text-[#e8e6f7] font-medium mt-4 mb-2 group-hover:text-[#a594f9] transition-colors">
                  {relatedPost.title}
                </h4>
                <p className="text-[#9db098] text-sm">{relatedPost.readTime}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Newsletter 
          title="Rămâi la curent cu noi articole"
          description="Abonează-te la newsletter-ul nostru pentru a primi noi articole despre sănătatea mentală direct în inbox."
          className="mt-16"
        />
      </div>
    </article>
  );
}