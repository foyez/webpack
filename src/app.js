import { add } from "@/utils/add";
import styles from "@/styles/style.module.scss";

console.log(add(1, 6));

console.log('environment mode: ', process.env.NODE_ENV);

const rootEl = document.getElementById("root");

rootEl.innerHTML = `<p class="${styles.text}">CSS Modules Webpack</p>`;

class TestClass {}
