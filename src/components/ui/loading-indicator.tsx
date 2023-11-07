import $ from "./loading-indicator.module.css";

function LoadingIndicator() {
  return (
    <div className={$.indicator}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingIndicator;
