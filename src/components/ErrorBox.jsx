export default function ErrorBox({ message }) {
  return (
    <div className="card error">
      <h3>Error</h3>
      <p>{message}</p>
    </div>
  );
}
