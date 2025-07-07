import styles from "@/styles/Card.module.css";
import Image, { StaticImageData } from "next/image";

export default function CategoryCard({
  logo,
  name,
}: {
  logo: StaticImageData;
  name: string;
}) {
  return (
    <>
      <div className={styles.containers}>
        <div className={styles.roundedimg}>
          <Image src={logo} alt="logo" width={"60"} loading="lazy" />
        </div>
        <p>{name}</p>
      </div>
    </>
  );
}
