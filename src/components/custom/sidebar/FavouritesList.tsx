import { useAuth } from '@/app/hooks/useAuth';
import { ExternalLink } from 'lucide-react';
import FavouriteToggleButton from '../recipe-data/FavouriteToggleButton';

/**
 * Displays user's favourite recipes (minimal grid/list) inside the sidebar.
 * Falls back to an empty state message if none.
 */
export default function FavouritesList() {
  const { profile } = useAuth();
  const favourites = profile?.favourites || [];

  if (!favourites.length) {
    return (
      <div className="mt-4 text-center text-xs text-gray-500 px-3 py-6 border border-dashed border-orange-200 rounded-lg bg-white/50">
        <p>No favourites yet.</p>
        <p className="mt-1 text-[10px] text-gray-400">Add recipes from the list to see them here.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2 max-h-[40vh] overflow-y-auto pr-1">
      {favourites.map(recipe => (
        <div key={recipe.id} className="group flex items-center gap-3 p-2 rounded-md bg-white shadow-sm border border-orange-100 hover:shadow transition">
          <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-800 line-clamp-2">{recipe.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-orange-600 hover:underline inline-flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Open
              </a>
              <FavouriteToggleButton recipe={recipe} size={16} disableTooltip className="p-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
