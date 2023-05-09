"use client";

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
}

export default function Modal({ children, isModalOpen }: ModalProps) {
  return (
    <div className="">
      <input
        type="checkbox"
        checked={isModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box">{children}</div>
      </div>
    </div>
  );
}
