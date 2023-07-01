import { Fragment } from "react";
import mainheaderImage from "../../assests/headBanner.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className="tytulprzepis">Przepisy na każdy dzień</h1>
        <h1 className="tytulprzepis2">
          <a href="#dodaj">Dodaj przepis</a>
        </h1>
      </header>
      <div className={classes["main-image"]}>
        <img src={mainheaderImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
