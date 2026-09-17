import React from 'react';
import { Article, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (view: PageView, params?: any) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ article, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb
        items={[
          { label: 'Resources', view: 'resources' },
          { label: article.title }
        ]}
        onNavigate={onNavigate}
      />

      {/* Article Header */}
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          {article.category}
        </span>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center justify-between border-y border-slate-200 py-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <span className="font-bold text-slate-900 block">{article.author.name}</span>
              <span className="text-[11px] text-amber-800">{article.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span>{article.publishedAt}</span>
            <span>• {article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article Main Image */}
      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-200">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft-sm prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
        <div className="whitespace-pre-line">
          {article.content}
        </div>

        {/* Tags list */}
        <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap not-prose">
          <span className="text-xs font-bold text-slate-400">Tags:</span>
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
