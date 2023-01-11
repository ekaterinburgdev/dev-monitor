import styles from "./Chips.module.css";

export function Chips({ links }) {
  return (
    <ul className={styles.chips}>
      {links.map(({ name, url }) => (
        <li className={styles.chips__item} key={name}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.chips__link}
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}
