import './Modal.css';

export function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}