import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose } from "@/components/ui/drawer";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { Recipe } from "@/features/recipes/recipeSlice";
import RecipeListCardItem from './RecipeListCardItem';
import RecipeCardDrawerItem from "./RecipeCardDrawerItem";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {

  // Strip HTML tags for preview (optional, if instructions are HTML)



  return (
    <Drawer  direction="right">
      <DrawerTrigger asChild>
        <RecipeListCardItem recipe={recipe} />
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] overflow-y-auto overflow-x-hidden ml-auto rounded-l-2xl p-8 bg-white shadow-2xl max-[400px]:rounded-none">
        <VisuallyHidden>
          <DrawerTitle>Recipe Details</DrawerTitle>
          <DrawerDescription>
            More information about {capitalize(recipe.title)}.
          </DrawerDescription>
        </VisuallyHidden>
  <div className="hidden max-[400px]:flex justify-end mb-2">
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 active:scale-95 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
        </div>
        <RecipeCardDrawerItem recipe={recipe} />
      </DrawerContent>
    </Drawer>
  );
}