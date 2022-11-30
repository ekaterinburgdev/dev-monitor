import classNames from "classnames/bind";
import styles from "./Contributors.module.css";

const cx = classNames.bind(styles);

export default function Contributors({ contributors }) {
  if (!contributors) return null;

  return (
    <div className={cx("contributors")}>
      {contributors
        .sort((a, b) => b.contributions - a.contributions)
        .map((contributor) => (
          <a
            href={contributor.html_url}
            key={contributor.login}
            className={cx("contributor")}
          >
            <img
              src={contributor.avatar_url}
              className={cx("contributor__avatar")}
              alt={contributor.login}
              width={38}
              height={38}
            />
            <div className={cx("contributor__contributions")}>
              {contributor.contributions}
            </div>
          </a>
        ))}
    </div>
  );
}
