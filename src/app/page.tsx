import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="container-fluid m-5">
      <div className="row">
        <div className="col-lg-6 col-10">
          <div className="fs-1">
            <strong>Commencez maintenant!</strong> <br />
            Entrez le code-barre de votre produit.
          </div>
          <div className="fs-5">
            Retrouvez toutes les informations essentielles sur les produits
            alimentaires pour vous guidez à faire votre choix santé!
          </div>
        </div>
      </div>
    </main>
  );
}
