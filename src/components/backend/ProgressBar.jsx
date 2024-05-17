import styles from "./ProgressBar.module.css";

export default function ProgressBar({ currentStep }) {
  return (
    <div className="grid grid-cols-gridContent">
      <div className="pt-6 col-start-3 flex items-center justify-center">
        <section className={styles.progressbar_container}>
          <ul className={styles.steps_container}>
            <li
              className={`${styles.step_item} ${
                currentStep === 1 ? styles.current_item : ""
              }`}
            >
              <span className={styles.progress_count}>1</span>
              <span className={styles.step_label}>Tickets</span>
            </li>
            <li
              className={`${styles.step_item} ${
                currentStep === 2 ? styles.current_item : ""
              }`}
            >
              <span className={styles.progress_count}>2</span>
              <span className={styles.step_label}>Camping</span>
            </li>
            <li
              className={`${styles.step_item} ${
                currentStep === 3 ? styles.current_item : ""
              }`}
            >
              <span className={styles.progress_count}>3</span>
              <span className={styles.step_label}>Personal Info</span>
            </li>
            <li
              className={`${styles.step_item} ${
                currentStep === 4 ? styles.current_item : ""
              }`}
            >
              <span className={styles.progress_count}>4</span>
              <span className={styles.step_label}>Summary</span>
            </li>
            <li
              className={`${styles.step_item} ${
                currentStep === 5 ? styles.current_item : ""
              }`}
            >
              <span className={styles.progress_count}>5</span>
              <span className={styles.step_label}>Payment</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
