import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface InfiniteScrollItem {
  id: string;
  content: React.ReactNode;
}

interface AccessibleInfiniteScrollProps {
  items: InfiniteScrollItem[];
  loadMore: () => Promise<InfiniteScrollItem[]>;
  hasMore: boolean;
  isLoading: boolean;
  error?: string | null;
  className?: string;
  itemsPerPage?: number;
  loadMoreThreshold?: number;
  ariaLabel?: string;
}

export const AccessibleInfiniteScroll: React.FC<AccessibleInfiniteScrollProps> = ({
  items,
  loadMore,
  hasMore,
  isLoading,
  error,
  className = '',
  itemsPerPage = 10,
  loadMoreThreshold = 200,
  ariaLabel = 'Content list'
}) => {
  const { t } = useTranslation();
  const [displayedItems, setDisplayedItems] = useState<InfiniteScrollItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isManualLoad, setIsManualLoad] = useState(false);
  const [announceText, setAnnounceText] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Initialize displayed items
  useEffect(() => {
    const initialItems = items.slice(0, itemsPerPage);
    setDisplayedItems(initialItems);
  }, [items, itemsPerPage]);

  // Intersection Observer for automatic loading
  const lastItemRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isManualLoad) {
          handleLoadMore();
        }
      },
      {
        rootMargin: `${loadMoreThreshold}px`,
      }
    );
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, isManualLoad, loadMoreThreshold]);

  // Load more items
  const handleLoadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    try {
      const newItems = await loadMore();
      const nextPage = currentPage + 1;
      const newDisplayedItems = items.slice(0, nextPage * itemsPerPage);
      
      setDisplayedItems(newDisplayedItems);
      setCurrentPage(nextPage);
      
      // Announce to screen readers
      setAnnounceText(
        t.loadedMoreItems || `Loaded ${newItems.length} more items. Total: ${newDisplayedItems.length} items.`
      );
      
      // Clear announcement after a delay
      setTimeout(() => setAnnounceText(''), 1000);
    } catch (err) {
      console.error('Failed to load more items:', err);
    }
  }, [isLoading, hasMore, loadMore, currentPage, itemsPerPage, items, t.loadedMoreItems]);

  // Manual load more button
  const handleManualLoadMore = () => {
    setIsManualLoad(true);
    handleLoadMore();
    setTimeout(() => setIsManualLoad(false), 1000);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'End' && hasMore) {
      e.preventDefault();
      loadMoreRef.current?.focus();
    }
  };

  // Retry on error
  const handleRetry = () => {
    handleLoadMore();
  };

  return (
    <div className={`${className}`} onKeyDown={handleKeyDown}>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announceText}
      </div>

      {/* Content container */}
      <div
        ref={containerRef}
        role="feed"
        aria-label={ariaLabel}
        aria-busy={isLoading}
        className="space-y-4"
      >
        {displayedItems.map((item, index) => (
          <div
            key={item.id}
            ref={index === displayedItems.length - 1 ? lastItemRef : undefined}
            role="article"
            aria-posinset={index + 1}
            aria-setsize={hasMore ? -1 : displayedItems.length}
            className="focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg"
            tabIndex={-1}
          >
            {item.content}
          </div>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-8" role="status" aria-label={t.loading || 'Loading more content'}>
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-blue-400 mr-2" />
          <span className="text-gray-600 dark:text-gray-400">{t.loadingMore || 'Loading more content...'}</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-center py-8 text-red-600 dark:text-red-400" role="alert">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="mr-4">{error}</span>
          <button
            onClick={handleRetry}
            className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4 inline mr-1" />
            {t.retry || 'Retry'}
          </button>
        </div>
      )}

      {/* Manual load more button */}
      {hasMore && !isLoading && !error && (
        <div className="flex justify-center py-8">
          <button
            ref={loadMoreRef}
            onClick={handleManualLoadMore}
            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
            aria-describedby="load-more-description"
          >
            {t.loadMore || 'Load More'}
          </button>
          <div id="load-more-description" className="sr-only">
            {t.loadMoreDescription || 'Load more items to continue browsing'}
          </div>
        </div>
      )}

      {/* End of content message */}
      {!hasMore && displayedItems.length > 0 && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400" role="status">
          {t.endOfContent || 'You have reached the end of the content.'}
        </div>
      )}

      {/* Skip to top button */}
      <button
        onClick={() => containerRef.current?.scrollIntoView({ behavior: 'smooth' })}
        className="sr-only focus:not-sr-only focus:fixed focus:bottom-4 focus:right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-10 hover:bg-blue-700 transition-colors"
        aria-label={t.skipToTop || 'Skip to top of content'}
      >
        ↑
      </button>
    </div>
  );
};