import React, { useState } from 'react';
import { Article, PageView } from '../types';
import { Breadcrumb } from '../components/Breadcrumb';
import { Search, Clock, FileText, ArrowRight, User } from 'lucide-react';

interface ResourcesPageProps {
  articles: Article[];
  onNavigate: (view: PageView, params?: any) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ articles, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesList = ['All', 'Islamic Finance', 'Family & Marriage', 'Spiritual Guidance', 'Fiqh', 'Hadith'];

  const filteredArticles = articles.filter(a => {
    const matchesSearch = searchQuery === '' || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 pb-20">
      <Breadcrumb items={[{ label: 'Resources & Articles' }]} onNavigate={onNavigate} />

      {/* Page Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
            Educational Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading">
            Islamic Articles & Guidance
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Read authenticated articles, contemporary legal responses, and practical guides written by verified scholars.
          </p>
        </div>
      </div>

      {/* Featured Article Banner */}
      {featuredArticle && (
        <div
          onClick={() => onNavigate('article-detail', { articleId: featuredArticle.id })}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft-md hover:shadow-soft-lg transition-all cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
        >
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              Featured Insight
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 group-hover:text-blue-700 transition-colors">
              {featuredArticle.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">By {featuredArticle.author.name}</span>
              <span>• {featuredArticle.readTime}</span>
              <span>• {featuredArticle.publishedAt}</span>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-video rounded-2xl overflow-hidden bg-slate-900">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      )}

      {/* Search & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-400 font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onNavigate('article-detail', { articleId: art.id })}
            className="bg-white rounded-3xl border border-slate-200 shadow-soft-sm hover:shadow-soft-md transition-all overflow-hidden cursor-pointer flex flex-col justify-between group"
          >
            <div className="aspect-video overflow-hidden bg-slate-900">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {art.category}
                </span>
                <h3 className="text-base font-bold font-heading text-slate-900 mt-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{art.author.name}</span>
                <span>{art.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
