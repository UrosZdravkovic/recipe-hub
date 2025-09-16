import { Heart, UserRound } from "lucide-react";

type ProfileControlsProps = {
  onShowFavorites?: () => void;
  favouritesCount?: number;
};

export default function ProfileControls({
  onShowFavorites,
  favouritesCount = 0,
}: ProfileControlsProps) {
  return (
    <div className="sticky top-0 z-10 bg-orange-50 pt-1 pb-3 mb-3 border-b border-orange-100">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-white shadow-sm border border-orange-100 flex items-center justify-center text-orange-600">
            <UserRound size={18} />
          </div>
          <span className="text-sm font-medium text-gray-700">Account username</span>
        </div>

        <button
          type="button"
          onClick={onShowFavorites}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition"
          aria-label="Show favourites"
        >
          <Heart size={16} className="text-orange-600" />
          <span className="text-sm">Favourites</span>
          {favouritesCount > 0 && (
            <span className="ml-1 text-xs rounded-full bg-orange-100 text-orange-700 px-1.5 py-0.5">
              {favouritesCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}