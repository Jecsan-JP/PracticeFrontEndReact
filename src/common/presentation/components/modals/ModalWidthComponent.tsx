export interface ModalWidthProps {
  id: string;
  children: React.ReactNode;
}

const ModalWidthComponent: React.FC<ModalWidthProps> = ({ id, children }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>Cerrar</button>
      </form>
    </dialog>
  );
};

export default ModalWidthComponent;
