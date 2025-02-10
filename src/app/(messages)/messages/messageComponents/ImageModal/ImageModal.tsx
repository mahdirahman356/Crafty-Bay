/* eslint-disable @next/next/no-img-element */

interface ImageModalProps {
    msgId: string;
    msgImage: string;
}

const ImageModal: React.FC<ImageModalProps> = ({msgId, msgImage}) => {
    return (
        <div>
            <button className="" onClick={() => {
                const modal = document.getElementById(`my_modal_photo_${msgId}`) as HTMLDialogElement;
                modal?.showModal();
            }}>
                <img className="w-32 h-32 mb-3 object-cover rounded-lg" src={msgImage} alt="image" />
            </button>
            <dialog id={`my_modal_photo_${msgId}`} className="modal">
                <div className={`!p-0 !bg-transparent mx-2 overflow-hidden`}>
                    <div className="absolute right-2 lg:right-20 top-8 text-black">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle">
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="">
                        <img className="object-cover rounded-xl" src={msgImage} alt="image" />
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ImageModal;