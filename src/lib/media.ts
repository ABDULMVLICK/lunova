import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Vérifie si un fichier existe dans /public/ — utile pour faire un fallback
 * propre tant que les vrais visuels ne sont pas encore déposés.
 *
 * Server-only : ne JAMAIS importer depuis un Client Component.
 *
 * @param publicPath chemin commençant par "/" (ex: "/product/lunova-1.jpg")
 */
export async function publicFileExists(publicPath: string): Promise<boolean> {
  if (!publicPath.startsWith("/")) return false;
  try {
    await fs.access(path.join(process.cwd(), "public", publicPath));
    return true;
  } catch {
    return false;
  }
}

/**
 * Filtre une liste d'images en ne gardant que celles qui existent réellement
 * dans /public/. Utilisé pour la galerie PDP — pas d'images cassées.
 */
export async function filterExistingImages<T extends { src: string }>(
  items: readonly T[]
): Promise<T[]> {
  const checks = await Promise.all(items.map((i) => publicFileExists(i.src)));
  return items.filter((_, i) => checks[i]);
}
