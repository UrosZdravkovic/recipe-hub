import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
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
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <RecipeListCardItem recipe={recipe} />
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] overflow-y-auto ml-auto rounded-l-2xl p-8 bg-white shadow-2xl">
        <VisuallyHidden>
          <DrawerTitle>Recipe Details</DrawerTitle>
          <DrawerDescription>
            More information about {capitalize(recipe.title)}.
          </DrawerDescription>
        </VisuallyHidden>
        <RecipeCardDrawerItem recipe={recipe} />
      </DrawerContent>
    </Drawer>
  );
}