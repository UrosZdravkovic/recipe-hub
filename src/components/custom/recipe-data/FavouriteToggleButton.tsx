import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/app/hooks/useAuth';
import type { Recipe } from '@/features/recipes/recipeSlice';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { usePop } from '@/app/hooks/usePop';

interface Props {
  recipe: Recipe;
  size?: number;
  className?: string;
  animateOnRemove?: boolean; // default false (only animate when adding)
  disableTooltip?: boolean;
  onToggle?: (isFavourite: boolean) => void;
}

const FavouriteToggleButton: React.FC<Props> = ({
  recipe,
  size = 20,
  className = '',
  animateOnRemove = false,
  disableTooltip,
  onToggle,
}) => {
  const { profile, user, toggleFavourite } = useAuth();
  const [pending, setPending] = React.useState(false);
  const { trigger, scaleClass } = usePop({ durationMs: 300, scaleTo: 1.25 });

  const isFavourite = React.useMemo(
    () => !!profile?.favourites?.some(f => f.id === recipe.id),
    [profile?.favourites, recipe.id]
  );

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user || pending) return;
    const wasFav = isFavourite;
    try {
      setPending(true);
      await toggleFavourite({ userId: user.id, recipe });
      const nowFav = !wasFav;
      if (nowFav || animateOnRemove) trigger();
      onToggle?.(nowFav);
    } catch (err) {
      console.error('Favourite toggle failed', err);
    } finally {
      setPending(false);
    }
  }

  const button = (
    <button
      type="button"
      disabled={!user || pending}
      onClick={handleClick}
      className={`p-2 rounded-full transition relative ${!user || pending ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'} ${className}`}
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
    >
      <Heart
        size={size}
        className={[
          'transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] active:scale-90',
          scaleClass,
          isFavourite ? 'text-red-500 fill-red-500 drop-shadow-sm' : 'text-gray-400'
        ].join(' ')}
      />
      <span className="sr-only">{isFavourite ? 'Remove from favourites' : 'Add to favourites'}</span>
    </button>
  );

  if (user || disableTooltip) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">Sign in to add favourites</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavouriteToggleButton;
