"use client";

export default function Modal({ children, isModalOpen }: any) {
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
