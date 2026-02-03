import { useEffect, useState } from 'react';
import { useNewCMS } from '../../../contexts/NewCMSContext';
import {  Plus, Edit, Trash2, Eye, EyeOff, Save, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function BlogEditor() {
  const { blogPosts, loadBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useNewCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: '5 min citire',
    title: '',
    excerpt: '',
    category: 'Anxietate',
    image: '',
    author: 'Molnar Timea Noemi',
    tags: [] as string[],
    content: '',
    published: false
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const handleCreate = () => {
    setIsEditing(true);
    setEditingPost(null);
    setFormData({
      date: new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: '5 min citire',
      title: '',
      excerpt: '',
      category: 'Anxietate',
      image: '',
      author: 'Molnar Timea Noemi',
      tags: [],
      content: '',
      published: false
    });
  };

  const handleEdit = (post: any) => {
    setIsEditing(true);
    setEditingPost(post);
    setFormData({
      date: post.date,
      readTime: post.readTime,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      image: post.image,
      author: post.author,
      tags: post.tags || [],
      content: post.content,
      published: post.published
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast.error('Te rugăm completează toate câmpurile obligatorii');
      return;
    }

    try {
      if (editingPost) {
        await updateBlogPost(editingPost.id, formData);
        toast.success('Articol actualizat cu succes!');
      } else {
        await addBlogPost(formData);
        toast.success('Articol creat cu succes!');
      }
      setIsEditing(false);
      setEditingPost(null);
    } catch (error) {
      toast.error('Eroare la salvarea articolului');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Ești sigur că vrei să ștergi acest articol?')) {
      try {
        await deleteBlogPost(id);
        toast.success('Articol șters cu succes!');
      } catch (error) {
        toast.error('Eroare la ștergerea articolului');
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#e8e6f7]">
            {editingPost ? 'Editează Articol' : 'Articol Nou'}
          </h1>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-[#b8b4d1] hover:text-[#e8e6f7] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Titlu *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              placeholder="Titlul articolului..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Extras *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              placeholder="Scurt rezumat al articolului..."
            />
          </div>

          {/* Category & Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Categorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              >
                <option value="Anxietate">Anxietate</option>
                <option value="Depresie">Depresie</option>
                <option value="Relații">Relații</option>
                <option value="Dezvoltare Personală">Dezvoltare Personală</option>
                <option value="Parenting">Parenting</option>
                <option value="Adolescență">Adolescență</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
                Timp citire
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
                placeholder="ex: 5 min citire"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              URL Imagine
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Tag-uri
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9]"
                placeholder="Adaugă tag..."
              />
              <button
                onClick={handleAddTag}
                className="px-4 py-2.5 bg-[#a594f9]/20 border border-[#a594f9]/30 text-[#a594f9] rounded-lg hover:bg-[#a594f9]/30 transition-all"
              >
                Adaugă
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#a594f9]/20 border border-[#a594f9]/30 text-[#a594f9] rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-400">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-[#e8e6f7] mb-2">
              Conținut *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-2.5 bg-[#1a1a2e] border border-[#a594f9]/30 rounded-lg text-[#e8e6f7] placeholder-[#b8b4d1]/50 focus:outline-none focus:ring-2 focus:ring-[#a594f9] font-mono text-sm"
              placeholder="Conținutul complet al articolului..."
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3 p-4 bg-[#1a1a2e]/50 rounded-lg">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 rounded border-[#a594f9]/30 text-[#a594f9] focus:ring-[#a594f9]"
            />
            <label htmlFor="published" className="text-[#e8e6f7] font-medium">
              Publică articolul
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#a594f9]/20">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-6 py-3 bg-[#1a1a2e] border border-[#a594f9]/30 text-[#e8e6f7] rounded-lg hover:bg-[#242444] transition-all"
            >
              Anulează
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#a594f9] to-[#9b86f5] text-white rounded-lg hover:from-[#9b86f5] hover:to-[#8f78f0] transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Salvează
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#e8e6f7] mb-2">
            Gestionare Blog
          </h1>
          <p className="text-[#b8b4d1]">
            Creează și gestionează articolele de blog
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-[#a594f9] to-[#9b86f5] text-white rounded-lg hover:from-[#9b86f5] hover:to-[#8f78f0] transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Articol Nou
        </button>
      </div>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-6 hover:shadow-lg hover:shadow-[#a594f9]/10 transition-all"
          >
            <div className="flex gap-4">
              {post.image && (
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-[#1a1a2e]">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#e8e6f7] mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[#b8b4d1] text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-[#b8b4d1]">
                      <span className={`px-3 py-1 rounded-full ${
                        post.published
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {post.published ? 'Publicat' : 'Ciornă'}
                      </span>
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 text-[#a594f9] hover:bg-[#a594f9]/10 rounded-lg transition-all"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogPosts.length === 0 && (
        <div className="bg-[#242444] border border-[#a594f9]/20 rounded-xl p-12 text-center">
          <ImageIcon className="mx-auto text-[#b8b4d1] mb-4" size={48} />
          <h3 className="text-xl font-semibold text-[#e8e6f7] mb-2">
            Nu există articole încă
          </h3>
          <p className="text-[#b8b4d1] mb-6">
            Creează primul tău articol de blog pentru a începe.
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-gradient-to-r from-[#a594f9] to-[#9b86f5] text-white rounded-lg hover:from-[#9b86f5] hover:to-[#8f78f0] transition-all inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Articol Nou
          </button>
        </div>
      )}
    </div>
  );
}
