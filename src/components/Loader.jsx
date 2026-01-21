export default function Loader({ text = "Loading..." }) {
  return (
    <div className="card">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
