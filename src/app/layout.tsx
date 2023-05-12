"use client";
import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ugo le petit loulou",
  description: "Ugo le petit loulou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ean, setEan] = useState(""); // Ajouter un état pour stocker la valeur de l'input

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Construire l'URL de l'API avec la valeur de l'input
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${ean}.json?fields=product_name,nutriments,ingredients_text,image_front_url,nutriscore_grade,allergens_from_ingredients,additives_original_tags`;
    console.log(apiUrl);
    // Effectuer une demande avec fetch ou axios
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Faire quelque chose avec les données de l'API
        console.log(data.product);
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(error);
      });
    router.push(`./product/${ean}`);
  };

  return (
    <html lang="fr">
      <body className={inter.className}>
        <nav className="navbar px-5 shadow-lg fs-4">
          <a href="../">Ughome</a>
          <div className="col-4">
            <form
              className="input-group me-5"
              role="search"
              onSubmit={handleSubmit}
              // Ajouter la fonction de gestion de soumission
            >
              <input
                type="search"
                id="searchInput"
                className="col-6 form-control "
                placeholder="Numéro de code-barre"
                aria-label="Barre de recherche"
                aria-describedby="button-addon2"
                name="ean"
                value={ean} // Ajouter la valeur de l'état à l'input
                onChange={(event) => setEan(event.target.value)}
                // Mettre à jour l'état lorsque l'input change
              />
              <button className="btn col-2 " type="submit" id="button-addon3">
                Rechercher
              </button>
            </form>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
