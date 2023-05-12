"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export function Photo({ src }) {
  return (
    <div>
      <Image
        className="img-fluid"
        src={src}
        alt="Photo du produit"
        width={300}
        height={0}
        loading="lazy"
      />
    </div>
  );
}

export default function Product({ params: { ean } }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${ean}.json?fields=product_name,nutriments,ingredients_text,image_front_url,nutriscore_grade,allergens_from_ingredients,additives_original_tags`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ean]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="my-5">
      <div className="row mx-2">
        <div className="col-lg-6">
          <div className="produit text-center rounded-5">
            <Photo
              id="img_prod"
              className="img-fluid"
              className={styles.produit}
              src={product ? `${product.image_front_url}` : ""}
              alt="Photo du produit"
              width={300}
              height={0}
            />
          </div>
        </div>
        <div className="col-lg-6 r">
          <h2 className="fs-2 pb-2" id="nomproduit">
            {product.product_name}
          </h2>
          <table className="table mb-4">
            <thead>
              <tr>
                <th className="tablename" scope="col" colspan="3">
                  Valeurs nutritionnelles pour 100g/100ml
                </th>
              </tr>
            </thead>
            <tbody>
              <tr id="energie">
                <th>Energie</th>
                <td className="quantité">
                  {product.nutriments["energy-kcal_100g"]}
                </td>
                <td className="unité">kj/kcal</td>
              </tr>
              <tr id="fat">
                <th scope="row">Matières grasses</th>
                <td className="quantité">{product.nutriments.fat_100g}</td>
                <td className="unité">g</td>
              </tr>
              <tr id="gras">
                <th>&nbsp;dont acide gras saturés</th>
                <td className="quantité">
                  {product.nutriments["saturated-fat_100g"]}
                </td>
                <td className="unité">g</td>
              </tr>
              <tr id="glucides">
                <th scope="row">Glucides</th>
                <td className="quantité">
                  {product.nutriments.carbohydrates_100g}
                </td>
                <td className="unité">g</td>
              </tr>
              <tr id="sugar">
                <th>&nbsp;dont sucres</th>
                <td className="quantité">{product.nutriments.sugars_100g}</td>
                <td className="unité">g</td>
              </tr>
              <tr id="prot">
                <th scope="row">Protéines</th>
                <td className="quantité">{product.nutriments.proteins_100g}</td>
                <td className="unité">g</td>
              </tr>
              <tr id="sel">
                <th>Sel</th>
                <td className="quantité">{product.nutriments.salt_100g}</td>
                <td className="unité">g</td>
              </tr>
            </tbody>
          </table>

          <div className="row">
            <div className="col-lg-6 text-center">
              <Image
                id="nutriscore"
                src={`/nutriscore${product.nutriscore_grade}.svg`}
                alt="nutriscore"
                width={100}
                height={50}
              />
              <div className="fs-6 fw-bold">Allergènes</div>
              <p id="allergenes" id={styles.allergenes} className="fw-bold">
                {product.allergens_from_ingredients}
              </p>
              <div className="fs-6 fw-bold">Additifs</div>
              <p id="additif" id={styles.additif} className="fw-bold">
                {product.additives_original_tags}
              </p>
            </div>
            <div className="col-lg-6">
              <div className="fs-6 fw-bold">Ingrédients</div>
              <p id="ingr">{product.ingredients_text}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
