import { useState } from 'react';
import { useSupabaseCMS, BlogPost } from '../../contexts/SupabaseCMSContext';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Calendar,
  Clock,
  Tag,
  Save,
  X
} from 'lucide-react';

const categories = [
  'Psihologie',
  'Sănătate Mintală',
  'Dezvoltare Personală',
  'Relații',
  'Anxietate',
  'Depresie',
  'Stres',
  'Mindfulness'
];

export function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, isLoading } = useSupabaseCMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({});

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(t => t.trim()).filter(Boolean);
    setEditForm({ ...editForm, tags });
  };

  // Filter posts based on search
  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setEditForm(post);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      featuredImage: '',
      tags: [],
      published: false
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editForm.title || !editForm.content) {
      toast.error('Title and content are required');
      return;
    }

    setIsSaving(true);
    try {
      if (isCreating) {
        await addBlogPost({
          title: editForm.title,
          slug: editForm.slug || editForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
          excerpt: editForm.excerpt || '',
          content: editForm.content,
          featuredImage: editForm.featuredImage,
          category: editForm.category,
          tags: editForm.tags || [],
          published: editForm.published || false,
          publishedAt: editForm.published ? new Date().toISOString() : undefined
        });
        toast.success('Blog post created successfully!');
        setIsCreating(false);
      } else if (selectedPost) {
        await updateBlogPost(selectedPost.id, editForm);
        toast.success('Blog post updated successfully!');
        setIsEditing(false);
      }
      setEditForm({});
      setSelectedPost(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save blog post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      await deleteBlogPost(postId);
      toast.success('Blog post deleted successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete blog post');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      await updateBlogPost(post.id, {
        published: !post.published,
        publishedAt: !post.published ? new Date().toISOString() : undefined
      });
      toast.success(post.published ? 'Post unpublished' : 'Post published');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#a594f9] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium text-[#e8e6f7]">Blog Management</h1>
          <p className="text-[#b8b4d1]">Create and manage your blog posts</p>
        </div>
        
        <Button 
          onClick={handleCreate}
          className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-[#242444] border-[#a594f9]/20 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b8b4d1] w-4 h-4" />
          <Input
            placeholder="Search posts by title, category, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
          />
        </div>
      </Card>

      {/* Posts Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="bg-[#242444] border-[#a594f9]/20 overflow-hidden">
            <div className="h-48 bg-[#2d2d50] overflow-hidden">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Badge 
                  variant="secondary" 
                  className="bg-[#a594f9]/10 text-[#a594f9]"
                >
                  {post.category}
                </Badge>
                <Badge 
                  variant={post.published ? "default" : "secondary"}
                  className={post.published ? "bg-[#9db098] text-[#1a1a2e]" : "bg-[#f87171]/10 text-[#f87171]"}
                >
                  {post.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
              
              <h3 className="font-medium text-[#e8e6f7] line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-[#b8b4d1] line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-[#9db098]">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-[#2d2d50] text-xs text-[#c4b5fd] rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2 py-1 bg-[#2d2d50] text-xs text-[#b8b4d1] rounded">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(post)}
                  className="text-[#a594f9] hover:text-[#c4b5fd] hover:bg-[#a594f9]/10"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(post.id)}
                  className="text-[#f87171] hover:text-[#fca5a5] hover:bg-[#f87171]/10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-[#9db098] hover:text-[#b8e6b8] hover:bg-[#9db098]/10"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditing || isCreating} onOpenChange={() => {
        setIsEditing(false);
        setIsCreating(false);
        setEditForm({});
        setSelectedPost(null);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#242444] border-[#a594f9]/20">
          <DialogHeader>
            <DialogTitle className="text-[#e8e6f7]">
              {isCreating ? 'Create New Post' : 'Edit Post'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[#e8e6f7]">Title *</Label>
                <Input
                  id="title"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="Enter post title..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#e8e6f7]">Category *</Label>
                <select
                  id="category"
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2d2d50] border border-[#a594f9]/20 rounded-md text-[#e8e6f7] focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
                >
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="readTime" className="text-[#e8e6f7]">Read Time</Label>
                <Input
                  id="readTime"
                  value={editForm.readTime || ''}
                  onChange={(e) => setEditForm({ ...editForm, readTime: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="5 min citire"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[#e8e6f7]">Date</Label>
                <Input
                  id="date"
                  value={editForm.date || ''}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                  placeholder="8 Martie 2025"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="published" className="text-[#e8e6f7]">Published</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="published"
                    checked={editForm.published || false}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, published: checked })}
                  />
                  <span className="text-sm text-[#b8b4d1]">
                    {editForm.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image" className="text-[#e8e6f7]">Image URL</Label>
              <Input
                id="image"
                value={editForm.image || ''}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-[#e8e6f7]">Tags</Label>
              <Input
                id="tags"
                value={editForm.tags?.join(', ') || ''}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="anxietate, schimbare, adaptare (separate with commas)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-[#e8e6f7]">Excerpt *</Label>
              <Textarea
                id="excerpt"
                value={editForm.excerpt || ''}
                onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                rows={3}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="Brief description of the post..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="text-[#e8e6f7]">Content *</Label>
              <Textarea
                id="content"
                value={editForm.content || ''}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={12}
                className="bg-[#2d2d50] border-[#a594f9]/20 text-[#e8e6f7]"
                placeholder="Write your blog post content here..."
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave}
                className="bg-[#a594f9] hover:bg-[#8b7fe6] text-[#1a1a2e]"
              >
                <Save className="w-4 h-4 mr-2" />
                {isCreating ? 'Create Post' : 'Save Changes'}
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setIsCreating(false);
                  setEditForm({});
                  setSelectedPost(null);
                }}
                className="text-[#b8b4d1] hover:text-[#e8e6f7]"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}