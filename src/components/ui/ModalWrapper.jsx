import { useData } from '@store/providers/Provider';
import { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const ModalWrapper = () => {
  const [content, setContent] = useState();
  const { modalOpen, modalContent, closeModal, setModalContent } = useData();
  useEffect(() => {
    if (modalOpen) {
      if (content == undefined) {
        closeModal();
      } else {
        setContent(modalContent);
      }
    } else {
      setContent(modalContent);
    }
  }, [modalContent]);
  return (
    <div
      className={
        'fixed shadow-xl z-50 bg-white border-1 rounded-md transition-all animation duration-500 offer-modal ' +
        (modalOpen
          ? ' visible opacity-1 h-auto w-auto'
          : ' invisible opacity-0 w-0 h-0')
      }>
      {modalOpen && (
        <div className="p-8">
          <div className="flex justify-end">
            <button className="text-red-500" onClick={closeModal}>
              <FaTimes />
            </button>
          </div>
          {content}
        </div>
      )}
    </div>
  );
};

export default ModalWrapper;
