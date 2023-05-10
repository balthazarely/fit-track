interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setModalOpen: (state: boolean) => void;
}

export default function ModalWrapper({
  children,
  isModalOpen,
  setModalOpen,
}: ModalProps) {
  return (
    <>
      <input
        type="checkbox"
        checked={isModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      <div
        onClick={() => setModalOpen(false)}
        className="modal modal-bottom sm:modal-middle bg-opacity-70"
      >
        {children}
      </div>
    </>
  );
}
